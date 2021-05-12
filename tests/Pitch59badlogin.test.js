const fetch = require("node-fetch");
const config = require('config');
let token = null;
let userID = null;
let response = null;
let options = null;


const signupUrl = config.get('pitch59-url') + '/api/account/sign-up?otp_check=true';
const loginUrl = config.get("pitch59-url") + "/api/account/login";
const delUserURL = config.get('pitch59-url') + '/api/users/' + userID + '/deleteTestUser';

it(`Testing to see if we can sign up a new user`, async () => {
    const date = new Date();
    options = {
        method: 'POST',
        uri: signupUrl,
        headers: {
        },
        body: {
    "firstName": "Tony",
    "lastName": "Stark",
    "isTesterUser": true,
    "contactNumber": "(999) 999-9638",
    "emailId": "testGroup2@gmail.com",
    "password": "BetterThanCap10",
    "zipCode": "84440",
    "userReferralModel": {
        "referralEmail": "scmurdock@gmail.com"
    },
    "otpCode": 9865
  }
};

    let errorWasCaught = false;
    let errorCaught = null;

    try {
        response = await fetch(loginUrl, options);
        const json = await response.json();
        console.log('Response',json);
        return response;
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

   // expect(errorWasCaught).toBe(false);
});



it(`Testing to see if we can signin`, async () => {
  options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      emailId: "testGroup2@gmail.com",
      //"password": "Lutendo1"
      //emailId: "ironman@gmail.com",
      password: "BadPassword"
    })
  };

  let errorWasCaught = false;
  let errorCaught = null;
  let json = null;
  try {
// removed const or let    
    response = await fetch(loginUrl, options);
    json = await response.json();
    token = json.token;
    userID = json.userId;
    console.log("Response", json);
    //delete user

  options = { 
    method: 'POST',
    headers: {
      'Authorization' : 'bearer' + token
    }
  }
// removed const or let
  response = await fetch(delUserURL, options);
  } catch (exception) {
    errorCaught = exception;
    errorWasCaught = true;
    throw console.log(errorCaught);
  }


  expect(errorWasCaught).toBe(false);
  console.log(json.code);
  expect(json.code).toBe(2012);

});








