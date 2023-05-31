const express = require("express");
const app = express();
const port = process.env.PORT;
const metricRouter = require("./routes/metric");
const swaggerUI = require('swagger-ui-express');
const yaml = require('yaml');
const fs = require('fs');
const doc = fs.readFileSync('./src/swagger/api.yaml','utf8');
const api = yaml.parse(doc);




app.use("/", swaggerUI.serve,swaggerUI.setup(api));

app.use("/metric", metricRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
