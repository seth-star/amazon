const express = require('express');
const app = express();

app.listen(3000,()=>{
console.log('Listen port 3000');
});

app.use(express.static('public'));
app.use()
app.get('/amazon',(req,res)=>{
 res.sendFile('./amazon.html',{root:__dirname});
})
