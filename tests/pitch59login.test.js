const fetch = require("node-fetch");
const config = require("config");

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
      emailId: "myfriend@gmail.com",
      password: "YoDaddy"
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

  expect(errorWasCaught).toBe(false);
  console.log(json.code);
  expect(json.code).toBe(2012);
});
