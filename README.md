Hello, Guys. It's Ian!.

## Installation
```bash
$ npm install
```

## Configuration
I'm using Mongoose lib to connect with my MongoDB. BEFORE running the app, please, inform a URI for connecting a valid mongo database.
To do this just replace the information in MONGODB_URI at '.env' file with your information, just like:

MONGODB_URI='YOUR_URI_FOR_SOME_MONGO_DB'

By now we will only have "users" collection created in the DB from mongoose schema User.

## Running the app
```bash
$ npm run start
```

Server must start at : 'http://localhost:3000'


# API USAGE
    I configured it to have as global prefix '/api/', all request must contain it { http://localhost:3000/api/'}

## Routes

#### Method Recovering a User by Id
Get('/users/:id') {example: http://localhost:3000/api/users/1}

Returns:  

{
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
}


#### Method Creating a User
POST('/users') {example: http://localhost:3000/api/users}

Body:
{    
    "email": "jao@email.com",
    "first_name": "George@com.com",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
}

Returns a created user with ID:

{
    "email": "jao@email.com",
    "first_name": "George@com.com",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg",
    "_id": "640209f37f6022c47473d263",
    "__v": 0
}


*** I'm using validation, so, the JSON in body must have all info in this format (specially e-mail must contain /[@  && .com]/)



## Stay in touch

- Author - [Ian Vieira](https://www.linkedin.com/in/ianvgs/)

## License
Nest is [MIT licensed](LICENSE).
