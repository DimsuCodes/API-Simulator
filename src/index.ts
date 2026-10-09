import { fetchProductCatalog, fetchProductReviews, fetchSalesReport } from "./apiSimulator";

fetchProductCatalog()
    .then((products) => {
    console.log("Products:", products);
    const reviewOrders = products.map((product) => fetchProductReviews(product.id));
    return Promise.all(reviewOrders);
  })
  .then((reviews) => {
    console.log("Reviews:", reviews);
    return fetchSalesReport();
  })
  .then((report) => {
    console.log("Sales Report:", report);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("All API calls have been attempted.");
  });