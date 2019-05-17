/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\middleware\http.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';

import util from 'util';
import querystring from 'querystring';
import axios from 'axios';
import isObject from 'lodash/isObject';
// import { pushState } from 'redux-react-router'
import utils from '../lib/utils';
import config from './config';
import { normalize } from 'normalizr';

const { notEmptyString } = utils;
const error = utils.error('dashredux/middleware/http');
const throwError = utils.throwError('dashredux/middleware/http');


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
    
    var ret = {
        url: url, 
        method: method
    };
    if (method === 'post' && payload) {
        ret.data = payload;
    }
    ret.responseType = responseType || config.defaultResponseType;
    ret.timeout = timeout || config.defaultTimeout;
    
    console.log('validateCreateAxiosConfig.ret', ret);
    
    return ret;
}

function payloadFromSuccess(response, schema) {
    if (response && response.data && response.data.status && response.data.status.code == 0) {
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
    })
    ;
     delete finalAction[config.HTTP_REQUEST]
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
    
    if (notEmptyString(requestType)) {
        // signal that request is executing
        dispatch({
            type: requestType
        });
    }
    return axios(axiosConfig).then(function(response) {
            console.log('http.response', response);
            if (response.data.status && response.data.status.code == 0) {
                dispatch(createReceiveAction(successType, initialAction, payloadFromSuccess(response, schema)
                , response)
                );
                console.log('sendRequest.then actionHttpRequest.next', actionHttpRequest.next);
                if (actionHttpRequest.next != null) {
                    dispatch(actionHttpRequest.next);
                }
            }
            else {
                dispatch(createReceiveAction(failureType, initialAction, payloadFromSuccess(response, schema)
                , response)
                );
            }
        }).catch(function(error) {
            console.log('http.error', error);
            dispatch(createReceiveAction(failureType, initialAction, payloadFromFailure(error)
            , error.response)
            );
        })
        
        
    ;
}

module.exports = {
    sendRequest: sendRequest
};
