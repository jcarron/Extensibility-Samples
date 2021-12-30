'use strict';

const path = require('path'),
      configs = require('../configurations'),
      helpers = require('../helpers'),
      request = require('superagent'),
      express = require('express'),
      router = express.Router();


module.exports = function (appContext, directory) {
    /* POST /lti/isfbuttoncontent (first)
    *  The LTI endpoint for a Insert Stuff (CIM) remote plugin.
    */
    router.post('/lti/isfbuttoncontent', function (req, res) {
 		//console.log('in first route: /lti/isfbuttoncontent');
		
       	const url = req.protocol + '://' + req.get('host') + '/bsi/lti/isfbuttoncontent';
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
            res.redirect('/bsi/isfbuttonselection');      
        }

    });

    /* GET /isfbuttonselection (second)
    *  Returns the isf-cim html page for presentation to the user within Brightspace.
    */
    router.get('/isfbuttonselection', function(req, res) {
		//console.log('in second route: /isfselection');
		//console.log('Cookies: ', req.cookies);
		//console.log('Signed Cookies: ', req.signedCookies);
		
        res.sendFile(path.join(directory+'/html/isf-button-creator-cim.html'));
		//console.log(req);
    });
	
    /* GET /getisfbuttondetails (third)
    *  Returns the details for the request that needs to be submitted through the form back
    *  to Brightspace in order to insert the stuff into Brightspace.
    */
    router.get('/getisfbuttondetails', function (req, res) {
		//console.log('in third (submit) route: /getisfdetails');
		
        const imageUrl = req.protocol + '://' + req.get('host') + '/bsi/content/isf/brightspace-logo.png';
		//console.log('imageUrl: ', imageUrl);
		//console.log('Cookies: ', req.cookies);
		//console.log('Signed Cookies: ', req.signedCookies); 				
		
        const contentItemReturnUrl = req.cookies.lti_request.contentItemReturnUrl;
		
//        const contentItems = {
//            '@context' : 'http://purl.imsglobal.org/ctx/lti/v1/ContentItem',
//            '@graph': [
//                {
//                    '@type' : 'ContentItem',
//                    mediaType: 'image/png',
//                    title: 'Brightspace Logo',
//                    text: '',
//                    url: imageUrl,
//                    placementAdvice : {
//                        displayWidth : 100,
//                        displayHeight : 30,
//                        presentationDocumentTarget : 'embed',
//                        windowTarget : '_blank'
//                    }
//                }
//            ]
//        };
        
		const contentItems = {
            '@context' : 'http://purl.imsglobal.org/ctx/lti/v1/ContentItem',
            '@graph': [
                {
                    '@type' : 'html',
                    html : '<p>IMS has a catalog of certified products on website</p>',
					title : 'test',
                    text : 'description'
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
