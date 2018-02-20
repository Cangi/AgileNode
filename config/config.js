/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

module.exports = {
  creds: {
    redirectUrl: 'https://ec2-35-160-181-71.us-west-2.compute.amazonaws.com/token',
    clientID: '54ded075-30ae-4da4-85ab-bcff0c30f8e8',
    clientSecret: 'rjaxEK8;;$ttySOCWN6786-',
    identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
    allowHttpForRedirectUrl: true, // For development only
    responseType: 'code',
    validateIssuer: false, // For development only
    responseMode: 'query',
    scope: ['User.Read', 'Mail.Send', 'Files.ReadWrite']
  }
};
