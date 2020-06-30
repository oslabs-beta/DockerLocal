#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

mkdir ./tmpKeys
ssh-keygen -t ed25519 -f ./tmpKeys/dockerKey -g -N ""
ssh-keyscan -H github.com -y >> ~/.ssh/known_hosts

# start ssh agent 
eval $(ssh-agent -s)

# save ssh agent sock info and agent PID so that we can connect later
mkdir ./tmpAgent
echo $SSH_AUTH_SOCK > ./tmpAgent/agentSock
echo $SSH_AGENT_PID > ./tmpAgent/agentPID

# add ssh key to ssh agent
ssh-add ./tmpKeys/dockerKey
exit 0