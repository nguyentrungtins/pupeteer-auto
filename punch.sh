#!/bin/bash

# Change this to the path of your Node.js project
PROJECT_DIR="/home/ec2-user/blp-punch/pupeteer-auto"

# Navigate to the project directory
cd "$PROJECT_DIR" || exit

# Run yarn start
yarn start
