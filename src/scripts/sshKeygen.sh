#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

mkdir ./tmpKeys
ssh-keygen -t ed25519 -f ./tmpKeys/dockerKey -g -N ""
ssh-keyscan github.com >> ~/.ssh/known_hosts

# add ssh key to ssh agent
eval "$(ssh-agent -s)"
ssh-add ./tmpKeys/dockerKey
exit 0