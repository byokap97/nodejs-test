# Node-js Test
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

##### To use this api, you will need to let open the port 8080 of your server or pc!!!
##### - Dependencies
  - axios (to make http request)
  - body-parser (to encapsule  the object body in the param body of the request)
  - cors
  - express
  - jsonwebtoken (to create jwt for use it as a bearer)
  - helmet
  - express-jwt (to decrypt jwt for security)
  - mongoose (framework to use mongodb)
  - nodemon

#### - Steps to use it correctly
  - install all dependencies (npm install)
  - start the node.js server (npm start)
  - make http request in postman or any you like.

### First step!
you will need to login in the api, with the login , more info in the endPoint menu.
After that the api will return you a bearer token that, you must put in the headers of your request to grant you access to all endpoint of the api.

### - EndPoint Menu
  - GET /user/id/:id (:id its the id param that you will need to put on the request)
    > It will return you the data from user by id.
    > !!! Only if you are sending the correct bearer token in headers!!!
  - GET /user/name/:name (:name its the name param that you will need to put on the request)
    > It will return you the data from user by name.
    > !!! Only if you are sending the correct bearer token in headers!!!
  - GET /policy/user/name/:name (:name its the name param that you will need to put on the request)
    > It will return you the data from policies of the user by his name.
    > !!! Only if you are sending the correct bearer token in headers!!!
- GET /policy/number/:number (:number its the id of policie its the param that you will need to put on the request)
    > It will return you the data from policy by id.
    > !!! Only if you are sending the correct bearer token in headers!!!
- POST /login 
    > need to send in the body of your request the param email with a correct email.
    > It will return you the data from user and a token to use it like a bearer.
    > !!! Valid only one hour!!!

