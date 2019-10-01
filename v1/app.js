const express = require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
var camps=[
    {name:'Upper lake', image:"https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
    {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
]
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('home');

});
app.get('/campgrounds',(req,res)=>{
    res.render('campgrounds',{camps:camps});
});
app.get('/campgrounds/new',(req,res)=>{
    res.render('new');
})
app.post('/campgrounds',(req,res)=>{
    var name=req.body.name;
    var img=req.body.image;
    var camp={name:name,image:img};
    camps.push(camp);
    res.redirect('/campgrounds');
    // res.send("working");
})
app.listen(process.env.PORT||3000,()=>{
    console.log('server has started');  
});