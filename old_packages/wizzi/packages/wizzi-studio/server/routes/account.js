/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\routes\account.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Router: Account
*/
// Dependencies
var util = require('util');
var path = require('path');
var wizzi = require('wizzi');
var rest = require('../lib/rest');
var u = require('../lib/utils');
var qs = require('querystring');
var randomString = require('randomstring');
var axios = require('axios');
// random string, will be used in the workflow later
var csrfString = randomString.generate();
var redirect_uri = process.env.HOST + '/account/github/redirect';
/**
     Helpers
*/
function sendError(res, err, options) {
    rest.sendError(res, err, options);
}
function sendSuccess(res, result, options) {
    rest.sendSuccess(res, result, options);
}
/**
     Routes
*/
module.exports = function(app, api) {
    var accountApi = api.account;
    // http://shiya.io/how-to-do-3-legged-oauth-with-github-a-general-guide-by-example-with-node-js/
    app.get('/account/login', function(req, res, next) {
        // generate that csrf_string for your "state" parameter
        req.session.csrf_string = randomString.generate();
        // construct the GitHub URL you redirect your user to.
        var githubAuthUrl = 'https://github.com/login/oauth/authorize?' + (qs.stringify({
            client_id: process.env.GITHUB_CLIENT_ID, 
            redirect_uri: redirect_uri, 
            state: req.session.csrf_string
        }));
        // redirect user with express
        res.redirect(githubAuthUrl);
    });
    // Handle the response your application gets.
    // Using app.all make sures no matter the provider sent you
    // get or post request, they will all be handled
    app.all('/account/github/redirect', function(req, res, next) {
        // Here, the req is request object sent by GitHub
        console.log('Request sent by GitHub: ', req.query, 'session', req.session.csrf_string);
        // req.query should look like this:
        // {
        // code: '3502d45d9fed81286eba',
        // state: 'RCr5KXq8GwDyVILFA6Dk7j0LbFNTzJHs'
        // }
        var code = req.query.code;
        var returnedState = req.query.state;
        if (req.session.csrf_string === returnedState) {
            // Remember from step 5 that we initialized
            // If state matches up, send request to get access token
            // the request module is used here to send the post request
            axios.post('https://github.com/login/oauth/access_token?' + (qs.stringify({
                client_id: process.env.GITHUB_CLIENT_ID, 
                client_secret: process.env.GITHUB_CLIENT_SECRET, 
                code: code, 
                redirect_uri: redirect_uri, 
                state: req.session.csrf_string
            }))).then(function(response) {
                console.log(response.data);
                // The response will contain your new access token
                // this is where you store the token somewhere safe
                // for this example we're just storing it in session
                console.log('Your Access Token: ', qs.parse(response.data));
                req.session.access_token = qs.parse(response.data).access_token;
                // Redirects user to /user page so we can use
                // the token to get some data.
                res.redirect('/account/github/user');
            }).catch(function(error) {
                console.log(error);
            })
        }
        else {
            // if state doesn't match up, something is wrong
            // just redirect to homepage
            res.redirect('/');
        }
    });
    app.get('/account/github/user', function(req, res, next) {
        // GET request to get emails
        // this time the token is in header instead of a query string
        axios.get('https://api.github.com/user', {
            headers: {
                Authorization: 'token ' + req.session.access_token
            }
        }).then(function(response) {
            console.log(response.data);
            axios.get(response.data.repos_url, {
                headers: {
                    Authorization: 'token ' + req.session.access_token
                }
            }).then(function(response_repo) {
                var msg = JSON.stringify([
                    response.data, 
                    response_repo.data
                ], null, 2);
                res.send("<p>You're logged in! Here's your data on GitHub: </p>" + msg + '<p>Go back to <a href="/">log in page</a>.</p>');
            })
        })
    });
};
