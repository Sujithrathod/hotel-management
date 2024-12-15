const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
}

main()
    .then(()=>{
        console.log("connection successful");
    }).catch((err)=>{
        console.log(err);
    });



const port = 8080;

app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
});

// app.get("/testlisting",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"calangute, Goa",
//         country:"India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");

// });

app.get("/",(req,res)=>{
    res.send("I am root");
});

app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
});

app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});

app.get("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
});

app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let{title:ntitle,description:ndescription,price:nprice,location:nlocation,country:ncountry} = req.body;
    await Listing.findByIdAndUpdate(id,{
        title:ntitle,
        description:ndescription,
        price:nprice,
        location:nlocation,
        country:ncountry,
    });
    res.redirect("/listings");
});


app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

app.post("/listings",async(req,res)=>{
    let{title:ntitle,description:ndescription,price:nprice,location:nlocation,country:ncountry,image:nimage} = req.body;
    let newlisting = new Listing({
        image:nimage,
        title:ntitle,
        description:ndescription,
        price:nprice,
        location:nlocation,
        country:ncountry,
    });
    console.log(newlisting);
    await newlisting.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit",async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});

});