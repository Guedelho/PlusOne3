#!/bin/bash

# Script that install essential files according to the package managers settings
# files that were ignored by the version control.
#
# Useful when you just changed the commit in which you are working.

# CHANGE LOG
#   
#   - 06/06/2017
#       Script creation;
#   - 07/06/2017
#       Added npm install @ionic-native/google-maps --save
#       Added ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyBOGNRuFCms9jnNvM9QoIlKpn21gVta8fs"
#
#
#
#Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
GRAY='\033[1;30m'
WHITE='\033[1;37m'
NC='\033[0m' #No Color

#NPM
echo -e "${WHITE}Preparing NPM Packages..."
sudo npm -s install && echo -e "${GRAY}NPM packages install :: ${GREEN}OK" || echo -e "${GRAY}NPM packages install :: ${RED}ERROR"
sudo npm -s prune && echo -e "${GRAY}npm prune ${GREEN}ok" || echo -e "${GRAY}npm prune ${RED}failed"
sudo npm -s install --save @ionic-native/geolocation && echo -e "${GRAY}@ionic-native/geolocation install :: ${GREEN}OK" || echo -e "${GRAY}@ionic-native/geolocation install :: ${RED}ERROR"
sudo npm -s install @ionic-native/google-maps --save && echo -e "${GRAY}@ionic-native/google-maps install :: ${GREEN}OK" || echo -e "${GRAY}@ionic-native/google-maps install :: ${RED}ERROR"
sudo npm -s install firebase angularfire2 --save && echo -e "${GRAY}firebase angularfire2 install :: ${GREEN}OK" || echo -e "${GRAY}firebase angularfire2 install :: ${RED}ERROR"

#Ionic Dependencies
echo -e "${WHITE}Preparing Ionic Dependencies..."
ionic cordova plugin add cordova-plugin-geolocation && echo -e "${GRAY}cordova-plugin-geolocation install :: ${GREEN}OK" || echo -e "${GRAY}cordova-plugin-geolocation install :: ${RED}ERROR"
ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyBOGNRuFCms9jnNvM9QoIlKpn21gVta8fs" && echo -e "${GRAY}cordova-plugin-googlemaps install :: ${GREEN}OK" || echo -e "${GRAY}cordova-plugin-googlemaps install :: ${RED}ERROR"


#End
echo -e "${WHITE}We are done here!"