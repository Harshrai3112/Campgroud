const express = require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
var campgroundSchema=mongoose.Schema({
    name:String,
    image:String,
    description:String
});
var campground=mongoose.model("Campground",campgroundSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('home');

});
app.get('/campgrounds',(req,res)=>{
    campground.find({},(err,camps)=>{
        if(err){
            console.log("this is "+err);
        }else{
            res.render('campgrounds',{camps:camps});
        }
    });
  
});
app.get('/campgrounds/new',(req,res)=>{
    res.render('new');
})
app.get('/campgrounds/:id',(req,res)=>{
    campground.findById(req.params.id,(err,camp)=>{
        if(err){
            console.log(err);
            
        }else{
            res.render('show',{camp:camp});
        }

    });
});
app.post('/campgrounds',(req,res)=>{
    var name=req.body.name;
    var img=req.body.image;
    var desc=req.body.description;
    var camp={name:name,image:img,description:desc};
    campground.create(camp,(err,camps)=>{
        if(err){
            console.log(err);
            
        }else{
            res.redirect('/campgrounds');
        }
    });
    
    // res.send("working");
})
app.listen(process.env.PORT||3000,()=>{
    console.log('server has started');  
});