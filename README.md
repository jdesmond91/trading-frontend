# Trading Simulator - https://jonathandesmond.me/trading

This application lets you deposit cash and place simulated trades on a couple popular stocks. From there you can check on the portfolio and see how well your holdings are doing as well as view your transaction history.

## Technologies Used

Front-end created using React functional components, back-end API created using Node, Express and MongoDB. Backend code can be found at https://github.com/jdesmond91/trading-backend

## Local Setup

1. Update the config.js file to point to your own local instance of the trading backend.

~~~
const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/trading'
		: 'https://jonathandesmond.me/api/trading'
~~~

2. Install and run the development instance

~~~
npm install
~~~
~~~
npm run start
~~~

## Testing With Cypress

To get started with automated end to end tests 

1. Use above instructions to start a local instance of the trading simulator
2. In another terminal window, run the following. Make sure you already kicked off a local intance before running cypress:

~~~
npm run cypress:open
~~~

This will open up a new instance of Chrome and kick off tests which I have designed to validate different functionalities of this application
