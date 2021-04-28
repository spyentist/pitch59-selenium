const fetch = require('node-fetch')
const config = require('config');

const signoutUrl = config.get('pitch59-url') + '/dev/api/account/logout';

it(`Testing to see if we can signout`, async () => {
    const date = new Date();
    let options = {
        method: 'POST',
        uri: signoutUrl,
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTSUQiOiI5WnpNOTVVa1Y0dWhBVXM2cEVRVytsUzlZZXJlcVhqTlRubFdKZTJ0N3ZITWNxbjkrOHNJVlZiWlA5Tm5Jb281IiwiVUlEIjoiMndQYmNEY1N2TnRBa3dESHJrWHFsL2ErU0tKcFBySGw3TG5TbUltWHZ0ZDFRdmxtTmNwSUo1N2RLT3ZBdjh5VCIsIlJJRCI6Ijd2VDNFZ0swaDhkNUNrUkhUTGdEM2lCNEI4WjAzczRuSmhKemsxaEdqdFk9Iiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2MTg3MDI5NDgsImV4cCI6MTYxOTA2Mjk0OCwiaWF0IjoxNjE4NzAyOTQ4LCJpc3MiOiJQaXRjaDU5QVBJIiwiYXVkIjoiUGl0Y2g1OVdlYkNsaWVudCJ9.eARfEXOwXaSVAlsFaqqnj0X3mxkTH5yjh4fPKPo2QsQ"
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


