#!/bin/bash
# Script to clone a github repository

ssh-keyscan github.com >> ~/.ssh/known_hosts
git clone git@github.com:KattyPolyak/gitkat.git
echo "We finished cloning"
