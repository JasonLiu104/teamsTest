#!/bin/bash 

MKCERT_PATH=$(which mkcert)
BREW_PATH=$(which brew)

echo $MKCERT_PATH
echo $BREW_PATH

if [ $MKCERT_PATH ]
then
    echo "Find mkcert $MKCERT_PATH"
    cd "$(dirname "$0")"
    echo "Start generate key"
    mkcert -install --key-file ../.devcontainer/nginx/wildcard.104-dev.com.tw-key.pem  --cert-file ../.devcontainer/nginx/wildcard.104-dev.com.tw.pem '*.104-dev.com.tw' localhost 127.0.0.1 ::1
    echo "Finish generate key"

else 
    echo ERROR: "Please install mkcert first"
    exit 1

exit 1
fi