from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import sys, getopt


def main(argv):
   try:
      opts, args = getopt.getopt(argv,"h")
   except getopt.GetoptError:
      print ('err')
      sys.exit(2)
      
   headless = False
   for opt, arg in opts:
      if opt in ['-h']:
         headless = True

   if headless:
      driver = webdriver.Remote("http://127.0.0.1:4444/wd/hub", DesiredCapabilities.CHROME, options=options) 
   else:
      driver = webdriver.Chrome(options=options)
   return driver

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
options = webdriver.ChromeOptions()
options.add_argument(f'user-agent={user_agent}')
options.add_argument('--disable-gpu')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--no-sandbox')
options.add_argument('--headless')

driver = main(sys.argv[1:])
driver.get("https://public.p59.dev/welcome")

def wait(xpath):
   return WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, xpath)))

print('test start')
link = wait('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/span[3]')
link.click()
print('click login')

email = wait('//*[@id="email"]')
email.send_keys('1111@gmail.com')

password = wait('//*[@id="password"]')
password.send_keys('Love1111')

logIn = wait(
    '/html/body/app-root/main/app-new-sign-in/div/div/div/div/div[2]/div/form/button')
logIn.click()
print('log in')

profi = wait(
    '//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/div[4]/div')
profi.click()

logOut = wait(
    '//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/p-overlaypanel[2]/div/div/div/div[2]/div')
logOut.click()
print('click profile and log out')

print("test end")
driver.quit()