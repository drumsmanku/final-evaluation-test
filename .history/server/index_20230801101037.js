const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());



const AuthenticateUser=(req, res, next)=>{
  try{
    const user=jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
    req.user=user;
    next()
  }
  catch(err){
    res.send({message:'please login first'})
  }
}
const Customer=mongoose.model('Customer', {
  name:String,
  email:String,
  mobile:Number,
  password:String,
});

const CreateProd=mongoose.model('Product', {
  companyName: String,
  category:[String],
  logoURL: String,
  productLink: String,
  description: String,
});

const Upvote = mongoose.model('Upvote', {
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  upvoteCount: String
});

app.get('/', (req, res)=>{
  res.send({message:'working perfectly'})
})

app.post("/signup", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existingUser = await Customer.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      res.send({ message: "user already exists, please sign in" });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUsers = {
        name,
        email,
        mobile,
        password: encryptedPassword,
      };
      Customer.create(newUsers).then(() => {
        const jwtToken=jwt.sign(newUsers,process.env.JWT_SECRET_KEY, {expiresIn:60} )
        res.json({ status: "success", jwtToken, name: newUsers.name });
      });

    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/login',async (req, res)=>{
  
  try{
    const {email, password} = req.body;
    const userInDB=await Customer.findOne({email});
    if(!userInDB){
      res.send({message:'user not found in database. PLease Sign up'});
      return
    }
    const existingUser=await bcrypt.compare(password, userInDB.password);
    if(existingUser){
      const jwtToken=jwt.sign(userInDB.toJSON(),process.env.JWT_SECRET_KEY, {expiresIn:'1hr'} )
      res.send({message:"user exists, Signed in successfully",jwtToken, name: userInDB.name })
    }
    else{
      res.send({message:'invalid credentials'})
    }

  }
  catch(err){
    console.log(err)
    res.send({message:"FAILED"})
  }
  
})

app.post('/create-prod', AuthenticateUser,(req,res)=>{
  const {companyName,category,logoURL, productLink, description}=req.body 
  const newJob={companyName,category,logoURL, productLink, description}
  CreateProd.create(newJob).then(()=>{
    res.json({status:'success', message:'Job created successfully'})
  }).catch(err=>{console.log(err)});
  
});

app.patch('/edit-prods/:id', (req, res)=>{
  const {id}=req.params;
  const updateData=req.body
  CreateProd.findByIdAndUpdate(id, updateData).then(()=>{
    res.send({status:'success', message:'customer updated successfully'})
  }).catch(err => {
    console.log(err);
    res.status(500).send({status:'failure', message:'An error occurred while updating the job'});
  })
})


app.get('/get-prods', async(req, res) => {
  try {
    const { category} = req.query;
    let query = {};

    if (category) {
      const CatsArray = category.split(',').map(cat => new RegExp(cat, 'i'));
      query.category = { $in: CatsArray };
    }

    const products = await CreateProd.find(query);
    for (let i = 0; i < products.length; i++) {
      let commentsCount = await Comment.countDocuments({productId: products[i]._id});
      let upvoteCount=await Upvote.countDocuments({productId: products[i]._id});
      products[i] = products[i].toObject(); 
      products[i].commentsCount = commentsCount;
      products[i].upvoteCount = upvoteCount;
    }

    res.send({ status: 'success', products });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});


app.get('/get-prod-desc/:id', async(req, res) => {
  try {
    const { id } = req.params;

    const product = await CreateProd.findById(id);

    if (product) {
      res.send({ status: 'success', product });
    } else {
      res.send({ status: 'failed', message: 'No product found with the provided ID' });
    }
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});

const Comment = mongoose.model('Comment', {
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  text: String
});


app.post('/add-comment', async (req, res) => {
  try {
    const { productId, text } = req.body;
    const comment = await Comment.create({ productId, text });
    res.send({ status: 'success', comment });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});

app.post('/add-upvote',async(req,res)=>{
  try{
    const {productId, upvoteCount}=req.body;
    const upvote=await Upvote.create({productId, upvoteCount});
    res.send({status:'success', upvote});
  }
  catch(err){
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
})

app.get('/get-comments/:productId', async(req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId });
    res.send({ status: 'success', comments });
  } catch (err) {
    console.log(err);
    res.send({ status: 'failed', message: 'Something went wrong' });
  }
});

app.listen(process.env.PORT, ()=>{
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('listening on port ' + process.env.PORT)
  }).catch(err=>console.log(err))
})