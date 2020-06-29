#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

mkdir ./tmp
ssh-keygen -t ed25519 -f ./tmp/dockerKey -g -N ""
ssh-keyscan github.com >> ~/.ssh/known_hosts

# add ssh key to ssh agent
eval "$(ssh-agent -s)"
ssh-add ./tmp/dockerKey