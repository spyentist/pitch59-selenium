from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time

def test_businesscard(driver, wait, user):
    driver.get("https://public.p59.dev/welcome")

    # Log in button click
    wait('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/span[3]').click()

    # Fill out username and password
    wait('//*[@id="email"]').send_keys(user['email'])
    wait('//*[@id="password"]').send_keys(user['password'])

    # Click login
    wait('/html/body/app-root/main/app-new-sign-in/div/div/div/div/div[2]/div/form/button').click()

    # Click Create a Pitchcard
    wait('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/div[2]').click()
    
    # Click Business Basic
    wait('//*[@id="basic"]/div[1]/div[1]/p-radiobutton/div/div[2]/span').click()
    
    # Click Next to advance
    wait('/html/body/app-root/main/app-new-cards-packges/div/div/div/div[3]/div/button').click()

    # Billing page for type of payment
    wait('/html/body/app-root/main/app-billing-page/div/div/div/div/div[2]/app-billing-cycle/div/div[1]/div[2]/div[1]/div/div[2]').click()

    # Billing page 2
    wait("/html/body/app-root/main[@class='header-margin gradient']/app-billing-page[@class='ng-star-inserted']/div[@class='full-height-wrap']/div[@class='page-container container']/div[@class='layout-card main-section']/div[@class='mt-30 p-grid p-justify-center']/div[@class='layout-block ng-star-inserted']/app-visual-video[@class='ng-star-inserted']/div[@class='content']/div[@class='billing-view-item']/div[@class='p-grid p-justify-even no-margins']/div[@class='billing-block bg-white text-center'][1]/div[@class='price-wrap']/div[@class='button-simple bg-gold lg-50 margin-centered']").click()

    


