const fetch = require('node-fetch')
const config = require('config');

const loginUrl = config.get('pitch59-url') + '/api/account/login';

it(`Testing to see if we can signin`, async () => {
    let options = {
        method: 'POST',
        headers: {
            "content-type":"application/json"
        },
        body: {
            "emailId": "Shandu@gmail.com",
            "password": "Lutendo1"
        }
    };

    let errorWasCaught = false;
    let errorCaught = null;

    try {
        const response = await fetch(loginUrl, options);
        const json = await response.json();
        console.log('Response',json);
        return response;
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

    expect(errorWasCaught).toBe(false);
});


