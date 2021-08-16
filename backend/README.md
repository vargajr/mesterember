# vizsgaremek backend server
NodeJS express server.

## Prerequisites
* Node.js - Download and install [Node.js](http://www.nodejs.org/download/).
* MongoDB - Download and install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default prot (27017).

## Generate a .gitignore file
- [toptal](https://www.toptal.com/developers/gitignore)
- [api](https://www.toptal.com/developers/gitignore/api/visualstudiocode,node)
#

## Test api - UNDER CONSTRUCTION

### Create
```js
fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: 'Admin',
    lastName: 'Adminum',
    email: 'admin@test.com',
    address: {city: 'Budapest', street: 'Váci út', houseNumber: '56/A 2. em. 12. ajtó'},
    active: true,
    password: 'admin_pw',
    posts: [],
    role: 'admin'
  })
}).then(r => r.json() )
.then(d => console.log(d));
```
### Update
```js
fetch('http://localhost:3000/users/610fc268fc211f7c69ca245a', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: 'Editor',
    lastName: 'Editorum',
    email: 'editor@test.com',
    address: {city: 'Pécs', street: 'Ragyogó Vájár útja', houseNumber: '33.'},
    active: true,
    password: 'editor_pw',
    posts: [],
    role: 'editor'
  })
}).then(r => r.json() )
.then(d => console.log(d));
```
### Delete
```js
fetch('http://localhost:3000/users/610fc22cfc211f7c69ca2457', {
  method: 'DELETE'
}).then(r => r.json() )
.then(d => console.log(d));
```
### Delete Many documents by Id
```js
fetch('http://localhost:3000/services', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(['6117aea5c9946f5f27acecc4', '6117aea5c9946f5f27acecc7', '6117aea5c9946f5f27acecca'])
}).then(r => r.json() )
.then(d => console.log(d));
```
### Authentication
```js
fetch('http://localhost:3000/person', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer kjsuijnmgiozuourgn'
  }
}).then(r => r.json()).then(d => console.log(d))
```
### Login
```js
fetch('http://localhost:3000/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({email: 'admin@test.com', password:'admin_pw'})
}).then(r => r.json()).then(d => console.log(d))
```
### GET azonosítás után
```js
fetch('http://localhost:3000/post', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTYyNjgwMzUxMH0.8oi5lpG6SMmel65E_coK3b_24en2HyiqZUyZx0AY8Os'
  }
}).then(r => r.json()).then(d => console.log(d))
```
### Refresh the accessToken by sending the refreshToken
```js
fetch('http://localhost:3000/refresh', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({token: temp2})
}).then(r => r.json()).then(d => console.log(d))
```
### Logout
```js
fetch('http://localhost:3000/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({token: '...here_comes_the_refreshToken...'})
}).then(r => console.log(r))
```