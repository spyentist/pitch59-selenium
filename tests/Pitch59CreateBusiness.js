const fetch = require("node-fetch");
const config = require("config");

const loginUrl = config.get("pitch59-url") + "/api/business/add-business-by-billing-and-payment-plan";

it(`Testing to see if we can signin`, async () => {
  let options = {
    method: "POST",
    headers: {
      "content-type": "application/json"//,
      //"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTSUQiOiIrM3dGZEhXaUdCOXNiTjZ2MWdEa0w4elJwNElidlB2Qit2WU9wd1h5cVdoWGVJQXpsRmFybDlub2tPNjI2RE96IiwiVUlEIjoiM2ZoZ2pUbTk2d3VndysxZmZrVVpLYW9yMnNveWZxV0dBR3hoc2xzMzdJajEwV3hQUXVCQjJPZVlqcjVBaWpEOSIsIlJJRCI6IncyalExY3ZUaHpONHNXOVNPcGhjSHUrQytPcCtjNW9LYVdJc201VHp4Wkk9Iiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2MjEwMDM5MTUsImV4cCI6MTYyMTM2MzkxNSwiaWF0IjoxNjIxMDAzOTE1LCJpc3MiOiJQaXRjaDU5QVBJIiwiYXVkIjoiUGl0Y2g1OVdlYkNsaWVudCJ9.q5cCgDD-7SDHI7pjyHdgkvcbcP0dlQd9xJxxNODcyds"
    },
    body: JSON.stringify({
        "businessType": "resume",
        "inviteId": null,
        "billingMethodDto": {
            "id": "367",
            "type": 2
        },
        "paymentPlanDto": {
            "paymentFrequency": 2,
            "virtualVideo": false,
            "discountCode": "",
            "referralEmail": "scmurdock@gmail.com"
        }
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
