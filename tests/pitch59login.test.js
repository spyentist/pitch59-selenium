const rp = require('request-promise-native');
const config = require('config');

const loginUrl = config.get('pitch59-url') + '/api/account/login';

it(`Testing to see if we can signin`, async () => {
    const date = new Date();
    let options = {
        method: 'POST',
        uri: loginUrl,
        headers: {
        },
        body: {
            "emailId": "Shandu@gmail.com",
            "password": "Lutendo1"

        },
        json: true,
        simple: false,
    };

    let errorWasCaught = false;
    let errorCaught = null;

    try {
        let response = await rp(options);
        return response;
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

    expect(errorWasCaught).toBe(false);
});


