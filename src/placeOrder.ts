const axios = require('axios');

const apiUrl = 'https://stagingaccount.xoxoday.com/chef/v1/oauth/api'; 
const accessToken = process.env.ACCESS_TOKEN;

const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};



export const placeOrder = async(id: string,quantity: number,email: string,po: string,denomination: number) => {
    const data = {
        query: 'plumProAPI.mutation.placeOrder',
        tag: 'plumProAPI',
        variables: {
          data: {
            productId: id,
            quantity: quantity,
            denomination: denomination,
            email: email,
            tag: '',
            poNumber: `PO${po}`,
            notifyReceiverEmail: 1,
            notifyAdminEmail: 0,
          },
        },
      };
     const fetchData = async() => {
      let response;
      try {
        await axios.post(apiUrl, data, { headers }).then((res: any)=>{
          response = res.data;
        }).catch((e: any)=>response = e);
      } catch(error){
        response = error
        console.log(error);
      }
      return response;
     }
 
     const response = await fetchData();
     return response;
}
