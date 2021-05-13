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
            'Authorization' : "bearer" + token
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


