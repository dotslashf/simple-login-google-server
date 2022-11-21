const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_ID,
});

const app = express();
app.use(
  cors({
    origin: true
  })
);
app.options("*", cors());
async function verify(token) {
  client.setCredentials({ access_token: token });
  const userInfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });
  return userInfo.data;
}

const port = 3030;

app.get("/token", async (req, res) => {
  const user = await verify(req.query.token);
  return res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
