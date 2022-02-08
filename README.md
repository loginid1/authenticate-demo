# YYZ Web Demo

## Setup

```
$ git clone git@github.com:loginid1/authenticate-demo.git
$ cd authenticate-demo
$ yarn install
```

## .env

A **.env** file is needed at the root directory with the following environment variables:

```
REACT_APP_API_KEY                # The client ID of a Web integration (Directweb)
REACT_APP_BASE_URL=              # The base URL of REACT_APP_API_KEY variable
```

## Running Locally

This will open a new tab on your browser to http://localhost:3000.

```
yarn start
```

## Build

Creates an optimized build for a production ready application. More information [here](https://create-react-app.dev/docs/deployment/).

```
yarn build
```

## Docker

```
docker build -t web-demo:latest .
docker run -it -p 80:80 --rm web-demo:latest
```
