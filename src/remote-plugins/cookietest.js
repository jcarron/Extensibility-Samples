'use strict';

const path = require('path'),
      configs = require('../configurations'),
      helpers = require('../helpers'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();


module.exports = function (appContext, directory) {	
     /* POST /cookietest (first)
    *  The LTI endpoint for a Insert Stuff (CIM) remote plugin.
    */
    router.get('/cookietest', function (req, res) {
 		console.log('in test route: /cookietest');

       	const url = req.protocol + '://' + req.get('host') + '/bsi/cookietest';
		console.log('url: ', url);

		res.cookie('testcookie', { test: '1234' }, configs.cookieOptions);
		res.status(200).send('url: ' + url);

			
		console.log('Cookies: ', req.cookies['testcookie']);
		console.log('Signed Cookies: ', req.signedCookies);			
       
    });
	
	return router;

};