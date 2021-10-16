FROM node:16.5-alpine3.12
# Create app directory for the application
# NOTE: all the directives that follow in the Dockerfile will be executed in
# that directory.
WORKDIR /server

# Copy the package.json file into our app directory
COPY ./ /

# Install yarn dependencies
RUN yarn config set "strict-ssl" false -g

# Install any needed packages specified in package.json
RUN yarn
RUN echo '>>>>> Finished install yarn <<<<<<'

ARG REDIS_ADDRESS
ENV REDIS_ADDRESS=$REDIS_ADDRESS

CMD ["npm", "start"]