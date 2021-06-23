#All the import statements. These essentially bring in more functions for the program to use and reference
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import time
import sys
import getopt
import requests
import names
import random
import string

#Not sure exactly what this does, but leave it alone it is important and it works
def main(argv):
    option = False
    try:
        opts, args = getopt.getopt(argv, "h")
    except getopt.GetoptError:
        print('err')
        sys.exit(2)

    for opt, arg in opts:
        if opt in ['-h']:
            option = True
            print('option = true')
            return option

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"

""" Start Web Driver """
#These options allow the webdriver to run headless (meaning that it will automate the test without actually opening chrome)
options = webdriver.ChromeOptions()
options.headless = main(sys.argv[1:])
options.add_argument(f'user-agent={user_agent}')
options.add_argument("--window-size=1920,1080")
options.add_argument('--ignore-certificate-errors')
options.add_argument('--allow-running-insecure-content')
options.add_argument("--disable-extensions")
options.add_argument("--proxy-server='direct://'")
options.add_argument("--proxy-bypass-list=*")
options.add_argument("--start-maximized")
options.add_argument('--disable-gpu')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--no-sandbox')
# driver = webdriver.Chrome(executable_path="chromedriver.exe", options=options)
# If you have docker installed (if not bottom of this page has some instructions)
# You can comment out line 47 and uncomment lines 50-51 to have it run remotely on pitch59's servers
driver = webdriver.Remote(
    "http://127.0.0.1:4444/wd/hub", DesiredCapabilities.CHROME, options=options)
driver.get("https://public.p59.dev/welcome")

# PATH = "D:\Programs\chromedriver_win32\chromedriver.exe"
# driver = webdriver.Chrome(PATH)
# driver.get("https://public.p59.dev/welcome")
# driver = webdriver.Chrome()
# driver.maximize_window()

""" CREATE A USER """
#Call create user API (from postman)
# :)
# specify the function to be carried out
signupURL = "api/account/sign-up?otp_check=true"

# set a variable to equal the URL
pitch59_URL = f"https://api.p59.dev/{signupURL}"

#grab new user info from tester
firstname = input("Please input first name: ")
lastname = input("Please enter last name: ")
phonenumber = input("PlEASE enter a phone numbER: ")
email = input("Plase entar ya'rr email here: ")
passwordInput = input("Enter password: ")
zipcode = input("Now your zip code: ")

# set arguments that focus the data request
args = {
        "firstName": firstname,
        "lastName": lastname,
        "isTesterUser": True,
        "contactNumber": phonenumber,
        "emailId": email,
        "password": passwordInput,
        "zipCode": zipcode,
        "otpCode": 9865
    }
body = {
    "firstName": "Julie",
    "lastName": "Tester",
    "isTesterUser": True,
    "contactNumber": "(999) 999-4444",
    "emailId": "bobhope1234@hotmail.com",
    "password": "BetterThanCap10",
    "zipCode": "84440",
    "otpCode": 9865
}
# request information from endpoint according to listed arguments
response = requests.post(pitch59_URL, json=args)
# check for successful request
if response.status_code == 200:
    #convert data to a python dictionary
    print(response.status_code, "- Create User Success!", "\n")
    data_dict = response.json()["data"]
    userId = data_dict["userId"]
    userToken = data_dict["token"]
else:
    #The request failed- print the status code:
    print("Failure with status code:", response.status_code)
    print(response.json())

""" BREAK IN """
def simple_user():
    name= names.get_first_name() + names.get_last_name()
    #print(name)
    return name

def simple_pass(pass_len):
    """
    Creates a simple password.
    Parameter "pass_len" is the character length of the password to be created.
    """
    characters = string.ascii_letters + string.digits
    # Picks a random mandatory number.
    mandatory_number = str(random.randint(0, 9))
    # Picks a random mandatory lowercase.
    mandatory_lowercase = string.ascii_lowercase
    mandatory_lowercase = ''.join(random.choice(mandatory_lowercase) for i in range(1))
    # Picks a random mandatory uppercase.
    mandatory_uppercase = string.ascii_uppercase
    mandatory_uppercase = ''.join(random.choice(mandatory_uppercase) for i in range(1))
    # Randomly choices characters from the characters variable.
    password =  "".join(random.choice(characters) for x in range(pass_len - 3))
    # Concatenates the password variable with the three mandatory variables.
    password = password + mandatory_number + mandatory_lowercase + mandatory_uppercase
    return password

# A dictionary that holds all the logins
dictUsers = {
    email : passwordInput
}

