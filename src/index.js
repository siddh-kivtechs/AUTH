
const express = require("express");

app.use(cors());
const app = express();
const PORT = process.env.PORT || 3000;

app.all("*", (req, res) => {
  let message={
   auth:"auth success";
   next_uri: "https://kivtechs.cloud/dashboard/user";
}
    res.json(message);
});



app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
