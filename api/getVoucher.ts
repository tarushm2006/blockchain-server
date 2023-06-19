import { all } from "axios";

const axios = require("axios");
require("dotenv").config({ path: ".env" });
const accessToken = process.env.ACCESS_TOKEN;
export const getVouchers = async (country:string, ) => {
    const url = "https://stagingaccount.xoxoday.com/chef/v1/oauth/api";
  
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  
    const fetchData = async () => {
      const limit = 10;
      let page = 1;
      let allData: any[] = [];
  
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
          const response = await axios.post(url, data, { headers });
          const vouchers = response.data.data.getVouchers.data;
          allData = [...allData, ...vouchers];
          page++;
  
          if (vouchers.length < limit) {
            break;
          }
        } catch (error) {
          break;
          return error;
        }
      }
  
      return allData;
    };
  
    const data = await fetchData();
    return data;
  };
