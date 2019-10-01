const express = require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const campground=require('./models/campground');
const seedDB=require('./seed');
const Comment=require('./models/comment');

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
seedDB();


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('home');

});
//Index route
app.get('/campgrounds',(req,res)=>{
    campground.find({},(err,camps)=>{
        if(err){
            console.log("this is "+err);
        }else{
            res.render('campgrounds/campgrounds',{camps:camps});
        }
    });
  
});
//New Route
app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new');
})
//SHOW ROUTE
app.get('/campgrounds/:id',(req,res)=>{
    campground.findById(req.params.id).populate("comments").exec((err,camps)=>{
        if(err){
            console.log("campg erorrr");
            
        }else{
            res.render('campgrounds/show',{camps:camps});            
        }   
    });
});
//Create ROute
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
});
// new route for comments
app.get('/campgrounds/:id/comments/new',(req,res)=>{
    campground.findById(req.params.id,(err,camp)=>{
        if(err){
            console.log("Comment error");
            
        }else{
            res.render('comments/new',{camp:camp});
        }
    })
    
});
//create route for comments
app.post('/campgrounds/:id/comments',(req,res)=>{
    // console.log(req.params.id);
    
    campground.findById(req.params.id,(err,camp)=>{
        if(err){
            console.log("Campground not found");
            res.redirect('/campgrounds');
            
        }else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    console.log("comment not created");
                    
                }else{
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect('/campgrounds/'+camp._id);
                }
            });
        }
    });
});
app.listen(process.env.PORT||3000,()=>{
    console.log('server has started');  
});