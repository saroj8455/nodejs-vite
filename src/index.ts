// src/index.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

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

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get('/', (req: Request, res: Response) => {
  res.status(200).jsonp({
    message: 'Express + TypeScript Server',
  });
});

app.get('/fakestore', async (req: Request, res: Response) => {
  // make two api call concurrently
  const products = fetch('https://fakestoreapi.com/products');
  const users = fetch('https://fakestoreapi.com/users');
  // make two api call and destructure the response
  const [productsData, usersData] = await Promise.all([products, users]);
  const product = await productsData.json();
  console.log(product);

  // res.status(200).json({
  //   products: productsData.json(),
  //   users: usersData.json(),
  // });

  // send the response
  res.status(200).jsonp({
    data: [],
  });
});

/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server ⚡️]: Server is running at http://localhost:${port}`);
});
