# Tobias - <small>Tool zur Online-Basierten Interaktiven ArbeitsSitzungsvorbereitung</small>

[![Maintainability](https://api.codeclimate.com/v1/badges/546f14bca0cac2af9133/maintainability)](https://codeclimate.com/github/FachschaftMathPhys/tobias/maintainability)

## Setting up in dev-enviroment

Required software: `nginx postgresql rails yarn mkcert`. Google for install instructions on your project.

### Client

1. Change to `client/`
2. Install dependencies `yarn`
3. Run dev server `yarn dev`

### API- Server

1a. Change to 'tobias-apollo-server'
2a. Install dependencies via `yarn`
3a. Create database mongodb (google it)
4a. Start Build-process via `NODE_ENV=development yarn build`
5a. Start-up server via `yarn start:env`


