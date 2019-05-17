/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\middleware\http.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import util from 'util';
import querystring from 'querystring';
import axios from 'axios';
import isObject from 'lodash/isObject';
// import { pushState } from 'redux-react-router'
import {errorUtil, throwErrorUtil} from '../lib/utils';
import apiConfig from '../config/api.config';
import { normalize } from 'normalizr';
import verify from '../lib/verify';
const error = errorUtil('redux/middleware/http');
const throwError = throwErrorUtil('redux/middleware/http');
const methods = ['get', 'post', 'put', 'delete', 'create'];
const trueMethods = ['get', 'post'];
function validateCreateAxiosConfig(actionHttpRequest) {
    var { url } = actionHttpRequest;
    const { method, queryParams, payload, responseType, timeout } = actionHttpRequest;
    if (typeof url !== 'string') {
        throwError('Specify a string endpoint URL. actionHttpRequest: ' + util.inspect(actionHttpRequest, { depth:null }), 'validateCreateAxiosConfig');
    }
    var urlHasParams = url.indexOf('?') > -1;
    if (queryParams) {
        if (!isObject(queryParams)) {
            throwError('The property queryParams must be an object. actionHttpRequest: ' + util.inspect(actionHttpRequest, { depth:null }), 'validateCreateAxiosConfig');
        }
        url = url + (urlHasParams ? '&' : '?') + querystring.stringify(queryParams, '&', '=');
        urlHasParams = true;
    }
    if (methods.indexOf(actionHttpRequest.method) === -1) {
        throwError('Invalid http method: "' + actionHttpRequest.method + '" actionHttpRequest:' + util.inspect(actionHttpRequest, { depth:null }), 'validateAxiosConfig');
    }
    if (trueMethods.indexOf(actionHttpRequest.method) === -1) {
        url = url + (urlHasParams ? '&' : '?') + '_method=' + actionHttpRequest.method;
        actionHttpRequest.method = 'post';
        urlHasParams = true;
    }
    if (apiConfig.server && apiConfig.server.host) {
        var sb = [ apiConfig.server.https ? 'https' : 'http' ];
        sb.push('://');
        sb.push(apiConfig.server.host);
        if (apiConfig.server.port) {
            sb.push(':');
            sb.push(apiConfig.server.port);
        }
        url = sb.join('') + url;
    }
    console.log('middleware.http.validateCreateAxiosConfig.url', url);
    var ret = {
        url: url, 
        method: method
    };
    // VIA if method === 'post' && payload
    if (payload) {
        ret.data = payload;
    }
    ret.responseType = responseType || apiConfig.defaultResponseType;
    ret.timeout = timeout || apiConfig.defaultTimeout;
    console.log('validateCreateAxiosConfig.ret', ret);
    return ret;
}
function payloadFromSuccess(response, schema) {
    if (response && response.data && response.data.status && response.data.status.code == 0) {
        if (response.data.data && verify.isNotEmpty(response.data.status.message)) {
            response.data.data.__notify = response.data.status.message;
        }
        return schema ? normalize(response.data.data, schema) : response.data.data;
    }
    else if (response && response.data && response.data.status) {
        return {
                error: JSON.stringify(response.data.status, null, 2)
            };
    }
    else {
        return {
                error: JSON.stringify(response.data, null, 2)
            };
    }
}
function payloadFromFailure(error) {
    if (error && error.response) {
        return {
                error: JSON.stringify({
                    status: error.response.status, 
                    statusText: error.response.statusText, 
                    data: error.response.data
                }, null, 2)
            };
    }
    else {
        return {
                error: JSON.stringify(error, null, 2)
            };
    }
}
function createReceiveAction(actionType, initialAction, payload, response) {
    console.log('createReceiveAction.actionType.payload', actionType, payload);
    var finalAction = Object.assign({}, initialAction, {
        type: actionType, 
        payload: payload, 
        status: (response ? response.status : 'unknown'), 
        statusText: (response ? response.statusText : 'unknown'), 
        headers: (response ? response.headers : [])
    });
    delete finalAction[apiConfig.HTTP_REQUEST]
    return finalAction;
}
/**
     param actionHttpRequest:Object { // the http request from which the request for axios and the next action are built
     url:String,
     method:String,
     queryParams:Object,
     payload:Object,
     responseType:String,
     timeout:Number,
     schema:Object, // normalizr schema of response
     types:Object, // action types: requestType, successType, failureType
     }
     param initialAction: String // the action that activated the request
     param dispatch: Function // the dispatcher of the next action after completion or failure
*/
function sendRequest(actionHttpRequest, initialAction, dispatch) {
    const { schema, types } = actionHttpRequest;
    const [ requestType, successType, failureType ] = types;
    var axiosConfig = validateCreateAxiosConfig(actionHttpRequest);
    console.log('middleware/http/sendRequest.axiosConfig', axiosConfig);
    if (verify.isEmpty(requestType) == false) {
        // signal that request is executing
        dispatch({
            type: requestType
        });
    }
    return axios(axiosConfig).then(function(response) {
            console.log('http.response', response);
            if (response.data.status && response.data.status.code == 0) {
                dispatch(createReceiveAction(successType, initialAction, payloadFromSuccess(response, schema), response));
                console.log('sendRequest.then actionHttpRequest.next', actionHttpRequest.next);
                if (actionHttpRequest.next != null) {
                    dispatch(actionHttpRequest.next);
                }
            }
            else {
                dispatch(createReceiveAction(failureType, initialAction, payloadFromSuccess(response, schema), response));
            }
        }).catch(function(error) {
            console.log('http.error', error);
            dispatch(createReceiveAction(failureType, initialAction, payloadFromFailure(error), error.response));
        })
        
    ;
}
export default {
        sendRequest: sendRequest
    }
