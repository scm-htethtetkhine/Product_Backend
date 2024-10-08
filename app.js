const express = require('express')
const bodyParser = require('body-parser')
const authRoute = require('./routes/auth')
const productsRoute = require('./routes/product')
const userRoute = require('./routes/user')
const salereceiptRoute = require('./routes/salereceipt')
const apiKeyValidator = require("./middleware/apikey")
const validationToken = require("./middleware/auth")

const app = express();

const cors = require('cors')
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', apiKeyValidator, authRoute)
app.use('/products',validationToken , productsRoute)
app.use('/user',validationToken , userRoute)
app.use('/salereceipt',validationToken, salereceiptRoute)

app.listen(8080, () => {
    console.log("Server listening on 8080")
})