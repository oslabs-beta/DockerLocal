#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

# get the sock address of our ssh agent so that we can connect to it
temp_sock=$(cat ./tmpAgent/agentSock)
# add the ssh agent sock to the environment variables
export SSH_AUTH_SOCK=$temp_sock

# get the process id of the ssh-agent we created in sshKeygen.sh
agent_pid=$(cat ./tmpAgent/agentPID)

# Kill the ssh-agent which we created in sshKeygen.sh
ssh-add -D $agent_pid >/dev/null

# remove the ./tmpKeys and .tmpAgent folders and all contents
rm -rf ./tmpKeys
rm -rf ./tmpAgent

exit 0