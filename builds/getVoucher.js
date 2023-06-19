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
exports.getVouchers = void 0;
const axios = require("axios");
require("dotenv").config({ path: ".env" });
const accessToken = process.env.ACCESS_TOKEN;
const getVouchers = (country) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://stagingaccount.xoxoday.com/chef/v1/oauth/api";
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        const limit = 10;
        let page = 1;
        let allData = [];
        while (true) {
            const data = {
                query: "plumProAPI.mutation.getVouchers",
                tag: "plumProAPI",
                variables: {
                    data: {
                        limit,
                        page,
                        filters: [
                            {
                                key: "country",
                                value: country,
                            },
                        ],
                    },
                },
            };
            try {
                const response = yield axios.post(url, data, { headers });
                const vouchers = response.data.data.getVouchers.data;
                allData = [...allData, ...vouchers];
                page++;
                if (vouchers.length < limit) {
                    break;
                }
            }
            catch (error) {
                break;
                return error;
            }
        }
        return allData;
    });
    const data = yield fetchData();
    return data;
});
exports.getVouchers = getVouchers;
