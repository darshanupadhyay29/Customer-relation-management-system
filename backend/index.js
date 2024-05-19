const express = require('express');
const { SignUpRoute } = require('./UserRoutes/SignUpRoute');
const { LoginRoute } = require('./UserRoutes/LoginRoute');
const { DeleteCustomerRoute } = require('./CustomerRoutes/DeleteCustomerRoute');
const { CancelShippingRoute } = require('./ShippingRoutes/CancelShippingRoute');
const { NewCustomerRoute } = require('./CustomerRoutes/NewCustomerRoute');
const { DeleteProductRoute } = require('./ProductRoutes/DeleteProductRoute');
const { ShowCustomersRoute } = require('./CustomerRoutes/ShowCustomersRoute');
const { ShowProductRoute } = require('./ProductRoutes/ShowProductsRoute');
const { CountCustomerRoute } = require('./CustomerRoutes/CountCustomerRoute');
const { NewProductRoute } = require('./ProductRoutes/NewProductRoute');
const { NewShippingOrderRoute } = require('./ShippingRoutes/NewShippingOrderRoute');
const { ShowShippingDataRoute } = require('./ShippingRoutes/ShowShippingDataRoute');
const { ShowDashboard } = require('./DashboardRoutes/ShowDashboard');
const { ShowTotalSales } = require('./DashboardRoutes/ShowTotalSales');
const { ShowConfirmed } = require('./DashboardRoutes/ShowConfirmed');
const { ShowPending } = require('./DashboardRoutes/ShowPending');
const bodyParser = require("body-parser");
const UpdateCustomerRoute = require('./CustomerRoutes/UpdateCustomerRute');
const UpdateProductRoute = require('./ProductRoutes/UpdateProductRoute');
const UpdateShippingRoute = require('./ShippingRoutes/UpdateShippingRoute');
const authMiddleware = require('./Midleware/middleware');
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const secretKey = process.env.SECRET_KEY;

const app = express();

app.use(express.json());

app.post('/', SignUpRoute);
  
app.post('/login', LoginRoute);

app.put("/updateCustomer/:id", UpdateCustomerRoute);

app.put("/updateProduct/:id", UpdateProductRoute);

app.put("/updateShipping/:pid",UpdateShippingRoute);

app.delete('/home/customersdata/:customerid', DeleteCustomerRoute);

app.delete("/home/cancelshipping/:productid", CancelShippingRoute);

app.delete('/home/products/:productid', DeleteProductRoute);

app.post('/newcustomer',authMiddleware, NewCustomerRoute);

app.get('/home/customers',authMiddleware, ShowCustomersRoute);

app.get('/newproducts',authMiddleware, ShowProductRoute);

app.get('/home/customercount',authMiddleware, CountCustomerRoute);

app.post('/newproduct',authMiddleware, NewProductRoute);

app.post('/newshippingorder',authMiddleware, NewShippingOrderRoute);

app.get('/shippingdata',authMiddleware, ShowShippingDataRoute);

app.get("/dashboardData",authMiddleware, ShowDashboard);

app.get("/totalsales",authMiddleware, ShowTotalSales);

app.get('/confirmed',authMiddleware, ShowConfirmed);

app.get('/pending',authMiddleware, ShowPending);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
