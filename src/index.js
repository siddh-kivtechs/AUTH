
const express = require("express");

app.use(cors());
const app = express();
const PORT = process.env.PORT || 3000;

app.all("*", (req, res) => {
  let message={};
   message.auth = "auth success";
  message.next_uri = "https://kivtechs.cloud/dashboard/user";
      console.log(user login);
    res.json(message);
});



app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
