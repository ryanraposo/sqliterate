const router = require('express').Router();
const { getAIResult } = require('../../lib/ai.js')


router.post('/generate', (req, res) => {
    const tablesText = req.body.tablesText;
    const englishQueryText = req.body.englishQueryText;

    getAIResult(tablesText, englishQueryText)
    .then((result) => {
        const sqlQuery = "SELECT" + result;
        res.json( {sqlQuery : sqlQuery} );
    });
});


module.exports = router;
