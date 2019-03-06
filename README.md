# Tobias - <small>Tool zur Online-Basierten Interaktiven ArbeitsSitzungsvorbereitung</small>

[![Maintainability](https://api.codeclimate.com/v1/badges/546f14bca0cac2af9133/maintainability)](https://codeclimate.com/github/FachschaftMathPhys/tobias/maintainability)

## Setting up in dev-enviroment

Required software: `nginx postgresql rails yarn mkcert`. Google for install instructions on your project.

### Client

1. Change to `client/`
2. Install dependencies `yarn`
3. Run dev server `yarn dev`

### API- Server

1. Change to `server`
2. Install dependencies `bundle install`
3. Create and migrate db `rake db:create db:migrate`, make sure to provide super-user rights
3. Start API server on port 3311: `rails s -p 3311`

### Proxy server: `nginx`

1. Generate local certs using `mkcert`
2. Copy `client.conf` to your `nginx/servers`. Modify ssl-certs paths to reflect your local systems
3. (Re)start `nginx`
4. Optional: Add your domain to `/etc/hosts`
