# Backend Challenge

This project uses [LoopBack](http://loopback.io).

## Run

`npm install`
`node .`

This project has a **SWAGGER** documentation, you can access it at

[http://localhost:3000/explorer](http://localhost:3000/explorer)

## Login

You've to make an HTTP `POST` request to

[http://localhost:3000/v1/customers/login](http://localhost:3000/v1/customers/login)

with this JSON as in the body:
`
{
    "username": "mariasouza",
    "password": "senha123"
}
`