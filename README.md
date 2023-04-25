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
REACT_APP_API_KEY=                # The client ID of a public (no API credential attached) Web App integration
REACT_APP_BASE_URL=               # The base URL of REACT_APP_API_KEY variable
REACT_NATIVE_URL=                 # The base URL of a backend supporting LoginID services
```

**NOTE**: `REACT_NATIVE_URL` is only needed for OTP codes. Demo can still operate for basic authentication (register/login) and transaction confirmation without it.

## Example .env

```
REACT_APP_API_KEY=yLUgWe6KO13TZHegSYg6NxJPlsBKyUR4zvKRGld7ymcBfsSw3qj3Pg9qUp4TkAyAvbXpu_7tT5P7TMkqfZPFvg
REACT_APP_BASE_URL=https://1137c45afb8ae076.playground.loginid.io
REACT_NATIVE_URL=http://localhost:3010
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
