const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
//const _ = require("lodash");

const app = express();
app.set('view-engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/bankDB");

const customerSchema = {
    id:Number,
    fname : String,
    lname : String,
    acc_num : String,
    email : String,
    addr : String,
    currBal:Number
};

const Customer = mongoose.model("Customer", customerSchema);
app.use('/public/', express.static('./public'));
const cust10 = new Customer({
    id:9,
    fname: "Devesh",
    lname: "Gujral",
    acc_num : "301879342",
    email : "abcd@gmail.com",
    addr : "San-Fransico, US",
    currBal:50000
})

const cust2 = new Customer({
    id:1,
    fname: "Sachin",
    lname: "Bisht",
    acc_num : "809283324",
    email : "abcd@gmail.com",
    addr : "Los-Angeles, US",
    currBal:21000
})



const cust8 = new Customer({
    id:7,
    fname: "Ritika",
    lname: "Rawat",
    acc_num : "901223324",
    email : "abcd@gmail.com",
    addr : "Mumbai, India",
    currBal:58000
})

const cust9 = new Customer({
    id:8,
    fname: "Amishu",
    lname: "Sharma",
    acc_num : "503248348",
    dob : "19 Jan 2012",
    addr : "Hyderabad, India",
    currBal:68000
})
const cust3 = new Customer({
    id:2,
    fname: "Shershtha",
    lname: "Agarwaal",
    acc_num : "69328723",
    email : "abcd@gmail.com",
    addr : "Lucknow, India",
    currBal:72000
})

const cust4 = new Customer({
    id:3,
    fname: "Armaan",
    lname: "Gupta",
    acc_num : "10394398",
    email : "abcd@gmail.com",
    addr : "Kanpur, India",
    currBal:41000
})

const cust5 = new Customer({
    id:4,
    fname: "Nikita",
    lname: "Sharma",
    acc_num : "22394873",
    email : "jhk@gmail.com",
    addr : "Greater Noida, India",
    currBal:58990
})

const cust6 = new Customer({
    id:5,
    fname: "Arushi",
    lname: "Purohit",
    acc_num : "4093840",
    email:  "cvb@gmail.com",
    addr : "Jammu, India",
    currBal:59280
})

const cust7 = new Customer({
    id:6,
    fname: "Tanmey",
    lname: "Rathi",
    acc_num : "79237498",
    email : "abcd@gmail.com",
    addr : "Jaipur, India",
    currBal:87232
})

const cust1 = new Customer({
    id:0,
    fname: "Arjit",
    lname: "Pandey",
    acc_num : "8263823",
    email : "abcd@gmail.com",
    addr : "Kashmir, India",
    currBal:20982
})


const defaultCust = [cust5,cust7,cust10,cust2, cust3, cust1, cust4, cust6,cust8,cust9];



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req,res){
    res.render("home.ejs");
});




Customer.insertMany(defaultCust, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Default Items added successfully!");
    }
});




app.get("/home", function(req,res){
    res.render("home.ejs");
})




app.get("/allCustomers", function(req, res){
    res.render("allCustomers.ejs", {details : defaultCust});
});




app.get("/moneyTransfer", function(req, res){
    res.render("moneyTransfer.ejs")
});




const historySchema = {
    sname : String,
    sAccount : String,
    rName: String,
    rAccount : String,
    amount : Number
};


const Balance = mongoose.model("Balance", historySchema);


const histories = [];
app.post("/moneyTransfer", function(req,res){
    const senderName = req.body.senderName;
    const senderAccount = req.body.senderAccount;
    const recieverName = req.body.recieverName;
    const recieverAccount = req.body.recieverAccount;
    const tamount = req.body.Tammount;
    
   

    const dynoc = new Balance({
        sname : senderName,
        sAccount : senderAccount,
        rName : recieverName,
        rAccount : recieverAccount,
        amount : tamount

    });

    
   
    Balance.insertMany(dynoc, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully updated the balance history!");
            histories.push(dynoc);
            console.log(histories);
            res.render("list.ejs",{historyList:histories});
           
        }
    });

});




app.get("/list",function(req,res){
    res.render("list.ejs",{historyList:histories});

})




app.get("/oneCoustomer",function(req,res){
    const value=req.body;
    console.log(value.value);
})




app.get("/OneCustomer",function(req,res){
    res.render("oneCustomer.ejs");
})



app.post("/Details",function(request,response){
    const id=request.body.id;
    Customer.findOne({id:id},function(err,res){
        if(err){
            console.log(err)
        }
        else{
           console.log("Deatils displayed succesfully!!!!!")
           response.render("Details.ejs",{indi:res})
        }
       
    })
  
})



app.listen(3000, function(){
    console.log("Server running on port 3000.");
});
