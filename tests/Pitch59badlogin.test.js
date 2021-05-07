const fetch = require("node-fetch");
const config = require('config');
let token = null;
let userID = null;

const signupUrl = config.get('pitch59-url') + '/api/account/sign-up?otp_check=true';

it(`Testing to see if we can sign up a new user`, async () => {
    const date = new Date();
    let options = {
        method: 'POST',
        uri: signupUrl,
        headers: {
        },
        body: {
    "firstName": "Tony",
    "lastName": "Stark",
    "isTesterUser": true,
    "contactNumber": "(999) 999-9637",
    "emailId": "testGroup2@gmail.com",
    "password": "BetterThanCap10",
    "zipCode": "84440",
    "userReferralModel": {
        "referralEmail": "Shandu@gmail.com"
    },
    "otpCode": 9865
  }
};

    let errorWasCaught = false;
    let errorCaught = null;

    try {
        let response = await fetch(loginUrl, options);
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


const loginUrl = config.get("pitch59-url") + "/api/account/login";

it(`Testing to see if we can signin`, async () => {
  let options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      emailId: "Shandu@gmail.com",
      //"password": "Lutendo1"
      //emailId: "ironman@gmail.com",
      password: "BetterThanCap10"
    })
  };

  let errorWasCaught = false;
  let errorCaught = null;
  let json = null;
  try {
    let response = await fetch(loginUrl, options);
    json = await response.json();
    token = json.token;
    userID = json.userId;
    console.log("Response", json);
    //delete user

  let options = { 
    method: 'POST',
    headers: {
      'Authorization' : 'bearer' + token
    }
  }
  let response = await fetch('pitch59-url') + '/api/users/' + userID + '/deleteTestUser';
  } catch (exception) {
    errorCaught = exception;
    errorWasCaught = true;
    throw console.log(errorCaught);
  }


  expect(errorWasCaught).toBe(true);
  console.log(json.code);
  expect(json.code).toBe(2012);

});








