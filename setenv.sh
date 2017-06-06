#!/bin/bash

# Script that install essential files according to the package managers settings
# files that were ignored by the version control.
#
# Useful when you just changed the commit in which you are working.

#Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
GRAY='\033[1;30m'
WHITE='\033[1;37m'
NC='\033[0m' #No Color

#NPM
echo -e "${WHITE}Preparing NPM Packages..."
npm --loglevel=silent install && echo -e "${GRAY}NPM packages install :: ${GREEN}OK" || echo -e "${GRAY}NPM packages install :: ${RED}ERROR"
npm --loglevel=silent prune && echo -e "${GRAY}npm prune ${GREEN}ok" || echo -e "${GRAY}npm prune ${RED}failed"

#Ionic Dependencies
echo -e "${WHITE}Preparing Ionic Dependencies..."
npm install firebase angularfire2 --save && echo -e "${GRAY}firebase angularfire2 install :: ${GREEN}OK" || echo -e "${GRAY}firebase angularfire2 install :: ${RED}ERROR"
ionic cordova plugin add cordova-plugin-geolocation && echo -e "${GRAY}cordova-plugin-geolocation install :: ${GREEN}OK" || echo -e "${GRAY}cordova-plugin-geolocation install :: ${RED}ERROR"
npm install --save @ionic-native/geolocation && echo -e "${GRAY}@ionic-native/geolocation install :: ${GREEN}OK" || echo -e "${GRAY}@ionic-native/geolocation install :: ${RED}ERROR"

#End
echo -e "${WHITE}We are done here!${NC}"