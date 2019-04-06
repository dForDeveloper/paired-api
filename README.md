## Paired-Api
This is an API built with GraphQL to access information about students and their availability to pair with others 
accross campus. 

#### Deployment
Our App is deployed at: [https://paired-api.herokuapp.com/graphql](https://paired-api.herokuapp.com/graphql)

#### FRONT END LINK
Please See FE:
[https://github.com/hillstew/paired-fe](https://github.com/hillstew/paired-fe)

#### Built With
* node [https://www.npmjs.com/](https://www.npmjs.com/)
* express [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)
* graphql [https://graphql.org/](https://graphql.org/)
* mongodb [https://www.mongodb.com/](https://www.mongodb.com/)
* mongoose [https://mongoosejs.com/](https://mongoosejs.com/docs/)

#### Single Endpoint
- [https://paired-api.herokuapp.com/graphql](https://paired-api.herokuapp.com/graphql)

Queries:

- getUser(name: String) - returns a User object

        // example query
        {
          getUser(name: "John") {
            name
            program
            module
          }
        }
        
        // example response
        {
          "data": {
            "getUser": {
              "name": "John",
              "program": "FE",
              "module": 2
            }
          }
        }
        
        // notes:
        // available fields for this query are:
        //   id, name, program, module, skills, interests, pronouns, slack, email, image
        //
        // the "getUser" property name inside "data" can be changed like so:
        // {
        //   whateverYouWant: getUser(name: "John") {
        //     name
        //     program
        //     module
        //   }
        // }
        // this returns:
        // {
        //   "data": {
        //     "whateverYouWant": {
        //       "name": "John",
        //       "program": "FE",
        //       "module": 2
        //     }
        //   }
        // }

- getUsers - returns an array of all User objects

        // example query
        {
          getUsers {
            name
        		program
        		module
          }
        }
 
![image](https://user-images.githubusercontent.com/40776966/55576363-62105500-56ce-11e9-8a52-5807b034df68.png)
        
        // example response
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
        
        // note:
        // the available fields for this query are the same for getUser
        
- getPairings - returns an array of all Pairing objects

        // example query
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
        
        // example response
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
        
        // note:
        // the available fields this query are:
        //   id, pairer, pairee, date, time, notes
        // the available fields for pairer and pairee are the same as getUser

- getAvailablePairings(filter: Object) - returns an array of Pairing objects matching the filter

        // example query
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
        
        // example response
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
        
        // note:
        // the required arguments are program, module, and date
        // the available fields for this query are the same as getPairings

- getUserPairings(id: String) - gets all pairings where the user is either a pairer or pairee

        // example query
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
        
        // example response
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

Mutations:

- createUser(user: Object) - saves a user to the database and returns that User object

        // example mutation
        mutation {
          createUser(user: { name: "John", module: 2, program: "FE" }) {
            id
            name
            module
            program
            email
          }
        }
        
        // example response
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
        
        // note:
        // the required arguments are name, module, and program
        // the argument object can have any property a user normally has except for id
        // this is because the id is assigned when the user is created

- createPairing(pairing: Object) - saves a pairing to the database and returns that Pairing object

        // example mutation
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
        
        // example response
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
        
        // note:
        // the required arguments are pairer, date, and time
        // the pairer and pairee arguments must be ids

- updateUser(user: Object) - updates a user based the object passed in

        // example mutation
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
        
        // example response
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
        
        // note:
        // id is a required argument

- updatePairing(pairing: Object) - updates a pairing based the object passed in

        // example mutation
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
        
        // example response
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
        
        // note:
        // id and pairee are required arguments

- deleteUser(id: String) - deletes the user whose ID matches the one passed in

        // example mutation
        mutation {
          deleteUser(id: "5ca92b7f6a7f1153030b8728") {
            name
          }
        }
        
        // example response
        {
          "data": {
            "deleteUser": {
              "name": "Jeo"
            }
          }
        }
        
        // note:
        // id is a required argument
        // the mutation returns the user before it gets deleted
        // there must be at least one field requested

- deletePairing(id: String) - deletes the pairing whose ID matches the one passed in

        // example mutation
        mutation {
          deletePairing(id: "5ca92ec3c9624e53b4971959") {
            date
            time
          }
        }
        
        // example response
        {
          "data": {
            "deletePairing": {
              "date": "Wed Apr 03 2019",
              "time": "lunch"
            }
          }
        }
        
        // note:
        // id is a required argument
        // the mutation returns the pairing before it gets deleted
        // there must be at least one field requested