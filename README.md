# API Simulator: E-Commerce Dashboard

**Per Scholas · Software Engineering (RTT-44) · Module 6 · Lab 6.2**

A TypeScript project that simulates the API calls an e-commerce dashboard depends on: a product catalog, product reviews, and a sales report. Each "API" is a function that returns a Promise, waits a short time like a real network request, and sometimes fails on purpose so the app's error handling can be tested.

## What it does

When you run the app, it:

1. Fetches the **product catalog** (Laptop and Headphones).
2. Fetches the **reviews for each product** at the same time, waiting for all of them with `Promise.all()`.
3. Fetches the **sales report** (total sales, units sold, average price).
4. Logs each result to the console. If any request fails, it logs the error instead of crashing.
5. Logs `All API calls have been attempted.` at the end, whether the calls succeeded or failed.

Each simulated API succeeds about **80%** of the time, so running the app several times shows both the success path and the error path.

## Concepts practiced

- **Promises**: `resolve` for success, `reject` for failure
- **Promise chaining**: returning a Promise from `.then()` so the next step waits for it
- **`Promise.all()`**: running several requests at once and waiting for all of them
- **Error handling**: `.catch()` for failures and `.finally()` for cleanup
- **Custom error classes**: `NetworkError` and `DataError`, which extend the built-in `Error`
- **TypeScript types**: describing the shape of the data each Promise returns

## Project structure

```
lab 6.2/
├── src/
│   ├── apiSimulator.ts   # Simulated API functions and custom error classes
│   └── index.ts          # Main app logic: chains the API calls and handles errors
├── package.json
├── tsconfig.json
└── README.md
```

### `src/apiSimulator.ts`

| Function | Returns | Delay | On failure |
|---|---|---|---|
| `fetchProductCatalog()` | Array of products (`id`, `name`, `price`) | 1 second | `NetworkError: Failed to fetch product catalog` |
| `fetchProductReviews(productId)` | Array of reviews (`id`, `productId`, `rating`, `comment`) | 1.5 seconds | `NetworkError: Failed to fetch reviews for product ID <id>` |
| `fetchSalesReport()` | One object (`totalSales`, `unitsSold`, `averagePrice`) | 1 second | `NetworkError: Failed to fetch sales report` |

## Getting started

**Requirements:** [Node.js](https://nodejs.org/) and npm

```bash
# Clone the repository
git clone https://github.com/DimsuCodes/API-Simulator.git
cd API-Simulator

# Install dependencies
npm install

# Run the app
npx tsx src/index.ts
```

Run it a few times. Because each request has a 20% chance of failing, you'll see successful runs and handled errors.

### Example output (success)

```
Products: [ { id: 1, name: 'Laptop', price: 1200 }, { id: 2, name: 'Headphones', price: 200 } ]
Reviews: [ [ ...reviews for product 1 ], [ ...reviews for product 2 ] ]
Sales Report: { totalSales: 300, unitsSold: 123, averagePrice: 58 }
All API calls have been attempted.
```

### Example output (failure)

```
Error: NetworkError: Failed to fetch product catalog
All API calls have been attempted.
```

## Tech stack

- TypeScript
- Node.js
- [tsx](https://github.com/privatenumber/tsx) for running TypeScript files directly

## Reflection

**1. Why is it important to handle errors for each individual API call rather than just at the end of the promise chain?**

If I only catch errors at the end, one failed call stops everything after it. For example, in my lab, if the reviews failed then nothing will happen moving forward.

**2. How does using custom error classes improve debugging and error identification?**

Custom error classes like NetworkError lets not only me but whoever is reading my code understands what the error is for.

**3. When might a retry mechanism be more effective than an immediate failure response?**

Retrying is good because the problem is usually temporary, like when I ran my code for the reviews, it failed, but when I ran it again it was successful and returned a string.

## Author

**Keyshawna McCall**
[GitHub: @DimsuCodes](https://github.com/DimsuCodes) · [LinkedIn](https://linkedin.com/in/keyshawna-mccall)
