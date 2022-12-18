# Spendaway - A Full-Stack Budgeting App

This is a full-stack budgeting application built with React and Node. Spendaway helps people with breaking down their
spending and income. Both visual and numeric breakdown to provide as much information as possible to the user.
This app is aimed towards the everyday spender. Sometimes just staring at numbers on your banking app makes it
difficlt to asses how well you are saving and spending money. Spendaway is here to help!

# Related

Here is the React front end for this project

[Spendaway - React Front-End](https://github.com/Danko2111/Spendaway)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### DB and JWT Secret

`PORT={Port}`

`DB_LOCAL_DBNAME={db name}`

`DB_LOCAL_USER={username}`

`DB_LOCAL_PASSWORD={password}`

`SECRET={Your secret}`

## DB Setup

1. Create a new Schema in MySQL and give it a name

2. Initialize Knex:

```bash
npx knex init
```

then fill in the newly created knexfile.js with all info required:

```bash
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'your_database_name'
  }
});
```

3. Finally run both of these commands:

```bash
npm run migrate
```

and

```bash
npm run seed
```

This will create all the needed tables within the DB and seed the default data into those tables.

## Run Locally

1. Once you have cloned this repository make sure to run `npm i` to install any dependancies you might be missing.
2. Make sure you download [Spendaway Front-end](https://github.com/Danko2111/Spendaway) and follow the installation steps in that repository.
3. Once all the steps above as well as on the front-end have been completed, now run

```bash
npm run dev
```

for the back-end, and

```bash
npm start
```

for the front end and the app should be available on your browser.

## App Demo

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Tech Stack

#### Front-End

- React - was used as the front end framework. This would create a perfect base for this app

- React Charts - was used to create the beautiful yet dynamic charts used throughout the project.

- Axios - was used for making async API calls to the custom Node.js Backend.

- Sass - was used to handle all front-end styling.

#### Back-End

- Node.js - handled the runtime environment for Express.

- Express.js - was used to handle all API calls comming in from the front end. Creating routes and controllers to help with separation of concerns.

- JWT - was implemented for user authorization.

- Bcrypt - was used to encrypt and decrypt user passwords to strengthen user-info security. All user data was stored in the DB

- Knex - was used to query the MySQL DB from the backend. Allowing for custom API calls to be handled with ease.

#### Database

- MySQL - was the optimal choice, as the potentially vast amounts of transactional information would need to be handled in a robust and efficient manner.