# A loop that adds random emails and passwords to the list
for i in range(100):
    if i < 10:
        userEmail = simple_user() + "@gmail.com"
        dictUsers[userEmail] = simple_pass(8)
    elif i < 20:
        userEmail = simple_user() + "@yahoo.com"
        dictUsers[userEmail] = simple_pass(8)
    elif i < 30:
        userEmail = simple_user() + "@hotmail.com"
        dictUsers[userEmail] = simple_pass(8)
    elif i < 40:
        userEmail = simple_user() + "@aol.com"
        dictUsers[userEmail] = simple_pass(8)
    elif i < 70:
        userEmail = simple_user() + "@yahoo.com"
        dictUsers[userEmail] = passwordInput
        # dictUsers[userEmail] = "BetterThanCap10"
    elif i < 100:
        # userEmail = "bobhope1234@hotmail.com"
        dictUsers[simple_pass(8)] = email
        # dictUsers[simple_pass(8)] = userEmail


# Just some basic variables to keep track of logins
loginSuccess = 0
whichLogin = ""
counter = 0

# A loop to go through the dictionary of logins
for k in dictUsers:
    counter += 1
    # Makes selenium click log in button
    link = driver.find_element_by_xpath('/html/body/app-root/p-sidebar/div/div/div/app-welcome-page-header/div/div[2]/span[3]')
    link.click()
    print("clicked log in")
    time.sleep(1)
    #Enters the username and password then clicks submit
    email = driver.find_element_by_id('email')
    passwrd = driver.find_element_by_id('password')
    submit = driver.find_element_by_xpath('/html/body/app-root/main/app-new-sign-in/div/div/div/div/div[2]/div/form/button')
    if counter < 70:
        email.send_keys(k)
        print("email input")
        passwrd.send_keys(dictUsers[k])
        print('password input')
    else:
        email.send_keys(dictUsers[k])
        print("email input")
        passwrd.send_keys(k)
        print('password input')
    submit.click()
    print('clicked submit')    
    time.sleep(3)
    # Some code to check if login was successful
    try:
        # Trys to click on account and log out, if it can't find these buttons then log in failed
        account = driver.find_element_by_xpath('/html/body/app-root/p-sidebar/div/div/div/app-welcome-page-header/div/div[2]/div[4]/div')
        # index = vowels.index('e')
        print('Log In #', counter,' Successful')
        loginSuccess += 1
        if i < 70:
            whichLogin = whichLogin + "Email: " + k + "\n" + "Password: " + dictUsers[k] + "\n \n"
        else:
            whichLogin = whichLogin + "Email: " + dictUsers[k] + "\n" + "Password: " + k + "\n \n"
        account.click()
        print('Clicking account')
        time.sleep(1)
        logout = driver.find_element_by_xpath('/html/body/app-root/p-sidebar/div/div/div/app-welcome-page-header/div/div[2]/p-overlaypanel[2]/div/div/div/div[2]/div')
        logout.click()
        time.sleep(1)
        print('Logged Out\n')
        driver.refresh()
        time.sleep(1)
        pass
    except NoSuchElementException:
        # print('Log in Unsuccessful')
        print('Log In #', counter,' Unsuccessful\n')
        driver.refresh()
        time.sleep(1)
        continue
# After the loop displays some messages indicating the number of successful logins
if loginSuccess == 1:
    print(f"There was {loginSuccess} successful login")
    print(f"The account that successfully logged in was: \n {whichLogin}")
elif loginSuccess == 0:
    print("There were no successful logins")
else:
    print(f"There were {loginSuccess} successful logins")
    print(f"The accounts that successfully logged in were: \n{whichLogin}")




""" DELETE A USER"""
#Call Delete user API (from postman)
deleteURL = f"api/users/{userId}/deleteTestUser"
pitch59_URL = f"https://api.p59.dev/{deleteURL}"
body = {}
head = {
    "content-type": "application/json",
    "Accept" : "*/*",
    "Accept-Encoding" : "gzip, deflate, br",
    "Connection" : "keep-alive",
    "Authorization" : f"bearer {userToken}"
}
# request information from endpoint according to listed arguments

response = requests.post(pitch59_URL, data=body, headers=head)

# check for successful request
# print(response.status_code) 
if response.status_code == 200:
    #convert data to a python dictionary

    print(response.status_code, "- Successfully deleted! :D")

    print(response.json())
else:
    #The request failed- print the status code:
    print("Failure with status code:", response.status_code)
    print(response.json())

""" Tell the driver to stop running """
driver.quit()



""" Docker Install """
#Go to https://www.docker.com/get-started and download the Docker Desktop
#Install it...

""" Docker startup command """
#Once installed and running type the following command in your computers command prompt
#docker run -d -p 4444:4444 selenium/standalone-chrome