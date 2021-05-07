const fetch = require("node-fetch");
const config = require("config");
let log_token = null;
const loginUrl = config.get("pitch59-url") + "/api/account/login";

it(`Testing to see if we can signin`, async () => {
  let options = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      //"emailId": "Shandu@gmail.com",
      //"password": "Lutendo1"
      emailId: "ironman@gmail.com",
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
    log_token = json.data.token;
    console.log("Token", log_token);

  } catch (exception) {
    errorCaught = exception;
    errorWasCaught = true;
    throw console.log(errorCaught);
  }

  expect(errorWasCaught).toBe(false);
  console.log(json.code);
  expect(json.code).toBe(2012);
});
// console.log('Bearer', log_token);
const signoutUrl = config.get('pitch59-url') + '/api/account/logout';

it(`Testing to see if we can signout`, async () => {
    const date = new Date();
    let options = {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${log_token}`
        }
    };

    let errorWasCaught = false;
    let errorCaught = null;

    try {
        const response = await fetch(signoutUrl, options);
        const txt = await response.text();
        console.log('Response',txt);
        const status = response.status;
        console.log('Status',status);
        
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

    expect(errorWasCaught).toBe(false);
//    expect(status).toBe(200);
});
