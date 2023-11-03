import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { ulid } from 'ulid';
import CryptoJS from 'crypto-js';

const app = express();
const PORT = process.env.PORT || 3000;

// Define the authentication constant
const auth = "authentication";

// Create a Supabase client
const supabaseUri = process.env.SUPABASE_URI;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUri, supabaseKey);
async verify_user(data)
{
    const message = {};
  // Check if the email and password are both present.
  if (requestBody["email"] && requestBody["password"]) 
  {
    // Check if the email is admin or user.
    if (decodedEmail === "admin@kivtechs.cloud") {
      message.auth = "auth success";
      message.nextUri = "https://kivtechs.cloud/dashboard/admin";
      res.json(message);
      return;
    } else if (decodedEmail === "kaushik@kivtechs.cloud") {
      console.log("Kaushik Login");
      message.auth = "auth success";
      message.nextUri = "https://kivtechs.cloud/dashboard/kaushik";
      res.json(message);
      return;
    } else if (decodedEmail === "sohini@kivtechs.cloud") {
      message.auth = "auth success";
      message.nextUri = "https://kivtechs.cloud/dashboard/sohini";
      res.json(message);
      return;
    } else {
      // Default to user dashboard.
      message.auth = "auth success";
      message.nextUri = "https://kivtechs.cloud/dashboard/user";
      res.json(message);
      return;
    }
  }
}

  // If the email or password is missing, send an auth failed response.
  message.auth = "auth failed";
  message.nextUri = "#";
  res.json(message);
}
async decrypt_email(data)
{
if (data["email"]) 
   {
    decodedEmail = CryptoJS.enc.Base64.parse(requestBody["email"]).toString(CryptoJS.enc.Utf8);
    console.log(`Decoded Email: ${decodedEmail}`);
     return decodedEmail;
  }
}
async function verify_data(data)
{
   // If the email or password is not present or undefined, do nothing.
  if (!data["email"] || !data["password"]) {
    return false;
  }
  else 
  {
      let decodedEmail=decrypt_email(data);
   return verify_user(decodedEmail);
    
  }
}

async function baseHandler(req, res) {
  const requestBody = req.body;

  verify_data(requestBody);



}



app.use(cors());
app.all("*",baseHandler);





app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
