#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

mkdir ./tmpKeys
ssh-keygen -t ed25519 -f ./tmpKeys/dockerKey -g -N ""
ssh-keyscan github.com >> ~/.ssh/known_hosts

# add ssh key to ssh agent
if [ $(ps ax | grep ssh-agent | wc -l) -gt 1 ] ; then
    echo "ssh-agent is already running"
    temp_sock=$(cat ./tmpAgent/agentInfo)
    export SSH_AUTH_SOCK=$temp_sock
else
    eval $(ssh-agent -s)
    echo $SSH_AUTH_SOCK > ./tmpAgent/agentInfo
fi


ssh-add ./tmpKeys/dockerKey
exit 0