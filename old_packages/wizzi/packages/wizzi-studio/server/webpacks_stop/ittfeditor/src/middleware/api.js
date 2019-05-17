/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\middleware\api.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import util from 'util';
import utils from '../lib/utils';
import http from './http';
import config from './config';

/** -àà
     The 'api' middleware
     . intercepts dispatched actions that contain an HTTP_REQUEST property
     . uses the 'http' helper module to execute the http request
     and dispatch the next action after completion or failure of the http request
*/

const { notEmptyString } = utils;
const error = utils.error('reduxstarter/middleware/api');
const throwError = utils.throwError('reduxstarter/middleware/api');

const timers = {};

function validateHttpRequest(store, actionHttpRequest) {
    
    const { types } = actionHttpRequest;
    
    if (!types || !types.length || types.length != 3) {
        throwError('The requestType, successType and failureType action types are required. actionHttpRequest: ' + util.inspect(actionHttpRequest, { depth:null }), 'validateHttpRequest');
    }
}
var api = function(store) {
    /** -àà
         param next:Function // the dispatcher of the action
    */
    return function(next) {
            /** -àà
                 param action:Object // the action being dispatched
            */
            return function(action) {
                    
                    console.log('reduxstarter.middleware.api.action:', action);
                    
                    // The action requires an http request?
                    const actionHttpRequest = action[config.HTTP_REQUEST];
                    if (typeof actionHttpRequest === 'undefined') {
                        // NO
                        return next(action);
                    }
                    // YES
                    validateHttpRequest(store, actionHttpRequest);
                    //
                    if (actionHttpRequest.delayId) {
                        if (timers[actionHttpRequest.delayId]) {
                            clearInterval(timers[actionHttpRequest.delayId]);
                        }
                        console.log(new Date().getSeconds(), 'setting delayed request', actionHttpRequest.delayId);
                        timers[actionHttpRequest.delayId] = setInterval(function() {
                            console.log(new Date().getSeconds(), 'executing delayed', actionHttpRequest.delayId);
                            http.sendRequest(actionHttpRequest, action, next);
                            clearInterval(timers[actionHttpRequest.delayId]);
                             delete timers[actionHttpRequest.delayId]
                        }, actionHttpRequest.delay);
                        return timers[actionHttpRequest.delayId];
                    }
                    else {
                        return http.sendRequest(actionHttpRequest, action, next);
                    }
                };
        };
};
export default api;
