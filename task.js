import dotenv from "dotenv";
import axios from "axios";
import express from "express";

const app = express();
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook endpoint
app.post("/paymob/webhook", (req, res) => {
  console.log("📩 Webhook received:", req.body);
  res.sendStatus(200); 
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const INTEGRATION_ID= process.env.INTEGRATION_ID;
console.log(SECRET_KEY);
console.log("INTEGRATION_ID:", INTEGRATION_ID);

async function create_intention(){
    try{
   const response = await axios.post("https://accept.paymob.com/v1/intention/",
        {
        amount: 10000, 
        currency: "EGP",
        merchant_order_id: "order_" + Date.now(), 
        integration_id: process.env.INTEGRATION_ID,
        payment_methods: [INTEGRATION_ID],
           billing_data: {
      apartment:"6",      
      first_name: "Omar",
      last_name: "Elhady",
      street:"935,shoerak",
      state:"Careor",
      email: "elhadyo424@gmail.com",
      phone_number: "+201143649085",
      country: "EG",
      building: "1",
      floor: "1",
     notification_url: "https://fb4514aaaafe.ngrok-free.app/paymob/webhook",
     redirection_url: "https://random-id.ngrok.io/payment-success",

    }
        },{
            headers:{
                Authorization: `Bearer ${SECRET_KEY}`,
                "Content-Type":"application/json"
            }
        }
    );
    const client_secret= response.data.client_secret;
    console.log("✅ Intention Created Successfully");
    console.log("Client Secret:", client_secret);
      const checkoutUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${PUBLIC_KEY}&clientSecret=${client_secret}`;
    console.log("🔗 Checkout URL:", checkoutUrl);
    }catch(e){
    console.error("❌ Error creating intention:", e.response?.data || e.message);

    }

}

create_intention();