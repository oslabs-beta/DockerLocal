#!/bin/bash
# Script to clone a github repository

# handle incoming arguments, username and repoName
username=$1
repoName=$2

# get the sock address of our ssh agent so that we can connect to it
temp_sock=$(cat ./tmpAgent/agentSock)
# add the ssh agent sock to the environment variables
export SSH_AUTH_SOCK=$temp_sock

# create a myRepos folder to store repositories if it doesn't already exist
if [ ! -d "./myRepos" ] 
then
mkdir ./myRepos
fi

cd myRepos

# clone a git repository from github using ssh connection
git clone git@github.com:$username/$repoName.git
echo "We finished cloning"
exit 0