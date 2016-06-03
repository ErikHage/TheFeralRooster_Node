############################################################
# Dockerfile to build Red White and Brew Website Node App
# Based on Node
############################################################

FROM node:4-onbuild

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install App Dependencies
COPY package.json /usr/src/app/
RUN npm install

#Bundle app source
COPY . /usr/src/app

EXPOSE 3001
CMD [ "npm", "start" ]

