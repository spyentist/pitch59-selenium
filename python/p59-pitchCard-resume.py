from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time
import sys, getopt
from selenium.webdriver.common.action_chains import ActionChains


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
      driver = webdriver.Chrome(executable_path="chromedriver.exe", options=options)
   return driver

user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
options = webdriver.ChromeOptions()
options.headless = False
options.add_argument(f'user-agent={user_agent}')
options.add_argument('--disable-gpu')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--no-sandbox')

driver = main(sys.argv[1:])
driver.get("https://public.p59.dev/welcome")


link = driver.find_element_by_xpath('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/span[3]')
link.click()

email = driver.find_element_by_xpath('//*[@id="email"]')
email.send_keys('1111@gmail.com')

password = driver.find_element_by_xpath('//*[@id="password"]')
password.send_keys('Love1111')

logIn = driver.find_element_by_xpath('/html/body/app-root/main/app-new-sign-in/div/div/div/div/div[2]/div/form/button')
logIn.click()
time.sleep(2)
print('Log in')

createPitchCard = driver.find_element_by_xpath('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/div[2]')
createPitchCard.click()
time.sleep(2)

resume = driver.find_element_by_xpath('//*[@id="resume"]/div[2]/app-search-result-thumbnail')
resume.click()
time.sleep(2)

nextBtn = driver.find_element_by_xpath('/html/body/app-root/main/app-new-cards-packges/div/div/div/div[3]/div/button')
nextBtn.click()
time.sleep(2)
print('create reseme')


# --------Information page ------------
fullName = driver.find_element_by_xpath('//*[@id="businessName"]')
fullName.send_keys('Test')

title = driver.find_element_by_xpath('//*[@id="title"]')
title.send_keys("Web Developer")

emailInfor = driver.find_element_by_xpath('//*[@id="email"]')
emailInfor.send_keys('1111@gmail.com')

phoneNumber = driver.find_element_by_xpath('//*[@id="contactNumber"]/input')
phoneNumber.send_keys('9999999999')

website = driver.find_element_by_xpath('//*[@id="websiteLink"]')
website.send_keys('https://www.linkedin.com/in/jim-tang-19873513b/')

addressInfor = driver.find_element_by_xpath('//*[@id="address"]')
addressInfor.send_keys('235W 2nd S')

cityInfor = driver.find_element_by_xpath('//*[@id="city"]/span/input')
cityInfor.send_keys('rexburg')

stateInfor = driver.find_element_by_xpath('//*[@id="state"]/span/input')
stateInfor.send_keys('ID')

zipInfor = driver.find_element_by_xpath('//*[@id="zip"]')
zipInfor.send_keys('83440')
time.sleep(2)

saveAbdNext = driver.find_element_by_xpath('/html/body/app-root/main/app-layout/div[2]/div/div/div[1]/div[3]/div/div[2]/div')
saveAbdNext.click()
time.sleep(2)
print('finish information page')

# -------------- link page -------------------
facebookLink = driver.find_element_by_xpath('//*[@id="facebookLink"]')
facebookLink.send_keys('11111')

twitterLink = driver.find_element_by_xpath('//*[@id="twitterLink"]')
twitterLink.send_keys('11111')

instagramLink = driver.find_element_by_xpath('//*[@id="instagramLink"]')
instagramLink.send_keys('11111')

linkedInLink = driver.find_element_by_xpath('//*[@id="linkedinLink"]')
linkedInLink.send_keys('11111')

pinterestLink = driver.find_element_by_xpath('//*[@id="linkedinLink"]')
pinterestLink.send_keys('11111')

yourInfo = driver.find_element_by_xpath('//*[@id="description"]')
yourInfo.send_keys('//*[@id="description"]')

saveAbdNext = driver.find_element_by_xpath('/html/body/app-root/main/app-layout/div[2]/div/div/div[1]/div[3]/div/div[2]/div')
saveAbdNext.click()
time.sleep(2)
print('finish link page')


#------------------Radius page --------------------
location = driver.find_element_by_xpath('//*[@id="address"]')
location.send_keys('rexburg')
time.sleep(3)
act = ActionChains(driver)
act.send_keys(Keys.DOWN).perform()
time.sleep(3)

act.send_keys(Keys.RETURN).perform()
time.sleep(2)

