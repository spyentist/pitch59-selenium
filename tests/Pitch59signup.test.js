const rp = require('request-promise-native');
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
        json: true,
        simple: false,
    };

    let errorWasCaught = false;
    let errorCaught = null;

    try {
        let response = await rp(options);
        return response;
    } catch (exception) {
        errorCaught = exception;
        errorWasCaught = true;
        throw console.log(errorCaught);
    }

    expect(errorWasCaught).toBe(false);
});


