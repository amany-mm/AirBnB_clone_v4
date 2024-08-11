#!/usr/bin/env bash


sudo apt-get install libffi-dev
sudo apt-get install libssl-dev
sudo apt-get install build-essential
sudo apt-get install python3.8-dev
sudo apt-get install libpython3-dev

sudo apt-get install python3-dev default-libmysqlclient-dev build-essential

sudo apt-get install -y python3-lxml

sudo pip3 uninstall -y jsonschema 

pip3 install -r requirements.txt
