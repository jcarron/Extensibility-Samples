'use strict';

/****
    It is not recommended to commit your application key or client secret to ANY repository. In this case
    these keys were generated against the devcop Brightspace instance which can be used for developer testing.
    
    It is also recommended that the state not be a hardcoded value but instead be a value that is re-computed during each OAuth 2.0 authorization
    request. Please read the configurations documentation for additional information.
 ****/
/*module.exports = {
    applicationId: process.env.APPLICATION_ID || 'JABIh2YY5cek4hvKy5jXVQ',
    applicationKey: process.env.APPLICATION_KEY || 'cG_U2aE9bH1YySI2PIdCTA',
    authCodeScope: process.env.AUTH_SCOPE || 'core:*:* grades:gradeobjects:read enrollment:orgunit:read content:modules:read content:topics:read content:toc:read users:userdata:read grades:gradeobjects:read',
    authEndpoint: process.env.AUTH_ENDPOINT || 'https://auth.brightspace.com/oauth2/auth',
    clientId: process.env.CLIENT_ID || '3f81fb91-87c9-4550-852f-89225dd53371',
    clientSecret: process.env.CLIENT_SECRET || 'hmLB9sFEgEo7Mdu_bu38xkLWNxhQmoVxPzpl9QKiBAE',
    configuredPort:  process.env.TOKEN_CONFIGURED_PORT || 3434,
    cookieName: process.env.COOKIE_NAME || 'sampleAppCokie',
    cookieOptions: { httpOnly: true, secure: true },
    instanceScheme: process.env.INSTANCE_SCHEME || 'https:',
    instancePort: process.env.INSTANCE_PORT || '443',
    instanceUrl: process.env.INSTANCE_URL || 'devcop.brightspace.com',
    ltiSecret: process.env.LTI_SECRET || 'secret',
    state: process.env.STATE || 'ed9dda12-1397-4bac-aba2-096acc7d24f1',
    tokenEndpoint: process.env.TOKEN_ENDPOINT || 'https://auth.brightspace.com/core/connect/token'
};*/
module.exports = {
    applicationId: process.env.APPLICATION_ID || 'KdV45u-Bv-hyCTr_GOtOhw',
    applicationKey: process.env.APPLICATION_KEY || 'o9blyn_LncpnJepuGyR7Pg',
    authCodeScope: process.env.AUTH_SCOPE || 'core:*:* grades:gradeobjects:read enrollment:orgunit:read content:modules:read content:topics:read content:toc:read users:userdata:read',
    authEndpoint: process.env.AUTH_ENDPOINT || 'https://auth.brightspace.com/oauth2/auth',
    clientId: process.env.CLIENT_ID || 'bb426934-19fe-435d-8936-0226d4964cee',
    clientSecret: process.env.CLIENT_SECRET || 'm8O7ZvEDLsIRixhKdh2r9TPyPt1rC_auqwiM5FGgaLc',
    configuredPort:  process.env.TOKEN_CONFIGURED_PORT || 3434,
    cookieName: process.env.COOKIE_NAME || 'sampleAppCookie',
    cookieOptions: { httpOnly: true, secure: true , sameSite: 'none'},
    instanceScheme: process.env.INSTANCE_SCHEME || 'https:',
    instancePort: process.env.INSTANCE_PORT || '443',
    instanceUrl: process.env.INSTANCE_URL || 'smcdsbtest.desire2learn.com',
    ltiSecret: process.env.LTI_SECRET || 'secret',
    state: process.env.STATE || 'bb426934-19fe-435d-8936-0226d4964cee',
    tokenEndpoint: process.env.TOKEN_ENDPOINT || 'https://auth.brightspace.com/core/connect/token'
};