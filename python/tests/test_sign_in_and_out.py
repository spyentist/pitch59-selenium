import time

def test_login(driver, wait, wait_for_url, user, get_local_storage):
    driver.get("https://public.p59.dev/welcome")

    # Click nav bar login
    wait('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/span[3]').click()

    # Fill out username and password
    wait('//*[@id="email"]').send_keys(user['email'])
    wait('//*[@id="password"]').send_keys(user['password'])

    # Click login
    wait(
        '/html/body/app-root/main/app-new-sign-in/div/div/div/div/div[2]/div/form/button').click()

    # Click nav bar profile
    wait('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/div[4]/div').click()

    # Click logout
    wait('//*[@id="header-container"]/div/app-welcome-page-header/div/div[2]/p-overlaypanel[2]/div/div/div/div[2]/div').click()
