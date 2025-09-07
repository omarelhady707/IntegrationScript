Paymob Integration (Express.js + Webhook)

This project demonstrates how to integrate with Paymob Accept API using Node.js / Express.js, with dotenv for environment variables and Axios for API requests.

📦 Requirements

Node.js >= 16

npm or yarn

A Paymob account with SECRET_KEY, PUBLIC_KEY, and INTEGRATION_ID

⚙️ Installation
git clone https://github.com/your-username/paymob-integration.git
cd paymob-integration
npm install

🔑 Environment Variables

Create a .env file in the root directory and add your Paymob credentials:
SECRET_KEY=your_secret_key
PUBLIC_KEY=your_public_key
INTEGRATION_ID=your_integration_id

🚀 Run the server
node index.js

The server will start on:
http://localhost:3000

📨 Webhook

When a payment succeeds or fails, Paymob will send POST requests to your webhook endpoint:
POST /paymob/webhook

📌 To test locally, expose your server using Ngrok (or a similar tunnel):
ngrok http 3000

Then, update the following URLs in your request payload with the generated Ngrok URL:

notification_url

redirection_url

💳 Create Intention (Payment Request)

The function create_intention in the code does the following:

Sends a POST request to Paymob API to create a new intention.

Retrieves the client_secret.

Builds a Checkout URL that the customer can use to pay.

Example Checkout URL:
https://accept.paymob.com/unifiedcheckout/?publicKey=PUBLIC_KEY&clientSecret=CLIENT_SECRET

📂 Project Structure
.
├── task.js        # Main code (Express + Intention + Webhook)
├── package.json
├── .env            # Environment variables (SECRET_KEY, PUBLIC_KEY, INTEGRATION_ID)
└── README.md
