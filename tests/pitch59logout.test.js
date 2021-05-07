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
//            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTSUQiOiJ2WUNiU1NyS2JaUWMrYkNPcXZFb0NvMzJpbVVoWFdhMTF6NEJZK2oxZkZHWWJhbTdZb0RMYnFKRFVOQ2ZqL1NFIiwiVUlEIjoiaWlsd3BEWHYzWDlRZis3MGpXbzUreDFOdGI5eWlMbWNjYjk1NGdmNWgrZlBXNXdGV2F3VDBpVDRrR2Jid1lUVSIsIlJJRCI6IlFUbUovM0xFaEM1NU9FQVRIRUExSDRxQ29rY0kyczdseEUzSW5QTzdMcU09Iiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2MjAyMjIzNzcsImV4cCI6MTYyMDU4MjM3NywiaWF0IjoxNjIwMjIyMzc3LCJpc3MiOiJQaXRjaDU5QVBJIiwiYXVkIjoiUGl0Y2g1OVdlYkNsaWVudCJ9.26mI78XtlZYRPF0Wa-GjqxRPzSSDey7qiympllhlip0"
            'Authorization' : 'bearer' + token
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


