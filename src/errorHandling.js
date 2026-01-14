const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
    if(err){
        //log the error
        res.status(500).send('Some went wrong');
    }
});


app.get('/userData', (req, res, next) => {
  try {
    // Logic of DB call to get user data
    throw new error ("szdxfcgvhbj");
    res.send("User Data Send");
  } catch (err) {
    // Log your error
    console.error(err);
    res.status(500).send('Some error contact support team');
  }
});


app.use("/", (err, req, res, next) => {
    if(err){
        //log the error
        res.status(500).send('Some went wrong');
    }
});



app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
    
});