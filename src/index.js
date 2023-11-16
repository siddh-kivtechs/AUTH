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
  
async function verify_user(data) {  
  const requestBody = data;  
  const message = {};  
  
  if (requestBody["email"]) {  
    const decodedEmail = CryptoJS.enc.Base64.parse(requestBody["email"]).toString(CryptoJS.enc.Utf8);  
  
    const kaushikpassword='kivtechscloudcorporatetester1';
    console.log(`Decoded Email: ${decodedEmail}`);  
  
    // Check if the email and password are both present.  
    if (requestBody["email"] && requestBody["password"]) {  
      // Check if the email is admin or user.  
      if (decodedEmail === "admin@kivtechs.cloud") {  
        message.auth = "auth success";  
        message.nextUri = "https://kivtechs.cloud/dashboard/admin";  
        return message;  
      } else if (decodedEmail === "kaushik@kivtechs.cloud" && requestBody["password"]===kaushikpassword ) {  
        console.log("Kaushik Login");  
        message.auth = "auth success";  
        message.nextUri = "https://kivtechs.cloud/dashboard/kaushik";  
        return message;  
      } else if (decodedEmail === "sohini@kivtechs.cloud") {  
        message.auth = "auth success";  
        message.nextUri = "https://kivtechs.cloud/dashboard/sohini";  
        return message;  
      } else {  
        // Default to user dashboard.  
        message.auth = "auth success";  
        message.nextUri = "https://kivtechs.cloud/dashboard/user";  
        return message;  
      }  
    }  
  }  
  
  // If the email or password is missing, send an auth failed response.  
  message.auth = "auth failed";  
  message.nextUri = "#";  
  return message;  
}  
  
async function verify_data(data) {  
  // If the email or password is not present or undefined, do nothing.  
  if (!data["email"] || !data["password"]) {  
    return false;  
  } else {  
    return verify_user(data);  
  }  
}  
  
async function baseHandler(req, res) {  
  const requestBody = req.body;  
  
  const result = await verify_data(requestBody);  
  res.json(result);  
  let log = {
    status: "ok",
    url: req.originalUrl,
    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    request_body: req.body,
    request_method: req.method,
    lat: req.headers['x-vercel-ip-latitude'],
    lon: req.headers['x-vercel-ip-longitude'],
    city: req.headers['x-vercel-ip-city'],
    region: req.headers['x-vercel-ip-country-region'],
    country: req.headers['x-vercel-ip-country'],
    UA: req.headers['user-agent'],
    // uuid: uuidv4(),
    date_time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    ulid: ulid()
  };

  // console.log(log);

  // Insert the log entry into Supabase
  const { data: logEntry, error } = await supabase
    .from("logs")
    .insert([log]);

  // Handle any errors
  if (error) {
    console.error("Error inserting log:", error);
    return res.status(200).send("Out of Order. Contact Admin");
  }

  // Log the success message
  console.log("Log inserted successfully:", logEntry);

}  
  
app.use(cors());  
app.use(bodyParser.json());  
app.all("*", baseHandler);  
  
app.listen(PORT, () => {  
  console.log(`API is listening on port ${PORT}`);  
});  
