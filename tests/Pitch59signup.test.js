const fetch = require('node-fetch')
const config = require('config');

const signupUrl = config.get('pitch59-url') + '/api/account/sign-up?otp_check=true';

it(`Testing to see if we can sign up a new user`, async () => {
    const date = new Date();
    let options = {
        method: 'POST',
        uri: signupUrl,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
        "id":"0",
        "firstName":"Jimothy",
        "lastName":"Burns",
        "isTesterUser": true, 
        "contactNumber":"(999) 999-1330",
        "emailId":"myfriend@gmail.com",
        "profilePictureThumbnailId":"",
        "profilePictureThumbnailUrl":"",
        "profilePictureFileId":"",
        "password":"YoDaddy",
        "zipCode":"84440",
        "userReferralModel":{
            "id":"0",
            "userName":"",
            "referralEmail":"Shandu@gmail.com",
            "referralPhone":"",
            "senderEmail":""
            },
            "otpCode":9865},
            )
        };

    let errorWasCaught = false;
    let errorCaught = null;
    
    try {
        let response = await fetch(signupUrl, options);
        let json = await response.json();
        console.log('Response',json);
        return response;
        
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

    expect(errorWasCaught).toBe(false);
});





