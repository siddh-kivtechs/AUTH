import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { ulid } from 'ulid';
import CryptoJS from 'crypto-js';

app.use(cors());
const app = express();
const PORT = process.env.PORT || 3000;

app.all("*", (req, res) => {
  const message={
         auth:"auth success";
         next_uri: "https://kivtechs.cloud/dashboard/user";
`        }
  res.json(message);
});



app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
