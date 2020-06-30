#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

keyIdentity=$1

temp_sock=$(cat ./tmpAgent/agentInfo)
export SSH_AUTH_SOCK=$temp_sock

# Remove our key from the ssh-agent
ssh-add -d $keyIdentity >/dev/null

# remove the ./tmpKeys folder and all contents
rm -rf ./tmpKeys

exit 0