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


async function baseHandler(req, res)
  {
    let requestBody = req.body;
    let message = {};
    let decoded_email;
    if (requestBody["email"]) 
{
  decoded_email = CryptoJS.enc.Base64.parse(requestBody["email"]).toString(CryptoJS.enc.Utf8);
    console.log('Decoded Email:'+decoded_email);
if (requestBody["email"] && requestBody["password"]   && decoded_email === "admin@kivtechs.cloud")
{
  message.auth = "auth success";
  message.next_uri = "https://kivtechs.cloud/dashboard/admin";
    res.json(message);
} 
    else if (requestBody["email"] && requestBody["password"] && decoded_email === "kaushik@kivtechs.cloud") 
    {
  message.auth = "auth success";
  message.next_uri = "https://kivtechs.cloud/dashboard/kaushik";
    console.log('Kaushik Login');
 
} 
  else if (requestBody["email"] && requestBody["password"] && decoded_email === "sohini@kivtechs.cloud")
  {
  message.auth = "auth success";
  message.next_uri = "https://kivtechs.cloud/dashboard/sohini";

        res.json(message);
} 
  
  else if (requestBody["email"] && requestBody["password"]) 
  {
  message.auth = "auth success";
  message.next_uri = "https://kivtechs.cloud/dashboard/user";

    res.json(message);
} 

  else {
  message.auth = "auth failed";
  message.next_uri = "#";
   res.json(message);
}

else {
  message.auth = "auth failed";
  message.next_uri = "#";
  res.json(message);
}

    
  // res.send({auth:"auth success",next_uri: "https://kivtechs.cloud/dashboard/user"});
}


app.use(cors());
app.all("*",baseHandler);





app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
