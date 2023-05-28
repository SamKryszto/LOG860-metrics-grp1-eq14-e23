const express = require('express');
const axios = require('axios');
const models = require('./models'); // Import your Sequelize models
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/metrics/lead_time/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const githubCall = await axios({
            url: 'https://api.github.com/graphql',
            method: 'post',
            headers: {
                authorization: `bearer ${process.env.GITHUB_TOKEN}`
                // authorization: `bearer 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`
            },
            data: {
                query: `
                {
                    user(login: "SamKryszto") {
                      projectsV2(first: 10) {
                        nodes {
                          title
                        }
                      }
                    }
                }`
            }
        });
        console.log(githubCall.data);
        res.send(githubCall.data);
    } catch (e) {
        console.log(e);
    }
})