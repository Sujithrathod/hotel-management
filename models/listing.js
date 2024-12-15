const mongoose = require("mongoose");

const mongooseSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        default:"https://unsplash.com/photos/closed-blue-gate-WJDR8_QxVR8",
        type:String,
        set : (v) => v === " "? "https://unsplash.com/photos/closed-blue-gate-WJDR8_QxVR8": v,
    },
    price:{
        type:String
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});


const listing = mongoose.model("listing",mongooseSchema);

module.exports = listing;
