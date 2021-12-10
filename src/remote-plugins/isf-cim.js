'use strict';

const path = require('path'),
      configs = require('../configurations'),
      helpers = require('../helpers'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();


module.exports = function (appContext, directory) {
     /* GET /isfselection (second)
    *  Returns the isf-cim html page for presentation to the user within Brightspace.
    */
    router.get('/isfselection', function(req, res) {
		//console.log('in second route: /isfselection');
		//console.log('Cookies: ', req.cookies);
		//console.log('Signed Cookies: ', req.signedCookies);
		
        res.sendFile(path.join(directory+'/html/isf-cim.html'));
		//console.log(req);
    });
	
     /* POST /lti/isfcontent (first)
    *  The LTI endpoint for a Insert Stuff (CIM) remote plugin.
    */
    router.post('/lti/isfcontent', function (req, res) {
 		//console.log('in first route: /lti/isfcontent');
		
       	const url = req.protocol + '://' + req.get('host') + '/bsi/lti/isfcontent';
		//console.log('url: ', url);
		
        if (!helpers.verifyLtiRequest(url, req.body, configs.ltiSecret)) {
            console.log('Could not verify the LTI Request. OAuth 1.0 Validation Failed');
            res.status(500).send({error: 'Could not verify the LTI Request. OAuth 1.0 Validation Failed'});
        } else {
			
            res.cookie('lti_request', { 
                contentItemReturnUrl: req.body.content_item_return_url,
                oauth_version: req.body.oauth_version,
                oauth_nonce: req.body.oauth_nonce,
                oauth_consumer_key: req.body.oauth_consumer_key,
                oauth_callback: req.body.oauth_callback,
                oauth_signature_method: req.body.oauth_signature_method
            }, configs.cookieOptions);
			
			//console.log('Cookies: ', req.cookies);
			//console.log('Signed Cookies: ', req.signedCookies);
            res.redirect('/bsi/isfselection');      
        }

    });

     /* GET /getisfdetails (third)
    *  Returns the details for the request that needs to be submitted through the form back
    *  to Brightspace in order to insert the stuff into Brightspace.
    */
    router.get('/getisfdetails', function (req, res) {
		//console.log('in third (submit) route: /getisfdetails');
		
        const imageUrl = req.protocol + '://' + req.get('host') + '/bsi/content/isf/' + req.query.image;
		//console.log('imageUrl: ', imageUrl);
		//console.log('Cookies: ', req.cookies);
		//console.log('Signed Cookies: ', req.signedCookies); 				
		
        const contentItemReturnUrl = req.cookies.lti_request.contentItemReturnUrl;
		
        const contentItems = {
            '@context' : 'http://purl.imsglobal.org/ctx/lti/v1/ContentItem',
            '@graph': [
                {
                    '@type' : 'ContentItem',
                    mediaType: 'image/png',
                    title: 'Brightspace Logo',
                    text: '',
                    url: imageUrl,
                    placementAdvice : {
                        displayWidth : 100,
                        displayHeight : 30,
                        presentationDocumentTarget : 'embed',
                        windowTarget : '_blank'
                    }
                }
            ]
        };
        
        const responseObject = {
            lti_message_type: 'ContentItemSelection',
            lti_version: 'LTI-1p0',
            content_items: JSON.stringify(contentItems),
            oauth_version: req.cookies['lti_request'].oauth_version,
            oauth_nonce: req.cookies['lti_request'].oauth_nonce,
            oauth_timestamp: helpers.getUnixTimestamp(),
            oauth_consumer_key: req.cookies['lti_request'].oauth_consumer_key,
            oauth_callback: req.cookies['lti_request'].oauth_callback,
            oauth_signature_method: req.cookies['lti_request'].oauth_signature_method
        };
        responseObject.oauth_signature = helpers.generateAuthSignature(contentItemReturnUrl, responseObject, configs.ltiSecret);
        responseObject.lti_return_url = contentItemReturnUrl;
		
		//console.log('Cookies: ', req.cookies);
		//console.log('Signed Cookies: ', req.signedCookies); 				

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(responseObject));
        
    });

    return router;
};
