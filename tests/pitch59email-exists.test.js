const fetch = require("node-fetch");
const config = require("config");

const loginUrl = config.get("pitch59-url") + "/api/account/email-exists";

it(`Testing whether email addresses exist (have been registered?) in Pitch59`, async () => {
  //
  // Test sean.murdock@gmail.com
  //
  let emailId = "scmurdock%40gmail.com";
  let options = {
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    //body: JSON.stringify({
    //  //"emailId": "Shandu@gmail.com",
    //  //"password": "Lutendo1"
    //  emailId: "ironman@gmail.com",
    //  password: "BetterThanCap10"
    //})
  };
  let fullUrl = loginUrl + '?email=' + emailId;
  //console.log("", fullUrl);
  let errorWasCaught = false;
  let errorCaught = null;
  let json = null;
  try {
    const response = await fetch(fullUrl, options);
    json = await response.json();
    console.log("Response", json);
  } catch (exception) {
    errorCaught = exception;
    errorWasCaught = true;
    throw console.log(errorCaught);
  }

  expect(errorWasCaught).toBe(false);
  console.log(json.code);
  expect(json.code).toBe(2012);
});
