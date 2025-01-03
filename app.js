import express from 'express';//npm i express
import mongoose from 'mongoose';//npm i mongoose
import bodyParser from 'body-parser';//npm i boby-parser
import cors from 'cors';//npm i cors
import multer from 'multer';
import student from './models/student';
//const express=require( 'express')
const app=express();
//var bobyParser=require('boby-parser')
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://greeshmaneenam:Greeshma610@greeshma.ngc2v7k.mongodb.net/DriveReady?retryWrites=true&w=majority')
.then(() => app.listen(2222))
.then(() =>
console.log("Connected to Database & Listining to localhost 2222")
)
.catch((err) => console.log(err));
//'http://localhost:2222/addstudent'
//products
app.post('/adddata', (req, res, next) => {
    // console.log(req.body) // Form data from frontend
    console.log(req.body.formdata) // Only to get the formdata
    //perform action 
    res.send({"msg" : "Success"})
})

// app.listen(2222)



app.post('/addstud', (req, res, next) => {
    // console.log(req.body.formdata)
    // console.log(req.body)
    const {fname, lname, email,phno,address,mop} = req.body;
    const userdata = new student({
      fname,
       lname, 
       email,
       phno,
       address,
       mop
    })
    try{
        userdata.save() // db.collections.insert({userdata})
    } catch(err) {
        console.log(err)
    }
    // return res.status(200).json({userdata})
    return res.send({msg : "inserted", result : userdata})
})

app.get('/getstudents', async (req, res, next) => {
    let studentdata;
    try{
        studentdata = await user.find(); // db.collectionname.find()
    } catch(err) {
        console.log(err);
    }
    if(!studentdata) {
        return res.status(404).json({message : "No Students Found."})
    }
    return res.status(200).json({studentdata})
})

app.get('/getstudentbyid/:id', async (req, res, next) => {
    let studentdata;
    const _id = req.params.id
    // console.log(_id)
    try{
        studentdata = await user.findById(_id)
    } catch(err) {
        console.log(err)
    }
    if (!studentdata) {
        console.log("No users Found!")
    }
    return res.status(200).json({studentdata})
})

app.put('/updatestudent/:id', async(req, res, next) => {
    const _id = req.params.id
    const {name, roll, college, branch} = req.body;
    let stud;
    try{
        stud = await user.findByIdAndUpdate(_id, {name, roll, college, branch})
    } catch(err) {
        console.log(err)
    }
    return res.send({msg : "Updated!", "result" : stud})
})

// Edit the user acc by Id
app.put('/api/edit-user/:id', async(req, res, next) => {
    const userid = req.params.id
    const {name, roll, college, branch} = req.body;
    let users;
    try {
        users = await user.findByIdAndUpdate(userid, {
            name, 
            roll, 
            college, 
            branch
        });
    } catch (err) {
        return console.log(err)
    }
    if (!users){
        return res.status(400).json({message : "Unable to find the users!"})
    } 
    return res.status(200).json({users})
})

// delete the record by id
app.delete('/api/delete-user/:userid', async(req, res, next) => {
    let users;
    const _id = req.params.userid
    try{
        users = await student.findByIdAndRemove(_id);
    } 
    catch(err){
        return console.log(err)
    }
    if (!users){
        return res.status(400).json({message : "Unable to delete the user!"})
    }
    return res.status(200).json({meassage : "SUccessfully Deleted!"})
})


// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, 'public/images')
//   },
//   filename: function (req, file, callback) {
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     callback(null, Date.now()+"_"+file.originalname)
//   }
// })

// const upload = multer({ storage: storage })
// //add product 
// app.post("/addproduct",upload.single("myfile"),async(req, res, next)=>{
//   const productpic=(req.file)? req.file.filename:null
//   //console.log(req.body.formdata)
//   const {title,price,category} =req.body
//   const prod = new product({
//       title,
//       price,
//       category,
//       productpic,
//     })
//   try{
//       prod.save()//for saving the data into the database
//       return res.status(200).json({ message: 'Product added to cart successfully' });
//   }catch(err){
//          return res.status(400).json({message:"not uploaded"})
//   }      
// })

// app.get('/getallproduts',async(req,res,next)=>{
//   let productsdata; 
//   try{
//       productsdata=await product.find();
//   }catch(err){
//       console.log(err);
//   }
//   if(!productsdata){

//       return res.status(404).json({message:"no student found."})

//   }
//   return res.status(200).json(productsdata)
// })

// // Multer configuration for handling file uploads
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'public/images'); // Save uploaded files to the 'uploads' folder
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Route for handling image uploads
// app.post('/public/images', upload.single('image'), (req, res) => {
//   // Logic to save the file details in the database (if required)
//   res.json({ message: 'Image uploaded successfully' });
// });

// // Route for serving images
// app.use('/public/images', express.static('images'));

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images')
  },
  filename: function (req, file, callback) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, Date.now()+"_"+file.originalname)
  }
})

const upload = multer({ storage: storage })
//add product 
app.post("/addproduct",upload.single("myfile"),async(req, res, next)=>{
  const productpic=(req.file)? req.file.filename:null
  //console.log(req.body.formdata)
  const {title,price,category} =req.body
  const prod = new product({
      title,
      price,
      category,
      productpic,
    })
  try{
      prod.save()//for saving the data into the database
      return res.status(200).json({ message: 'Product added to cart successfully' });
  }catch(err){
         return res.status(400).json({message:"not uploaded"})
  }      
})

app.get('/getallproduts',async(req,res,next)=>{
  let productsdata; 
  try{
      productsdata=await product.find();
  }catch(err){
      console.log(err);
  }
  if(!productsdata){

      return res.status(404).json({message:"no student found."})

  }
  return res.status(200).json(productsdata)
})

// // Multer configuration for handling file uploads
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'public/images'); // Save uploaded files to the 'uploads' folder
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Route for handling image uploads
// app.post('/public/images', upload.single('image'), (req, res) => {
//   // Logic to save the file details in the database (if required)
//   res.json({ message: 'Image uploaded successfully' });
// });

// // Route for serving images
// app.use('/public/images', express.static('images'));

// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
