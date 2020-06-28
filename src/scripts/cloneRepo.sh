#!/bin/bash
# Script to clone a github repository

username=$1
repoName=$2


ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone git@github.com:$username/$repoName.git
echo "We finished cloning"
