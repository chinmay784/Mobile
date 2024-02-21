const express = require("express")

const app = express();

const port = 4000;

app.get("/", (req,res) =>{
    res.json("hello")
} )


app.listen(port ,() =>{
    // connectTOmongoDB()
    console.log(`server is running in ${port}`);
})