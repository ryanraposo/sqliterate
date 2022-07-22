function formatTablesTextForPrompt(tablesText) {
    const tablesTextArray = tablesText.split('\n');
    let formattedTablesText = "";
    tablesTextArray.forEach((line) => {
      const newLine = "# " + line + "\n";
      formattedTablesText += newLine;
    }); 
    return formattedTablesText.slice(0, -2);
};


module.exports = { formatTablesTextForPrompt }