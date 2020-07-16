# Find Dockerfiles in chosen repository
projectFolder=$1
FILE=*[dD]ocker*
# Folder path WILL change in production
find ./myProjects/"$projectFolder" -name "$FILE" -type f