import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { ulid } from 'ulid';
import CryptoJS from 'crypto-js';



const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.all("*", (req, res) => {
//   const message={
//          
//          
// `        };
  
  res.send({auth:"auth success",next_uri: "https://kivtechs.cloud/dashboard/user"});
});



app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
