NodeJS Rest API service template

## Description
NodeJS Rest API service template uses the following modules and tools:

Dependencies:
* Express as HTTP server
* Winston as Logging
* jsonwebtoken as JSON Web Token implementation

Dev dependencies are:
* APIDoc as Inline documentation tool
* nodemon as script changing monitor

## Installation 
Run the following commands:
```
git clone https://github.com/aershov24/node.restapi.template.git
cd node.restapi.template
npm install
npm run nodemon
```

## Rest API inline documentation
The template uses APIdoc tool to create inline documentation for RESTful web APIs. 
Use the following commented code as an example for your API methods documentation:
```
/**
 * @api {post} /api/authentification User authentification
 * @apiName Authentification
 * @apiGroup Authentification
 *
 * @apiParam {Object} details Login details
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name"      : "aershov24@gmail.com",
 *       "password"  : "demo"
 *     }
 * @apiSuccess {Object} object User token object or error message
 * @apiSuccessExample {json} Sucess-Response:
 *  {
 *    "success": true,
 *    "message": "User authentificated",
 *    "token": "eyJ0eXAiOiJKV1QiLCJhbGc"
 *  }
 * @apiError {Object} 403  Failed authentification info
 * @apiErrorExample {json} Error-Response:
 *  {
 *    "success": false,
 *    "message": "Authentication failed. Wrong password."
 *  }  
 */
```
See more about ApiDoc [here](http://apidocjs.com/) 

## Create ApiDoc Documentation
Run the following commands:
```
npm run apidoc
```


