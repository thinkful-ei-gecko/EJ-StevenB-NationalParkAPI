'use strict';

const api = '4WPYit3zfcKwBhAftAuTcgB1d5rLfb5Q2ns4452F';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

//this is an example of how to use the api with url
//https://developer.nps.gov/api/v1/parks?stateCode=ca&limit=1&api_key=4WPYit3zfcKwBhAftAuTcgB1d5rLfb5Q2ns4452F

function getTheParams(params){
    const items = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return items.join('&');
}

function showParks(responseJson){
    console.log('show results ran')

    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
            </li>
            `
        )
    }
}

function getNationalParks(search, maxResults = 10){
    const keys = {
        stateCode: search,
        limit: maxResults,
        api_key: api
    };

    const searchString = getTheParams(keys);
    const url = searchURL + '?' + searchString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => showParks(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function renderForm() {
    $('form').submit(event => {
        event.preventDefault();
        const search = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNationalParks(search, maxResults);
        $('#js-search-term').val('');
        $('#js-max-results').val('');
    })
}

$(renderForm);