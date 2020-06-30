#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

temp_sock=$(cat ./tmpAgent/agentSock)
export SSH_AUTH_SOCK=$temp_sock

agent_pid=$(cat ./tmpAgent/agentPID)

# Remove our key from the ssh-agent
ssh-add -D $agent_pid >/dev/null

# remove the ./tmpKeys and .tmpAgent folders and all contents
rm -rf ./tmpKeys
rm -rf ./tmpAgent

exit 0