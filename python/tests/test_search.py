from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

# TODO: Ideas for testing search further
# - Test new search filters (Businesses/Services, Resumes, Location, etc.)
# - Test to verify randomized search results

def test_search(driver, wait):
    driver.get('https://public.p59.dev/search')

    # Click on the search button
    wait('/html/body/app-root/main/app-search-result-page/div/app-search-result/div/div[2]/div/div/div/div/div/div[2]/span').click()

    # Fill in search query
    wait('/html/body/app-root/main/app-search-result-page/div/app-search-result/div/div[2]/div/div/div/div/div/div[1]/div/p-autocomplete/span/input').send_keys('software developer')

    # Click on the search button
    wait('/html/body/app-root/main/app-search-result-page/div/app-search-result/div/div[2]/div/div/div/div/div/div[2]/span').click()

    # Wait for search to complete, look for "Showing 1 of 50" element
    wait('/html/body/app-root/main/app-search-result-page/div/app-search-result/div/div[3]/div')

    # Press enter to search again
    act = ActionChains(driver).send_keys(Keys.RETURN).perform()

    # Wait for search to complete, look for "Showing 1 of 50" element
    wait('/html/body/app-root/main/app-search-result-page/div/app-search-result/div/div[3]/div')