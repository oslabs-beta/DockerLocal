#!/bin/bash
# Script to generate an SSH key and add github.com to known hosts

# remove the ./tmpKeys folder and all contents
rm -rf ./tmpKeys

# Remove all keys from the ssh-agent
ssh-add -D >/dev/null
# Kill the ssh-agent
eval $(ssh-agent -k)
exit 0