# IMOBILIARIA 


![Node Version](https://img.shields.io/badge/node-v20+-green.svg)
![NPM Version](https://img.shields.io/badge/npm-v9+-blue.svg)
![MongoDB Version](https://img.shields.io/badge/mongodb-v7+-yellowgreen.svg)
![Mongoose Version](https://img.shields.io/badge/mongoose-v7+-red.svg)

![Captura de tela 2025-02-09 164620](https://github.com/user-attachments/assets/9a061718-5659-4e83-909e-ef2f240ec61b)


## Instructions

Fork, then download or clone the repo.
```bash
git clone https://github.com/<your-user-name>/TrabEngSoftware.git
```

The *config* folder contains a file named *config.js*. Before running locally, change the value of `db` as seen in the code below. *Make sure MongoDB service is running.*
```js
module.exports = {
  db: "mongodb://localhost/mern-crud",
  react_app_url: "http://localhost:4200"
};
```

## Back-end
Install the dependencies via the terminal.
```bash
npm install
```

Run the *main server*.
```bash
CORS=1 node server
```
View [http://localhost:3000](http://localhost:3000) on the browser.

## Front-end
If you want to modify the front-end, go to *react-src* folder via the terminal.

```bash
cd react-src
```

Install the dependencies required by React.
```bash
npm install
```

Run the *development server* for React.
```bash
REACT_APP_API_URL=http://localhost:3000 npm start
```

View [http://localhost:4200](http://localhost:4200) on the browser.

