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
exports.getOrder = void 0;
const axios = require('axios');
const apiUrl = 'https://stagingaccount.xoxoday.com/chef/v1/oauth/api';
const accessToken = process.env.ACCESS_TOKEN;
const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
};
const getOrder = (orderid, po) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        query: 'plumProAPI.mutation.getOrderDetails',
        tag: 'plumProAPI',
        variables: {
            data: {
                poNumber: po ? `PO${po}` : "",
                orderId: orderid,
                sendMailToReceiver: 0,
            },
        },
    };
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        yield axios.post(apiUrl, data, { headers })
            .then((response) => {
            // Handle the response
            res = response.data;
        })
            .catch((error) => {
            // Handle the error
            res = error;
        });
        return res;
    });
    const response = yield fetchData();
    return response;
});
exports.getOrder = getOrder;
