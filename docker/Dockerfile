FROM node:18.6.0-alpine3.16
RUN apk add --no-cache bash git
RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc
RUN npm config set cache /home/node/app/.npm-cache --global
USER node
WORKDIR /home/node/app
