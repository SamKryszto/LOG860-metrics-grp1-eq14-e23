const express = require("express");
const app = express();
const port = process.env.PORT;
const metricRouter = require("./routes/metric");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/metric", metricRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
