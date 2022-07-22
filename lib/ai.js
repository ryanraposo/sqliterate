const { Configuration, OpenAIApi } = require("openai");
const { formatTablesTextForPrompt } = require("./format");

async function getAIResult(tablesText, englishQueryText) {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const formattedTablesText = formatTablesTextForPrompt(tablesText);
      const promptText = "### Postgres SQL tables, with their properties:\n#\n" + formattedTablesText + "\n#\n### A query to " + englishQueryText + "\nSELECT "

      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: promptText,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"],
      });

      return response;
}


module.exports = { getAIResult };
