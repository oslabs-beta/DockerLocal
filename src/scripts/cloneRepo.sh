#!/bin/bash
# Script to clone a github repository

# handle incoming arguments, username and repoName
username=$1
repoName=$2
projectName=$3

# get the sock address of our ssh agent so that we can connect to it
temp_sock=$(cat ./tmpAgent/agentSock)
# add the ssh agent sock to the environment variables
export SSH_AUTH_SOCK=$temp_sock

# create a myProjects folder to store repositories if it doesn't already exist
if [ ! -d "./myProjects" ] 
then
  mkdir ./myProjects
fi
cd myProjects
# create a folder named after the current project if one doesn't exist already
if [ ! -d "./$projectName" ] 
then
  mkdir $projectName
fi

cd $projectName

# clone a git repository from github using ssh connection
git clone git@github.com:$username/$repoName.git
echo "We finished cloning"
exit 0