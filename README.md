# NodeJS API (express) with Mongodb and JWT authentication

Can be used as a boilerplate when you want an app with authentication and simple utility methods for responses.

Its a minimal setup, and only includes:

- Express server.
- Authentication and user registration (jwt auth).
- Simple add article and list articles (to show usage). **still working on this**
- Can run "out of the box" on heroku (with mongodb addon activated.)
- Some utils for responses, so uniform the format of responses.
- Babel setup, for dev and prod environment (build folder is used in prod).

## Packages used:

- **express**
- **mongoose** (mongodb)
- mongoose-validator
- passport
- **passport-jwt**
- await-to-js
- babel-preset-env
- bcrypt
- bcrypt-promise
- body-parser
- cloudinary (not actually used yet, will be used for photo upload in "article" example)
- cors
- dotenv
- ejs
- parse-error
- validator


## Endpoints

Description / documentation of the available endpoints:

### POST http://localhost:5000/api/users

**Request**

```json
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

**Successful Response**

```json
{
    "message": "Successfully created new user.",
    "user": {
        "_id": "5b75651b9988f04c12ce7482",
        "email": "test@gmail.com",
        "createdAt": "2018-08-16T11:50:51.870Z",
        "updatedAt": "2018-08-16T11:50:51.870Z",
        "__v": 0,
        "id": "5b75651b9988f04c12ce7482"
    },
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWI3NTY1MWI5OTg4ZjA0YzEyY2U3NDgyIiwiaWF0IjoxNTM0NDIwMjUxLCJleHAiOjE1MzQ0MzAyNTF9.JyB2mB_9VuvyBLPdyMeBunDN4q72KySOHRJyyqAEjLE",
    "success": true
}
```


### POST http://localhost:5000/api/users/login


**Request**

```json
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

**Successful Response**

```json
{
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWI3NTY1MWI5OTg4ZjA0YzEyY2U3NDgyIiwiaWF0IjoxNTM0NDIwMzAxLCJleHAiOjE1MzQ0MzAzMDF9.50BkWcVUDZSSaMdEtgvKjksiEBOvTpcfPawDNKXUJwQ",
    "user": {
        "_id": "5b75651b9988f04c12ce7482",
        "email": "test@gmail.com",
        "createdAt": "2018-08-16T11:50:51.870Z",
        "updatedAt": "2018-08-16T11:50:51.870Z",
        "__v": 0,
        "id": "5b75651b9988f04c12ce7482"
    },
    "success": true
}
```



### POST http://localhost:5000/api/article [requires authentication]


**Request**

Headers:

- **Authorization:** Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWI3NTY1MWI5OTg4ZjA0YzEyY2U3NDgyIiwiaWF0IjoxNTM0NDIwMzAxLCJleHAiOjE1MzQ0MzAzMDF9.50BkWcVUDZSSaMdEtgvKjksiEBOvTpcfPawDNKXUJwQ


Body:

```json
{
	"text": "test artikkel",
	"title": "test artikkel title",
	"feature_img": ""
}
```

**Successful Response**

```json
{
    "_id": "5b7565da007c324c4c404a61",
    "text": "test artikkel",
    "title": "test artikkel title",
    "feature_img": "",
    "author": {
        "_id": "5b75651b9988f04c12ce7482",
        "email": "test@gmail.com",
        "createdAt": "2018-08-16T11:50:51.870Z",
        "updatedAt": "2018-08-16T11:50:51.870Z",
        "__v": 0
    },
    "__v": 0,
    "id": "5b7565da007c324c4c404a61",
    "success": true
}
```



## Running Locally


```sh
$ git clone git@github.com:peec/node-js-jwt-auth-articles-example-rest-api.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm run dev
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ heroku create
$ npm run build
$ npm start ( TO TEST PRODUCTION BUILD ). And exit after.
$ git add build && git commit -m "Build for prod version x."
$ heroku addons:create mongolab <--- Add mongolab database.
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
