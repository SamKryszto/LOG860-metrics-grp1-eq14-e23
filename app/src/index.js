const express = require("express");
const app = express();
const port = process.env.PORT;
const metricRouter = require("./routes/metric");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API for JSONPlaceholder",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/metric", metricRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
