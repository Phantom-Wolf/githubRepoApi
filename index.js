'use strict'

function displayResults(responseJson){

  for (let i=0; i < responseJson.length;i++){
    $('.list').append(`
      <li>
      <h4>Repo Name: ${responseJson[i].name}</h4>
      <p><a href="${responseJson[i].svn_url}" target="_blank">${responseJson[i].svn_url}</a></p>
      </li>
    `)
  }
  $('#results').removeClass('hidden')
}

function getRepoList(){

    let repoUser = $('#repo').val();
    fetch(`https://api.github.com/users/${repoUser}/repos`)
    .then(response => {
      if (response.ok) {return response.json();}
        throw new Error(response.statusText);})
    .then(responseJson => displayResults(responseJson))
    .catch(err => {$('.err-js').text(`Something went wrong: ${err.message}`)});  
}

function watchForm() {

  $('form').submit(event => {
    event.preventDefault();
    $('.list').empty();
    $('.err-js').empty();
    getRepoList();
  });
}

$(function() {

  console.log('App loaded! Waiting for submit!');
  watchForm();
});