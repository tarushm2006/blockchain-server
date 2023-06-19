"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { getVouchers } = require("./getVoucher");
const { placeOrder } = require("./placeOrder");
const { getOrder } = require("./getOrderDetails");
const { response } = require("./response");
let productList = response;
exports.default = (req, res) => {
    res.send("The server is live");
};
const app = express();
//This would be called automatically at 7:35 am and 7:35 pm GMT
app.post("/refreshVouchers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting to fetch data");
    const data = yield getVouchers(req.country);
    productList = data;
    res.send("Data refreshed succesfully");
    console.log("Fetched data succesfully");
}));
//This would be called by the app to get the Products
app.get("/getVouchers", (req, res) => {
    let newResponse = [];
    for (let i = 0; i < productList.length; i++) {
        if (req.query.country) {
            if (productList[i].countryName == req.query.country) {
                newResponse = [...newResponse, productList[i]];
            }
        }
        else {
            newResponse = productList;
        }
    }
    res.send(newResponse);
});
app.post("/placeOrder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.po ||
        !req.query.id ||
        !req.query.email ||
        !req.query.denomination) {
        res.status(400);
        res.send("Incomplete request");
    }
    else {
        const data = yield placeOrder(req.query.id, req.query.quantity, req.query.email, req.query.po, req.query.denomination);
        console.log(data);
        res.send(data);
    }
}));
app.get("/orderDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.orderId) {
        res.status(400);
        res.send("Invalid request");
    }
    else {
        let data = yield getOrder(req.query.orderId, req.query.po);
        res.send(data);
    }
}));
app.listen(3000, () => {
    console.log("The app is live on port 3000");
});
