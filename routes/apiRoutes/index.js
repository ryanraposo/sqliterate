const router = require('express').Router();
const { getAIResult } = require('../../lib/ai.js')


router.post('/generate', (req, res) => {
    const tablesText = req.body.tablesText;
    const englishQueryText = req.body.englishQueryText;

    getAIResult(tablesText, englishQueryText)
    .then((result) => {
        const sqlQuery = "SELECT" + result.data.choices[0].text;
        console.log(sqlQuery);
        res.send(sqlQuery); // TODO: WHY NO RESPONSE?
    });
});


module.exports = router;
