const axios = require('axios');

const apiUrl = 'https://stagingaccount.xoxoday.com/chef/v1/oauth/api'; 
const accessToken = process.env.ACCESS_TOKEN;

const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};


export const getOrder = async(orderid: string,po:string) => {
    
const data = {
    query: 'plumProAPI.mutation.getOrderDetails',
    tag: 'plumProAPI',
    variables: {
      data: {
        poNumber: po? `PO${po}`: "",
        orderId: orderid,
        sendMailToReceiver: 0,
      },
    },
  };
 const fetchData = async() => {
  let res: any;
 await axios.post(apiUrl, data, { headers })
  .then((response: { data: any; }) => {
    // Handle the response
    res = response.data;
  })
  .catch((error: any) => {
    // Handle the error
    res = error;
  });
  return res;
 }

 const response = await fetchData();
 return response;
}