# Find Dockerfiles in chosen repository
projectFolder=$1
FILE=*[dD]ocker*
# Folder path WILL change in production
find ./myProjects/"$projectFolder" -name "$FILE" -type f
# allows for error output if no 
if test $(find ./myProjects/"$projectFolder" -name "$FILE" -type f| wc -c) -eq 0
then
    echo missing repository with Dockerfile
    exit 1
fi
exit 0