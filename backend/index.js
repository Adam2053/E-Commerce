// initialising all the libraries
const port = 4000;
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const { error } = require('console');

// initialising app
app.use(express.json());
app.use(cors())

// database connection
const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://arpitmarathe2002:PyVQ5htYPSdLFRFz@cluster0.hmp7zvz.mongodb.net/?retryWrites=true&w=majority')
        console.log('Succesfully connected to the Database')
    } catch (error) {
        console.log(`Error while connecting to database: ${error}`)
    }
}
dbConnection();

// Schema Creation 
// Products Schema
const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    availabe: {
        type: Boolean,
        default: true,
    }
})

// Api Creation
app.get('/', (req, res) => {
    res.send('We are getting the responses')
})


// Add Product to database
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;

    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0]
        id = last_product.id+1;
    }else{
        id=1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    })
    console.log(product)
    await product.save() ?
        res.status(201).json({
            success: 1,
            name:req.body.name,
            message: "Successfully saved the product in database"
        }) : res.status(401).json({
            success: 0,
            message: 'Error occurred while saving product to database'
        })
})

// Delete product from database
app.post('/removeproduct',async(req,res)=>{
    try {
        await Product.findOneAndDelete({id:req.body.id})
        res.status(200).json({
            success:1,
            message:"Product is deleted"
        })
    } catch (error) {
        res.status(400).json({
            success:0,
            message:error.message
        })
    }
})

// All Product Get request 
app.get('/allproducts',async(req,res)=>{
    try {
        const allProducts = await Product.find({});
        res.status(200).json({
            success:1,
            allProducts,
        })
    } catch (error) {
        res.status(404).json({
            success:0,
            message:`No product found as ${error.message}`
        })
    }
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// Creating upload endpoint for Images 
app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// server listener
app.listen(port, async (req, res) => {
    try {
        console.log(`Server listening on port: ${port}`);
    } catch (error) {
        console.log(error);
    }
})


