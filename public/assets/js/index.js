const $tablesTextArea = document.getElementById('tablesTextArea');
const $englishQueryTextArea = document.getElementById('englishQueryTextArea'); 
const $sqlQueryTextArea = document.getElementById('sqlQueryTextArea');
const $generateButton = document.getElementById('generateButton');


const handleGenerateButtonClick = event => {
    const tablesText = $tablesTextArea.textContent;
    const englishQueryText = $englishQueryTextArea.textContent;

    fetch('api/generate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tablesText : tablesText, englishQueryText : englishQueryText})
    })
    .then((response) => response.json())
    .then((data) => $sqlQueryTextArea.textContent = data.sqlQuery);
};


$generateButton.addEventListener('click', handleGenerateButtonClick);


