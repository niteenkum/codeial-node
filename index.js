const express = require('express');
const app = express();
const port = 8000;

app.use('/', require("./routes/index"));

// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log("Error: " + err);
        return;
    }
    console.log("Server is listening on port " + port);

})