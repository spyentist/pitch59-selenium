const fetch = require("node-fetch");
const config = require("config");

const addBusinessUrl = config.get("pitch59-url") + "/api/business/add-business";

it(`addBusiness test`, async () => {
  let options = {
    method: "POST",
    uri: addBusinessUrl,
    headers: {
      "content-type": "application/json",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTSUQiOiI1eXRCTVc3Qm5BRTdQQVNKT3ZvblRmUzBmY09QNGsxb0RzQW1jN0xIeEVDc2hMekxYZ3NUYktEckUzMWFUTGdkIiwiVUlEIjoib0QrVit5ZEVYL3NpRzRtUWZUUzN6a2JPMzRCU3lDNTU2OU5SUkhra0w4UTc4eUxSL0hHdWJNT2g0MWNBdGZNaSIsIlJJRCI6IjEweWQ0Sys4T2Y5UFViT1o4ZDhaOUNhQVVGMWxwSW9hdGFCRXp1TWh3WTg9Iiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2MjEyNjEyODUsImV4cCI6MTYyMTYyMTI4NSwiaWF0IjoxNjIxMjYxMjg1LCJpc3MiOiJQaXRjaDU5QVBJIiwiYXVkIjoiUGl0Y2g1OVdlYkNsaWVudCJ9.9ZHIZ1AwPKNuS8rQ_T0EClAEC4m8iC2cQj6AdqRPhZs",
      "accept": "application/json"
    },
    body: JSON.stringify({
      "businessType": "resume",
      "businessName": "Craig"
    })
  };

  let errorWasCaught = false;
  let errorCaught = null;
  let json = null;
  try {
    const response = await fetch(addBusinessUrl, options);
    json = await response.json();
    console.log("Response", json);
  } catch (exception) {
    errorCaught = exception;
    errorWasCaught = true;
    throw console.log(errorCaught);
  }

  expect(errorWasCaught).toBe(false);
  console.log(json);
  expect(json.code).toBe(8000)

});
