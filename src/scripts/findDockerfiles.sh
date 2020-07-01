# Find Dockerfiles in chosen repository
project_folder = $1
FILE=*[dD]ocker*
# Folder path WILL change in production
find ./myRepos/project_folder -name "$FILE" -type f