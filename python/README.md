# How to use this project

## Regular (Desktop) Mode
- Run this command: `pip install selenium`
- Run this command: `python [scriptname]`
(remove the brackets above and change to the actual script)

## Docker Mode

Docker is a containerization framework, whereby you can access any type of computer with a single command, and it runs almost anywhere (especially the cloud).
In this case we are accessing a miniature computer or 'container' running chrome browser.
The advantage to this approach is not having to install the Selenium Chrome Driver on your computer, AND we are now ready to deploy this to the cloud.

- Install Docker: https://docs.docker.com/get-docker/
- Make sure Docker is running - you should see an icon on your computer showing it running
- Type this command: `docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-beta-3-20210426`
- Now that chrome is running in the docker container on port 4444, you can access it using a python test
- Run this command: `python [scriptname] -h`
(remove the brackets above and change to the actual script)
