
function displayResults(jsonResponse){
    console.log('displayResults ran');
    for (let i=0; i < jsonResponse.length; i++){
     $('#results-list').append(`<li>
     <h3><a href= '${jsonResponse[i].html_url}'>${jsonResponse[i].name}</a></h3>
     </li>`
     );};
     $('#results-list').removeClass('.hidden');
};


function getRepos(githubHandle){
    let url = `https://api.github.com/users/${githubHandle}/repos`; 
    console.log ('getRepos ran ' + url);
    

    fetch(url)
    .then(response => {
        if(response.ok){
            console.log('fetch API ran')
            return response.json();
        }
        throw new Error(response.status);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong`);
        console.log(err.message)
    })
}


function watchform(){
    $('#js-form').submit(event => {
        event.preventDefault();
        console.log('watchForm ran');
        $('#results-list').empty().addClass('.hidden');
        let userHandle = $('#js-submission').val();
        console.log(userHandle);
        getRepos(userHandle);
    });
}



$(watchform)