# YAML filter to .json

Simple lib to filtrate private/public array in our swagger file. The goal of this is to filter the swagger-file during demonstration of the API, especially when you want to keep some features privates and hide them in a simple way.

# Installation

You just need to install as a regular npm module

`$ npm install filter-yaml`


# How to use it

The main use of the swagger filter is to use your YAML-file as in put, then process it to identify the private en public array to finally give as output two JSON, one with the private array and another with the public array. If an array doesn't have a private or public argument it will be display in both files.

You just have to specify your input file as follow 

`$ node swagger-filter model.yml`

The following YAML model is expected :

```YAML
swagger: '2.0'
info:
  ...
tags:
schemes:
- http
paths:
  /primaryKey:
    get:
      privateFilter: true
      produces:
      - application/json
      responses:
        200:
          description: OK
          schema:
            type: array
    post:
      publicFilter: true
      produces:
      - application/json
      responses:
        200:
          description: OK
          schema:
            type: array
host:
basePath: /
```

# More about us

https://www.intercloud.com/