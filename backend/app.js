const express = require('express');
const app = express();

app.listen(3000,()=>{
console.log('Listen port 3000');
});

app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/amazon',(req,res)=>{
 res.render('amazon');
})

app.get('/checkout',(req,res)=>{
  res.render('checkout');
 })
 


 