## Todo Application

A Todo application built with Node.js, using MongoDB as the database.

## Features

- Create, read, update, and delete todos
- User authentication and authorization
- API documentation with Swagger
- Unit tests for API endpoints with Jest

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Setup Instructions

- Clone the Repository

```bash
$ git clone https://github.com/sujitsiingh/ToDo.git
```

- Go to the project directory and install dependencies:

```bash
$ cd Backend && npm install
```

## Configure Environment Variables

- Create a .env file in the root directory and add the necessary environment variables:
- Replace with your mongoDb string
  
```
DB_STRING = 'mongodb+srv://<username>:<password>@cluster0.1l7d2pf.mongodb.net/'
PORT = 3000
JWT_SECRET = <your_key>
```
### Run the Application
- index.js is your main file
```bash
npm run start
OR
npm run start -- --reset-cache
```

## API Documentation
- This project uses Swagger for API documentation.
- After running the application, you can access the API documentation at:
```bash
http://localhost:3000/api-docs
```
- Screen Shots has been attached for the reference.

## Testing Api
- Thunder Client which is a lightweight Rest Client is used for testing APIs.
- Attached the json file of the todo api testing for reference.
- [Documentation:] (https://docs.thunderclient.com/)

## Running Tests
- To run the unit tests for the API endpoints, use the following command:
```bash
npx jest
OR
npm run jest
```
