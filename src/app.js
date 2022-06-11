const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");

const productRoutes = require("./apis/routes/products");
const orderRoutes = require("./apis/routes/orders");

/*mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
    //useMongoClient: true
});*/

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Middleware
/* app.use((req, res, next) => {
    res.status(200).json({
        message: "It works!!"
    });
    next();
}); */

// Allow CORS(Cross Origin Resource Sharing)
app.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin", "http://my-page.com");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Browser will send OPTIONS request before a POST or PUT request.
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// If request reaches this point, it means, the request was not handled by any of the above routes.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
