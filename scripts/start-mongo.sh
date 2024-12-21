#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Required environment variables
required_vars=(
    "MONGO_PORT"
    "MONGO_CONTAINER_NAME"
)

# Check if all required environment variables are set
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: Environment variable $var is not set." >&2
        exit 1
    fi
done

# Run Docker with dynamic environment variables
docker run -d \
    -p 27017:$MONGO_PORT \
    --rm \
    --name $MONGO_CONTAINER_NAME \
    mongo:5
