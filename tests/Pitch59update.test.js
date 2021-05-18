const fetch = require('node-fetch');
const config = require('config');
const loginUrl = config.get("pitch59-url") + '/api/account/login';
let log_token = null;
let user_id = null;

it(`Testing to see if we can signin`, async () => {
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "emailId": "jarenbrownlee@gmail.com",
        "password": "BetterThanCap10",
      })
    };
  
    let errorWasCaught = false;
    let errorCaught = null;
    let json = null;
    try {
      const response = await fetch(loginUrl, options);
      json = await response.json();
  
      console.log("Response", json);
      log_token = json.data.token;
      user_id = json.data.userId;
      console.log("Token", log_token);
      console.log("ID", user_id);
  
    } catch (exception) {
      errorCaught = exception;
      errorWasCaught = true;
      throw console.log(errorCaught);
    }
  
    expect(errorWasCaught).toBe(false);
    console.log(json.code);
    expect(json.code).toBe(2012);
});

const updateUrl = config.get('pitch59-url') + '/api/users/update-user';

it(`Testing to see if we can update information`, async () => {
    let options = {
        method: 'PUT',
        uri: updateUrl,
        headers: {
            "authorization": `bearer ${log_token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "contactNumber": "(999) 999-9125",
            "emailId": "jarenbrownlee1@gmail.com",
            "password": "BetterThanCap11",
            "zipCode": "83402",
            "firstName": "Julio",
            "lastName": "Tester",
            "id": user_id,
            "otpCode": 1111
        })
    };
    let errorWasCaught = false;
    let errorCaught = null;
    let json = null;
    try {
        const response = await fetch(updateUrl, options);
        json = await response.json();
        console.log("Response", json);
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

    expect(errorWasCaught).toBe(false);
    console.log(json.code);
    expect(json.code).toBe(7004);
});