saveAbdNext = driver.find_element_by_xpath('/html/body/app-root/main/app-layout/div[2]/div/div/div[1]/div[3]/div/div[2]/div')
saveAbdNext.click()
time.sleep(2)
print('finish Radius page')

# ----------------- position page -----------------------
position = driver.find_element_by_xpath('//*[@id="main-form"]/div/app-employment/form/div/span[1]/p-autocomplete/span/ul/li/input')
position.send_keys('software')
act.send_keys(Keys.DOWN).perform()
time.sleep(3)

act.send_keys(Keys.RETURN).perform()
time.sleep(2)

# workType = driver.find_element_by_xpath('//*[@id="main-form"]/div/app-employment/form/div/div[1]/div[1]/p-dropdown/div')
# workType.click()

# fullTime = driver.find_element_by_xpath('//*[@id="main-form"]/div/app-employment/form/div/div[1]/div[1]/p-dropdown/div/div[4]/div/ul/p-dropdownitem[2]/li')
# fullTime.click()

# education = driver.find_element_by_xpath('//*[@id="main-form"]/div/app-employment/form/div/div[1]/div[2]/p-dropdown/div')
# education.click()

# bachelorDegree = driver.find_element_by_xpath('//*[@id="main-form"]/div/app-employment/form/div/div[1]/div[2]/p-dropdown/div/div[4]/div/ul/p-dropdownitem[7]/li')
# bachelorDegree.click()

# university = driver.find_element_by_xpath('//*[@id="main-form"]/div/app-employment/form/div/span[2]/p-autocomplete/span/ul/li/input')
# university.send_keys('BYU-I')

# skills = driver.find_element_by_xpath('//*[@id="main-form"]/div/app-employment/form/div/span[3]/p-autocomplete/span/ul/li/input')
# skills.send_keys('JavaScript')

saveAbdNext = driver.find_element_by_xpath('/html/body/app-root/main/app-layout/div[2]/div/div/div[1]/div[3]/div/div[2]/div')
saveAbdNext.click()
time.sleep(2)
print('finished Employment page')


#-------------------- image update page -------------------

# //*[@id="main-form"]/div/app-images/div/div[1]/div[3]/button/input
# driver.find_element_by_xpath('//*[@id="main-form"]/div/app-images/div/div[1]/div[3]/button').click()
driver.find_element_by_xpath('//*[@id="main-form"]/div/app-images/div/div[1]/div[3]/button/input').send_keys('C://Users/after/OneDrive/桌面/resume2021/WeiChunTangresume.pdf')
time.sleep(2)
print('upload resume')


# //*[@id="main-form"]/div/app-images/div/div[2]/div[1]/button/input
# driver.find_element_by_xpath('//*[@id="main-form"]/div/app-images/div/div[2]/div[1]/button').click()
time.sleep(2)
driver.find_element_by_xpath('//*[@id="main-form"]/div/app-images/div/div[2]/div[1]/button/input').send_keys('E:/BYUI/wddinternship/images/BYUI.png')
time.sleep(2)
print('upload company image')

driver.find_element_by_xpath('//*[@id="main-form"]/div/app-images/div/div[1]/div[1]/button/app-image-uploader/input').send_keys('C://Users/after/OneDrive/桌面/Jim.jpg')
time.sleep(5)
driver.find_element_by_xpath('/html/body/div[3]/div/div[3]/p-footer/div').click()
time.sleep(5)
print('upload personal image')
time.sleep(2)

saveAbdNext = driver.find_element_by_xpath('/html/body/app-root/main/app-layout/div[2]/div/div/div[1]/div[3]/div/div[2]/div')
saveAbdNext.click()
time.sleep(5)

# --------------------- video update  -------------------------

driver.find_element_by_xpath('//*[@id="main-form"]/div/app-pitch-video/div/div/div/div[2]/div').click()
time.sleep(2)
driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div/div[1]/p/p-checkbox/div/div[2]').click()
driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div/div[2]/p/p-checkbox/div/div[2]').click()
driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div/div[3]/p/p-checkbox/div/div[2]').click()
time.sleep(1)
driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div/button').click()

driver.find_element_by_xpath('//*[@id="main-form"]/div/app-pitch-video/div/div/div/div[2]/div').send_keys('E:/BYUI/wddinternship/images/test.mp4')
time.sleep(5)
# C:/Users/after/OneDrive/桌面/selenium/images/test.mp4

print('test end')
# driver.quit()