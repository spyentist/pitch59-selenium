const fetch = require("node-fetch");
const config = require('config');

const signupUrl = config.get('pitch59-url') + '/api/account/sign-up?otp_check=true';

it(`Testing to see if we can sign up a new user`, async () => {
    const date = new Date();
    let options = {
        method: 'POST',
        uri: signupUrl,
        headers: {
        },
        body: {"id":"0",
        "firstName":"Richard",
        "lastName":"Kevyn",
        "contactNumber":"(999) 999-1346",
        "emailId":"Shandu@gmail.com",
        "profilePictureThumbnailId":"",
        "profilePictureThumbnailUrl":"",
        "profilePictureFileId":"",
        "password":"Lutendo1",
        "zipCode":"84440",
        "userReferralModel":{
            "id":"0",
            "userName":"",
            "referralEmail":"Shandu@gmail.com",
            "referralPhone":"",
            "senderEmail":""
            },
            "otpCode":9865},
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
    const response = await fetch(loginUrl, options);
    json = await response.json();
    console.log("Response", json);
  } catch (exception) {
    errorCaught = exception;
    errorWasCaught = true;
    throw console.log(errorCaught);
  }

  expect(errorWasCaught).toBe(true);
  console.log(json.code);
  expect(json.code).toBe(2012);
});




