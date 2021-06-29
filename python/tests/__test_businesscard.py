from selenium import webdriver
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

    # Click Create a pitchcard
    wait('//app-welcome-page-header/div[1]/div[2]/div[2]/div[1]').click()

    # Click the radio button
    wait('//body/app-root[1]/main[1]/app-new-cards-packges[1]/div[1]/div[1]/div[1]/div[2]/div[4]/div[1]/div[1]/p-radiobutton[1]/div[1]/div[2]/span[1]').click()

    # Click Next button
    wait("//button[contains(text(),'Next')]").click()

    # Selecting the Billing Cycle
    wait("//body/app-root[1]/main[1]/app-billing-page[1]/div[1]/div[1]/div[1]/div[1]/div[2]/app-billing-cycle[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]").click()

    # Selecting Free video
    wait("//body/app-root[1]/main[1]/app-billing-page[1]/div[1]/div[1]/div[1]/div[1]/div[2]/app-visual-video[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]").click()
    
    # Add a payment method
    wait("//div[contains(text(),'ADD PAYMENT METHOD')]").click()

    driver.find_element_by_xpath('//*[@id="cardNumber"]/input').send_keys('4022400001871076')
    driver.find_element_by_xpath('//*[@id="month"]/span/input').send_keys('12')
    driver.find_element_by_xpath('//*[@id="year"]/span/input').send_keys('2021')
    driver.find_element_by_xpath('//*[@id="cvc"]').send_keys('737')

    wait("/html/body/div[1]/div/div[2]/div/div[2]/app-payment-method-forms/div/div/div[2]/div/button").click()
    
    wait("//button[contains(text(),'CREATE A PITCHCARD')]").click()
    
    
    # wait("").click()
    
    
    # wait("").click()
    
    
    # wait("").click()      