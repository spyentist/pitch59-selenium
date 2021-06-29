from utility.create_user import create_user
from utility.delete_user import delete_user
import pytest

import requests
import json

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

cmd_options = None
test_user = None


def pytest_addoption(parser):
    parser.addoption("--headless", "-H", action="store_true",
                     help="Use this flag to run the chromer driver in headless mode")
    parser.addoption("--docker", "-D", action="store_true",
                     help="Use this flag if you are running the chrome driver in a remote docker container")
    parser.addoption("--ci", action="store_true",
                     help="Use this flag if you are running these tests on a CI server")


def pytest_configure(config):
    global cmd_options
    cmd_options = config.option

# Get a user for all tests to use
def pytest_sessionstart(session):
    global test_user

    user_dict = {
        "firstName": "Test",
        "lastName": "User",
        "isTesterUser": True,
        "contactNumber": "(999) 999-4445",
        "emailId": "p59testa+5@gmail.com",
        "password": "BetterThanCap10",
        "zipCode": "84440",
        "otpCode": 9865
    }

    response = create_user(user_dict)

    # run again, for some reason after deleting a test user you need to sign up twice
    if isinstance(response.json(), list):
        response = create_user(user_dict)

    try:
        data = response.json()['data']
        test_user = {
            'firstName': user_dict['firstName'],
            'lastName': user_dict['lastName'],
            'email': user_dict['emailId'],
            'password': user_dict['password'],
            'phone': user_dict['contactNumber'],
            'zip': user_dict['zipCode'],
            'userId': data['userId'],
            'roleId': data['roleId'],
            'token': data['token']
        }
    except:
        raise Exception("Global user was not successfully created")

# Remove user
def pytest_sessionfinish(session):
    global test_user
    response = delete_user(test_user['userId'], test_user['token'])
    test_user = None
    if response.status_code != 200:
        raise Exception("Global user was not successfully deleted")


@pytest.fixture(scope="module")
def driver():

    shouldHeadless = cmd_options.headless or cmd_options.ci
    shouldRemote = cmd_options.docker and not cmd_options.ci

    options = webdriver.ChromeOptions()
    options.add_argument(
        'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36')
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--no-sandbox')

    if shouldHeadless:
        options.add_argument('--headless')

    try:
        driver = webdriver.Remote("http://127.0.0.1:4444/wd/hub", DesiredCapabilities.CHROME,
                                  options=options) if shouldRemote else webdriver.Chrome(options=options)
    except:
        raise Exception(
            f"Your {'remote' if shouldRemote else 'local'} chrome driver is not configured correctly")

    return driver


@pytest.fixture(scope="module")
def user():
    global test_user
    return test_user


@pytest.fixture(scope="module")
def wait(driver):
    return lambda xPath, timeout=5: WebDriverWait(driver, timeout).until(EC.element_to_be_clickable((By.XPATH, xPath)))


@pytest.fixture(scope="module")
def wait_for_url(driver):
    return lambda url, timeout=5: WebDriverWait(driver, timeout).until(lambda driver: driver.current_url == url)


@pytest.fixture(scope="module")
def get_local_storage(driver):
    def local_storage(key):
        response = driver.execute_script(f"return window.localStorage.getItem('{key}')")
        return json.loads(response)
    return local_storage