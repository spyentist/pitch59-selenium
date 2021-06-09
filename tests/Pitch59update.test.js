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
        "emailId": "ironman@gmail.com",
        "password": "BetterThanCap10"
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
/* Create new information */
const newEmail = "ironman1@gmail.com";
const newZip = "83402";
const newFname = "Julio";
const newLname = "Tester";
const newPhone = "(999) 999-9125";

it(`Testing to see if we can update information`, async () => {
    let options = {
        method: 'PUT',
        uri: updateUrl,
        headers: {
            "authorization": `bearer ${log_token}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "contactNumber": newPhone,
            "emailId": newEmail,
            "zipCode": newZip,
            "firstName": newFname,
            "lastName": newLname,
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

it(`Testing to see if information was updated`, async () => {
  const getUrl = config.get('pitch59-url') + `/api/users/${user_id}/profile`;
  console.log(getUrl);
  console.log(user_id);
  let options = {
    method: 'GET',
    uri: getUrl,
    headers: {
      "authorization": `bearer ${log_token}`,
      "content-type": "application/json"
    }
  };
  let errorWasCaught = false;
  let errorCaught = null;
  let json = null;
  try {
      const response = await fetch(getUrl, options);
      json = await response.json();
      console.log("Response", json);
      data = json.data;
  } catch (exception) {
      errorcaught = exception;
      errorWasCaught = true;
      throw console.log(errorCaught);
  }

  expect(errorWasCaught).toBe(false);
  console.log(json.code);
  expect(json.code).toBe(1001);
  expect(data.zipCode).toBe(newZip);
  expect(data.emailId).toBe(newEmail);
  expect(data.contactNumber).toBe(newPhone);
  expect(data.firstName).toBe(newFname);
  expect(data.lastName).toBe(newLname);
});

it(`Testing to see if we can update information`, async () => {
  let options = {
      method: 'PUT',
      uri: updateUrl,
      headers: {
          "authorization": `bearer ${log_token}`,
          "content-type": "application/json"
      },
      body: JSON.stringify({
          "contactNumber": "(999) 999-9456",
          "emailId": "ironman@gmail.com",
          "zipCode": "83440",
          "firstName": "Tony",
          "lastName": "Stark",
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