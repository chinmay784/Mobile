const mongoose = require("mongoose")

const connectTOmongoDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://chinmaypuhan420:N62yZfdC0fSI3XiU@cluster0.ofafdkg.mongodb.net/chat-app-db?retryWrites=true&w=majority");
        console.log("connect to mongodeb");
    } catch (error) {
        console.log("Error connection to mongodb",error.message)
    }
}

module.exports= connectTOmongoDB