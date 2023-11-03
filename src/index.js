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
  
  res.send({auth:"auth success",next_uri: "https://kivtechs.cloud/dashboard/user"});
});


app.use(cors());
app.all("*",baseHandler);





app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
