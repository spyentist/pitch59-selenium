const fetch = require('node-fetch')
const config = require('config');
let token = null;

const signoutUrl = config.get('pitch59-url') + '/dev/api/account/logout';

it(`Testing to see if we can signout`, async () => {
    const date = new Date();
    let options = {
        method: 'POST',
        uri: signoutUrl,
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTSUQiOiJYVVBESlRHZ04va2tXM3VLYlNTSGJYUTRJWGV5Z09BUjlyYUVJMTJSdHB5L1FxNmdNRFQzK3lhM0xic29ETVI3IiwiVUlEIjoiUlFSQlVaSDJjMWhEZ0lSWXYzYk5yU2w2RVRxY0I3bVZnL0xEckppUmMwRzVyMmlCUGhKT3JVU3Fxd0laeFFraiIsIlJJRCI6IkZOeEVLL0NlMHgyT1JxU1p6dEZRbGJ3ZERzZ1pnWUFpZWJQdDNYbkQ4cTQ9Iiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2MjA0MzE2NDksImV4cCI6MTYyMDc5MTY0OSwiaWF0IjoxNjIwNDMxNjQ5LCJpc3MiOiJQaXRjaDU5QVBJIiwiYXVkIjoiUGl0Y2g1OVdlYkNsaWVudCJ9.tmxjq11y-HjXRo4yIFAEXg32MqPS3qO3C2Dg_j29VBU"
//            'Authorization' : 'bearer' + token
        }
    };

    let errorWasCaught = false;
    let errorCaught = null;

    try {
        const response = await fetch(signoutUrl, options);
        const json = await response.json();
        token = json.token;
        console.log('Response',json);
        return response;
        
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

    expect(errorWasCaught).toBe(false);
});


