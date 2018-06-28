const express = require('express');
const hbs =require('hbs');
const fs =require('fs');
var app=express();
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)  => {
  var now=new Date().toString();
  var log =now + req.method + req.url;
   console.log(log);
   fs.appendFile('server.log',log + '\n',(err) => {
     if(err) {
       console.log('errorr');
     }
   });
   next();
});
hbs.registerHelper('currentYear' ,() => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamit' ,(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    WelcomeMessage: 'Welcome to my Website',
    });
});
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'Some Website',

  });
});
app.get('/bad',(req,res) => {
     res.send({
       errorMessage: 'Unable to handle request'
     });
});
app.listen(3000,() => {
  console.log('Server is on port 3000');
});
