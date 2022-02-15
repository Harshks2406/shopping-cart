const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL ||"mongodb://localhost:27017/shopping",{  
    useNewUrlParser: true, 
    useUnifiedTopology: true 

}).then(()=>{
    console.log("Database Connection Successfull.")
}).catch((err)=>{
    console.error(err)
})
