# Paired API
The Paired API is a GraphQL API built with Node, Express, Apollo Server, and MongoDB. It serves as the back end for [Paired](https://paired-turing.firebaseapp.com/), a React application created to improve pair programming between [Turing](https://turing.io/) students throughout their seven-month immersive program.

### Front End
* [GitHub Repository](https://github.com/hillstew/paired-fe)
* [Live Site](https://paired-turing.firebaseapp.com/)

### How to Contribute
  - Install [MongoDB Community Server](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/?_ga=2.12846195.534354243.1554936474-1998858508.1551673979) ([instructions for macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/?_ga=2.12846195.534354243.1554936474-1998858508.1551673979))
  - `mongod` to start MongoDB
  - Fork this repo
  - Open your terminal
  - `cd` to where you want the repo directory to be created
  - Clone your fork down to your machine either
    - with SSH: `git clone git@github.com:`*yourusername*`/paired-api.git`
    - or with HTTPS: `git clone https://github.com/`*yourusername*`/paired-api.git`
  - `cd paired-api`
  - `npm install`
  - `npm run seed` to seed the database
  - `npm run test:dev` to run the test suite
  - `npm run server` to start the server
  - Go to [http://localhost:3001/graphql](http://localhost:3001/graphql) to use the GraphQL Playground
  - Push changes up to your fork
  - Make pull requests from your fork to the original repo

### Schema
- User

  | Field      | Data Type |
  | ---------- |:---------:|
  | id         | ID!       |
  | name       | String!   |
  | module     | String!   |
  | program    | Int!      |
  | skills     | [String]  |
  | interests  | [String]  |
  | pronouns   | String    |
  | slack      | String    |
  | email      | String    |
  | image      | String    |


- Pairing

  | Field      | Data Type |
  | ---------- |:---------:|
  | id         | ID!       |
  | pairer     | User!     |
  | pairee     | User      |
  | date       | String!   |
  | times      | String!   |
  | notes      | String    |

### Endpoint
- ### `https://paired-api.herokuapp.com/graphql`

#### Queries:

- getUser(id: ID!): User

  - example query
        
    ```json
    {
      getUser(id: "5cad1dcfee07882ab05e904a") {
        name
        program
        module
      }
    }
    ```

  - example response
    ```json
    {
      "data": {
        "getUser": {
          "name": "Jeo",
          "program": "FE",
          "module": 4
        }
      }
    }
    ```

  ![getUser query](https://user-images.githubusercontent.com/41239540/56085698-bb7e2f80-5e04-11e9-987d-0083e7e03bd4.png)

- getUsers: [User]

  - example query
    ```json
    {
      getUsers {
        name
        program
        module
      }
    }
    ```
        
  - example response
    ```json
    {
      "data": {
        "user": [
          {
            "name": "Jeo",
            "program": "FE",
            "module": 4
          },
          {
            "name": "Tiffany",
            "program": "FE",
            "module": 4
          },
          {
            "name": "Aaron",
            "program": "BE",
            "module": 4
          },
          {
            "name": "Hillary",
            "program": "FE",
            "module": 4
          }
        ]
      }
    }
    ```
        
- getPairings: [Pairing]

  - example query
    ```json
    {
      getPairings {
        id
        pairer {
          name
        }
        pairee {
          name
        }
        date
        time
      }
    }
    ```
    
  - example response
    ```json
    {
      "data": {
        "getPairings": [
          {
            "id": "5ca56d0d4a515ca7339852b3",
            "pairer": {
              "name": "Jeo"
            },
            "pairee": null,
            "date": "Wed Apr 03 2019",
            "time": "lunch"
          },
          {
            "id": "5ca56d0d4a515ca7339852b5",
            "pairer": {
              "name": "Tiffany"
            },
            "pairee": {
              "name": "Jeo"
            },
            "date": "Wed Apr 03 2019",
            "time": "afternoon"
          },
          ...
        ]
      }
    }
    ```


- getAvailablePairings(filter: PairingFilter): [Pairing]

  - example query
  ```json
  {
    getAvailablePairings(
      filter: { program: "FE", module: 4, date: "Wed Apr 03 2019" }
    ) {
      pairer {
        name
        module
        program
      }
      date
      time
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "getAvailablePairings": [
        {
          "pairer": {
            "name": "Jeo",
            "module": 4,
            "program": "FE"
          },
          "date": "Wed Apr 03 2019",
          "time": "lunch"
        },
        {
          "pairer": {
            "name": "Hillary",
            "module": 4,
            "program": "FE"
          },
          "date": "Wed Apr 03 2019",
          "time": "morning"
        }
      ]
    }
  }
  ```

- getUserPairings(id: ID): [Pairing]

  - example query
  ```json
  {
    getUserPairings(id: "5ca929750dbd7d527336849e") {
      pairer {
        name
      }
      pairee {
        name
      }
      date
      time
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "getUserPairings": [
        {
          "pairer": {
            "name": "Tiffany"
          },
          "pairee": {
            "name": "Jeo"
          },
          "date": "Wed Apr 03 2019",
          "time": "afternoon"
        },
        {
          "pairer": {
            "name": "Hillary"
          },
          "pairee": {
            "name": "Tiffany"
          },
          "date": "Fri Apr 05 2019",
          "time": "morning"
        }
      ]
    }
  }
  ```

#### Mutations:

- createUser(user: CreateUserInput): User!

  - example mutation
  ```json
  mutation {
    createUser(user: { name: "John", module: 2, program: "FE" }) {
      id
      name
      module
      program
      email
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "createUser": {
        "id": "5ca56e87f1f10fa7acbe9544"
        "name": "John",
        "module": 2,
        "program": "FE",
        "email": null
      }
    }
  }
  ```

- createPairing(pairing: CreatePairingInput): Pairing!

  - example mutation
  ```json
  mutation {
    createPairing(
      pairing: {
        pairer: "5ca56e87f1f10fa7acbe9544"
        pairee: 5
        date: "Fri Apr 05 2019"
        time: "lunch"
      }
    ) {
      pairer {
        name
        module
      }
      pairee {
        name
        module
        program
      }
      date
      time
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "createPairing": {
        "pairer": {
          "name": "John",
          "module": 2
        },
        "pairee": {
          "name": "Alice",
          "module": 1,
          "program": "BE"
        },
        "date": "Fri Apr 05 2019",
        "time": "lunch"
      }
    }
  }
  ```

- createPairings(pairings: [CreatePairingInput]): [UnpopulatedPairing]

  - example mutation
  ```json
  mutation {
    createPairings(
      pairings: [
        {
          pairer: "5cad1dcfee07882ab05e904a"
          date: "Mon Apr 29 2019"
          time: "morning"
        }
        {
          pairer: "5cad1dcfee07882ab05e904a"
          date: "Mon Apr 29 2019"
          time: "lunch"
        }
      ]
    ) {
      pairer
      date
      time
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "createPairings": [
        {
          "pairer": "5cad1dcfee07882ab05e904a",
          "date": "Mon Apr 29 2019",
          "time": "morning",
          "notes": null
        },
        {
          "pairer": "5cad1dcfee07882ab05e904a",
          "date": "Mon Apr 29 2019",
          "time": "lunch",
          "notes": null
        }
      ]
    }
  }
  ```

- updateUser(user: UpdateUserInput): User

  - example mutation
  ```json
  mutation {
    updateUser(
      user: {
        id: "5ca92b7f6a7f1153030b872b"
        skills: ["react", "redux", "graphql"]
        interests: ["super market sweep", "graphql"]
      }
    ) {
      name
      skills
      interests
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "updateUser": {
        "name": "Hillary",
        "skills": [
          "react",
          "redux",
          "graphql"
        ],
        "interests": [
          "super market sweep",
          "graphql"
        ]
      }
    }
  }
  ```

- updatePairing(pairing: UpdatePairingInput): Pairing

  - example mutation
  ```json
  mutation {
    updatePairing(
      pairing: {
        id: "5ca92b7f6a7f1153030b872d"
        pairee: "5ca92b7f6a7f1153030b872b"
        notes: "Please help with GraphQL"
      }
    ) {
      pairer {
        name
      }
      pairee {
        name
      }
      notes
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "updatePairing": {
        "pairer": {
          "name": "Jeo"
        },
        "pairee": {
          "name": "Hillary"
        },
        "notes": "Please help with GraphQL"
      }
    }
  }
  ```

- deleteUser(id: ID!): User

  - example mutation
  ```json
  mutation {
    deleteUser(id: "5ca92b7f6a7f1153030b8728") {
      name
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "deleteUser": {
        "name": "Jeo"
      }
    }
  }
  ```

- deletePairing(id: ID!): Pairing

  - example mutation
  ```json
  mutation {
    deletePairing(id: "5ca92ec3c9624e53b4971959") {
      date
      time
    }
  }
  ```
        
  - example response
  ```json
  {
    "data": {
      "deletePairing": {
        "date": "Wed Apr 03 2019",
        "time": "lunch"
      }
    }
  }
  ```



### Built With
* Node.js [https://nodejs.org/en/](https://nodejs.org/en/)
* Express [https://expressjs.com/](https://expressjs.com/)
* GraphQL [https://graphql.org/](https://graphql.org/)
* Apollo Server [https://www.apollographql.com/docs/apollo-server/](https://www.apollographql.com/docs/apollo-server/)
* MongoDB [https://www.mongodb.com/](https://www.mongodb.com/)
* Mongoose [https://mongoosejs.com/](https://mongoosejs.com/docs/) 

### Testing and Continuous Integration
* Jest
* Travis CI

### Contributors  
* **Front End Team**  
[Hillary Stewart](https://github.com/hillstew)  
[Tiffany Bachmann](https://github.com/trbachmann)

* **Back End Team**  
[Jeo D](https://github.com/dForDeveloper)  
[Aaron Brooks Roberts](https://github.com/jaaronbr)