from conftest import user
import time
import json
from utility.delete_user import delete_user
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


def test_signup(driver, wait, wait_for_url, get_local_storage):
    driver.get("https://public.p59.dev/welcome")

    # Click nav bar sign up
    wait('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/span[2]').click()

    # Enter information
    wait('//*[@id="firstName"]').send_keys('Test')
    wait('//*[@id="lastName"]').send_keys('User') 
    wait('//*[@id="emailId"]').send_keys('jacob+16581@pitch59.com') # For some reason p59testa@gmail.com does not work in this test
    wait('//*[@id="contactNumber"]/input').send_keys('9999993458')
    wait('//*[@id="zipCode"]').send_keys('83440')
    wait('//*[@id="password"]').send_keys('Oatmeal03957')
    wait('//*[@id="repassword"]').send_keys('Oatmeal03957')

    # Click sign up
    wait('/html/body/app-root/main/app-new-sign-up/div/div/div/div[2]/div/form/div[9]/button').click()

    # Enter OTP code
    wait('/html/body/div/div/div[2]/div/div[2]/div/app-verify-input/div/div[1]/input[1]').send_keys('9')
    wait('/html/body/div/div/div[2]/div/div[2]/div/app-verify-input/div/div[1]/input[2]').send_keys('9')
    wait('/html/body/div/div/div[2]/div/div[2]/div/app-verify-input/div/div[1]/input[3]').send_keys('9')
    wait('/html/body/div/div/div[2]/div/div[2]/div/app-verify-input/div/div[1]/input[4]').send_keys('9')

    # Click verify
    wait('/html/body/div[1]/div/div[2]/div/div[2]/div/app-verify-input/div/div[2]/button').click()

    # Wait until the next page has loaded to verify that we successfully signed up
    wait_for_url('https://public.p59.dev/cards-packages')

    # Clean up after ourselves, delete the user we just signed up through an API call
    userDetails = get_local_storage('userDetails')
    response = delete_user(userDetails['userId'], userDetails['token'])

    assert response.status_code == 200
