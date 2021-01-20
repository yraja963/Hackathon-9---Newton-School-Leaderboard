const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const { data } = require('./data')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get("/topRankings", async (req,res)=>{
    const offset=getValue(req.query.offset,0);
    const limit=getValue(req.query.limit,20) +offset;
    const dataToSend=await data.slice(offset,limit);
    console.log(dataToSend);
    res.send(dataToSend);
});

const getValue = (value, defaultValue) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return defaultValue;
    }
    return Number(value);
  };


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
