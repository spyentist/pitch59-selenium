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

//TODO add create user (to avoid token dependency) then add buisness then remove business and user
const fetch = require("node-fetch");
const config = require("config");

const addBusinessUrl = config.get("pitch59-url") + "/api/business/add-business";

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTSUQiOiI1eXRCTVc3Qm5BRTdQQVNKT3ZvblRmUzBmY09QNGsxb0RzQW1jN0xIeEVDc2hMekxYZ3NUYktEckUzMWFUTGdkIiwiVUlEIjoib0QrVit5ZEVYL3NpRzRtUWZUUzN6a2JPMzRCU3lDNTU2OU5SUkhra0w4UTc4eUxSL0hHdWJNT2g0MWNBdGZNaSIsIlJJRCI6IjEweWQ0Sys4T2Y5UFViT1o4ZDhaOUNhQVVGMWxwSW9hdGFCRXp1TWh3WTg9Iiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2MjEyNjEyODUsImV4cCI6MTYyMTYyMTI4NSwiaWF0IjoxNjIxMjYxMjg1LCJpc3MiOiJQaXRjaDU5QVBJIiwiYXVkIjoiUGl0Y2g1OVdlYkNsaWVudCJ9.9ZHIZ1AwPKNuS8rQ_T0EClAEC4m8iC2cQj6AdqRPhZs"

it(`addBusiness test`, async () => {
  let options = {
    method: "POST",
    uri: addBusinessUrl,
    headers: {
      "authorization": "bearer " + token , //business will be created for account represented by the bearer token
      "accept": "*",
      "content-type":"application/json"
    },
    body: JSON.stringify({
      "businessType": "resume",
      "businessName": "Craig" //api does note validate unique businessName
    })
  };

  let errorWasCaught = false;
  let errorCaught = null;
  let json = null;
  let response=null;
  try {
    response = await fetch(addBusinessUrl, options);
    console.log('response ' + response.status);
    if (response.status == 200) {
      json = await response.json();
      console.log(json);
    }
  } catch (exception) {
    errorCaught = exception;
    errorWasCaught = true;
    console.log(errorCaught);
  }

  expect(errorWasCaught).toBe(false);
  expect(response.status).toBe(200)

});
