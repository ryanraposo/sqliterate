const { Configuration, OpenAIApi } = require("openai");
const { formatTablesTextForPrompt } = require("./format");


const toxic_threshold = -0.355


function getOutputLabel(contentFilterResponse) {
  let output_label = contentFilterResponse.data.choices[0].text;
  
  if (output_label == "2") {
    // If the model returns "2", return its confidence in 2 or other output-labels
    const logprobs = response["choices"][0]["logprobs"]["top_logprobs"][0];
    // If the model is not sufficiently confident in "2",
    // choose the most probable of "0" or "1"
    // Guaranteed to have a confidence for 2 since this was the selected token.
    if (logprobs["2"] < toxic_threshold) {
      logprob_0 = logprobs.get("0", None)
      logprob_1 = logprobs.get("1", None)
      // If both "0" and "1" have probabilities, set the output label
      // to whichever is most probable
      if (logprob_0 !== null && logprob_1 !== null) {
            if (logprob_0 >= logprob_1) {
              output_label = "0";
            } else {
              output_label = "1";
            };
      };
      // If only one of them is found, set output label to that one
      if (logprob_0 !== undefined) {
        output_label = "0";
      };
      if (logprob_1 !== undefined) {
        output_label = "1";
      };
      // If neither "0" or "1" are available, stick with "2"
      // by leaving output_label unchanged.
    };
  };
  // if the most probable token is none of "0", "1", or "2"
  // this should be set as unsafe
  if (!["0", "1", "2"].includes(output_label)) {
    output_label = "2";
  };

  console.log(output_label);

  return output_label;
};

async function getAIResult(tablesText, englishQueryText) {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const formattedTablesText = formatTablesTextForPrompt(tablesText);
      const promptText = "### Postgres SQL tables, with their properties:\n#\n" + formattedTablesText + "\n#\n### A query to " + englishQueryText + "\nSELECT ";

      // SQL query response from user's english prompt 
      const mainResponse = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: promptText,
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"],
      });

      // Label response from Content Filter
      const contentFilterResponse = await openai.createCompletion({
        model: "content-filter-alpha",
        prompt: "<|endoftext|>" + mainResponse.data.choices[0].text + "\n--\nLabel:",
        temperature: 0,
        max_tokens: 1,
        top_p: 0,
        logprobs: 10
      });

      const outputLabel = getOutputLabel(contentFilterResponse);
      if (outputLabel == "2") {
        return "[[UNSAFE CONTENT GENERATED. TRY A DIFFERENT PROMPT]]";
      };

      return mainResponse;
};


module.exports = { getAIResult };
