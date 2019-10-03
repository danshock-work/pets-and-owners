# Pets and Owners

## Objectives

1. Learn how to build and test a web server `http`, `jest` and other libraries
2. Learn how to isolate parts of an application in order to write detailed unit tests
3. Learn how to write integration tests in order to prove that different units are working correctly together

## Intro

This sprint will help you get used to `http` as well as recap over the use of the file system module. A common architectural pattern is known as MVC where we split each type of job into three sections:

- _Model_: represents the different data in used by your application and handles the interactions with the database (in this case, we are using files to represent a database).
- _View_: is in charge of what to render/show to the user and using the data it is passed to create everything needed on the screen. For now, we are unconcerned with this.
- _Controller_: is like the manager. The controller function is a function that is designed to handle a specific task. It works with the model to handle any of the necessary changes to the data and will then collect up everything needed and will respond using the relevant view or data.

Here's a nice article to help with your understanding of this pattern:
[MVC Bar analogy](https://medium.freecodecamp.org/model-view-controller-mvc-explained-through-ordering-drinks-at-the-bar-efcba6255053)

## Tasks

Now you will need to create a new web server that will implement the following:

In this sprint, we are going to create a server that can handle several different `GET` request end-points.

All of these routes should start with `/api/` as we are creating an API. Make them restful!

## Testing flow

## Day 1

### 1. Unit testing models

Unit tests for the models have already been written for you - they will involve interacting with the `fs` library's methods in order to create, read, delete or update the local data which serves as a "database". In these tests the functionality of `fs` is being **faked** so instead of making an actual to call to something that performs disk I/O we are instead using a mocked version that provides a **faked** implementation with some expected outcome that we would expect from the actual `fs` library.

The core of the mock implementation of `fs` has been abstracted into `./test.utils.js`: this logic is more complex but is there to emulate the behaviour of `fs` you are interacting with the `fs` API yourself.

You can test the models specifically by running the command `npm test models/pets.test.js`, for example, once you have installed `jest` as a `devDependency`.

### 2. Unit testing controller middleware

Unit tests for the controller middleware have also been provided. When implementing the controller functionality you must demonstrate the following behaviour is taking place:

- the controller is setting the correct headers on the response object
- the controller is putting the correct data on the response body

## Day 2

### 3. Integration testing

We need to test the actual API endpoint by demonstrating the correct data comes back from the API. There should be no mocking in this test as we are demonstrating that these two units of our application are successfully interacting with each other when a client makes a request to our API.

## Here are the endpoints ...

#### - GET an owner using their id

- end-point url : `/api/owners/:owner_id`
- method : `GET`

##### Day 1

1. Unit test the controller - `getOwnerByID()`, use `./controllers/owners.test.js`

2. Unit test the model - `fetchOwnerByID()`, use `./models/owners.test.js`

##### Day 2

3. Integration test the end-point - ensure the controller and model are interacting correctly, use `./server/server.test.js`

#### - GET all owners

- end-point url : `/api/owners`
- method : `GET`

##### Day 1

1. Unit test the controller - `getOwners()`, use `./controllers/owners.test.js`

2. Unit test the model - `fetchAllOwners()`, use `./models/owners.test.js`

##### Day 2

3. Integration test the end-point - ensure the controller and model are interacting correctly, use `./server/server.test.js`

Follow the same design flow when implementing the following end-points:

#### - GET a pet using their id

- end-point url : `/api/owners/:owner_id`
- method : `GET`

#### - GET all pets belonging to an owner

- end-point url: `/api/owners/:owner_id/pets`
- method : `GET`
