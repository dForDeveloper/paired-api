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
* [https://paired-api.herokuapp.com/graphql](https://paired-api.herokuapp.com/graphql)

#### Queries

- getUsers:
```
{
	getUsers {
		name
		module
		program
		skills
		interests
		pronouns
		slack
		email
		image
	}
}
```
![image](https://user-images.githubusercontent.com/40776966/55576363-62105500-56ce-11e9-8a52-5807b034df68.png)

- getUser:
```
{
  getUser(name: "Jeo") {
    * implicitly return whatever fields you’d like to see
  }
}
```

- getPairings:
```
{
	getParings {
		pairerID
		pairedID
		date
		time
	}
}
```

- getAvailablePairings:
```
{
  getAvailablePairings {
   	* implicitly return whatever fields you’d like to see
	}
}
```


#### Mutations

- createUser:
```
mutation {
  createUser(name: "Miles", module: 4, program: "FE") {
	* implicitly return whatever fields you’d like to see
	}
}
```

- createPairing:
```
mutation {
  createPairing(pairerID: 123lk, date: “Wed Apr 03 2019”, time: “morning”) {
    	* implicitly return whatever fields you’d like to see
	}
}
```
