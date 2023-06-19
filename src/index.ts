
const express = require("express");
const{ getVouchers } = require("./getVoucher");
const { placeOrder } = require("./placeOrder");
const { getOrder } = require("./getOrderDetails");
const { response } = require("./response");

let productList = response;

const app = express();

//This would be called automatically at 7:35 am and 7:35 pm GMT
app.post("/refreshVouchers",async(req: { country: string; },res: any)=>{
  console.log("Starting to fetch data");
   const data = await getVouchers(req.country);
   productList = data;
   res.send("Data refreshed succesfully");
   console.log("Fetched data succesfully");
});

//This would be called by the app to get the Products
app.get("/getVouchers",(req: any,res: any)=>{
  let newResponse:any[] = [];
    for(let i = 0;i<productList.length;i++){
     if(req.query.country){
      if(productList[i].countryName == req.query.country){
        newResponse = [...newResponse,productList[i]];
      }
     }else {
      newResponse = productList;
     }
  }
  res.send(newResponse);
});

app.post("/placeOrder",async(req: any,res: any)=>{
  if(!req.query.po || !req.query.id || !req.query.email || !req.query.denomination){
    res.status(400); 
    res.send("Incomplete request");
  } else {
  const data = await placeOrder(req.query.id,req.query.quantity,req.query.email,req.query.po,req.query.denomination);
  console.log(data);
  res.send(data);
  }
})

app.get("/orderDetails",async(req: any,res: any)=>{
 if(!req.query.orderId){
  res.status(400);
  res.send("Invalid request");
 }else {
  let data = await getOrder(req.query.orderId,req.query.po);
  res.send(data);
 }
})


app.listen(3000, ()=>{
    console.log("The app is live on port 3000");
})
