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
    .then(response => { // TODO: WHY NO RESPONSE?
        if (response.ok) {
            console.log(response);
            // $sqlQueryTextArea.textContent = response;
        }
        alert('Error: ' + response.statusText);
    })
};


$generateButton.addEventListener('click', handleGenerateButtonClick);


