#!/bin/bash
# Script to clone a github repository

username=$1
repoName=$2

echo $1 $2

temp_sock=$(cat ./tmpAgent/agentInfo)
export SSH_AUTH_SOCK=$temp_sock

mkdir ./myRepos
cd myRepos

git clone git@github.com:$username/$repoName.git
echo "We finished cloning"
exit 0