











Hello, Guys. It's Ian!.

## Installation
```bash
$ npm install
```

## Configuration
Rename the file ".env.example" to ".env" and fill credentials for MYSQL and MONGODB at it.
At SQL connection create a database called "news_database".


## Running the app locally
```bash
$ npm run start:dev
```

Server must start at : 'http://localhost:8000'
# API USAGE
    I configured it to have as global prefix '/api/', all request must contain it { http://localhost:3000/api/'}




*** I'm using validation, so, the JSON in body must have all info in this format (specially e-mail must contain /[@  && .com]/)



## Stay in touch

- Author - [Ian Vieira](https://www.linkedin.com/in/ianvgs/)

## License
Nest is [MIT licensed](LICENSE).
