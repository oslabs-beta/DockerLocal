# Find Dockerfiles in chosen repository
# it will find the docker file in the directory in which exec_shell.js is called

FILE=*[dD]ocker*
# Folder path WILL change in production
find ./myRepos -name "$FILE" -type f