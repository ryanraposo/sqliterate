const { Configuration, OpenAIApi } = require("openai");


async function getAIResult(tablesText, englishQueryText) {
    const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "### Postgres SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n#\n### A query to list the names of the departments which employed more than 10 employees in the last 3 months\nSELECT",
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
