const express = require("express");
const path = require("path"); 
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect('mongodb://127.0.0.1:27017/contact?connectTimeoutMS=1000&authSource=otherdb', {useNewUrlParser: true});
const port = 8000;


// Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// Express specific 
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//pug specify
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

// End pointa
app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params)
})


app.get('/about', (req,res)=>{
    const params = { }
    res.status(200).render('about.pug',params)
})

app.get('/service', (req,res)=>{
    const params = { }
    res.status(200).render('service.pug',params)
})

app.get('/classinfo', (req,res)=>{
    const params = { }
    res.status(200).render('classinfo.pug',params)
})


app.get('/contact', (req, res)=>{ 
    const params = { }
    res.status(200).render('contact.pug', params);
})



app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});