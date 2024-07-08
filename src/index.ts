// src/index.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import * as _ from 'lodash';
import { connectToDB } from './helper';

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const port = process.env.PORT || 3000;
const MONGDB_URL = process.env.MONGO_URL || '';

/**
 * Place all middleware like express.json || auth || error handeler
 *
 */

app.use(express.json());

/**
 * Cnnect to DB like mongo atlas or local
 * mongodb+srv://<username>:<password>@<cluster||host_name>/
 */
connectToDB(MONGDB_URL);

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get('/', (req: Request, res: Response) => {
  res.status(200).jsonp({
    message: 'Express + TypeScript Server',
  });
});

app.get('/fakestore', async (req: Request, res: Response) => {
  // let products, users;
  // // make two api call concurrently
  // const product = await fetch('https://fakestoreapi.com/productss');
  // const user = fetch('https://fakestoreapi.com/users');
  // // make two api call and destructure the response
  // const [productsData, usersData] = await Promise.all([product, user]);
  // // const products = await productsData.json();

  // if (productsData.status != 200) products = [];
  // if (usersData.status != 200) users = [];

  // users = await usersData.json();
  // products = await productsData.json();

  // // res.status(200).json({
  // //   products: productsData.json(),
  // //   users: usersData.json(),
  // // });

  // // send the response
  // res.status(200).jsonp({
  //   products,
  //   users,
  // });

  // new code
  try {
    // Initiate both API calls concurrently
    const productPromise = fetch('https://fakestoreapi.com/products');
    const userPromise = fetch('https://fakestoreapi.com/users');

    // Await both promises and destructure the responses
    const [productResponse, userResponse] = await Promise.all([
      productPromise,
      userPromise,
    ]);

    // Check if the responses are successful
    if (!productResponse.ok || !userResponse.ok) {
      throw new Error('Failed to fetch data from one or both APIs');
    }

    // Parse the JSON data from the responses
    const products = await productResponse.json();
    const users = await userResponse.json();

    // Send the response with the fetched data
    res.status(200).json({
      products,
      users,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error('Error fetching data:', error);
    res.status(500).json({
      error: 'Failed to fetch data',
    });
  }
});

app.get('/lodash', (req: Request, res: Response) => {
  const prod: any[] = [];
  const users: any = {};

  console.log(_.isEmpty(prod));

  return res.status(200).jsonp({
    message: 'OK',
    isEmpty: _.isEmpty(users),
  });
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server ⚡️]: Server is running at http://localhost:${port}`);
});
