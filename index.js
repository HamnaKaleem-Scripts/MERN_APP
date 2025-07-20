const express = require('express');


const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');




const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
const cors = require('cors');
app.use(cors());
//connection to mongo db
mongoose.connect("mongodb+srv://hamna:hamna123@backenddb.hbp3kqh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB") 
.then(()=> {
    console.log("mongo db connected");
})
.catch(() =>{
    console.log("mongo not connected");
})

//routes
app.use("/api/products",productRoute);


app.listen(3000,() =>{
    console.log('server is listening from fiirst_app');
});
