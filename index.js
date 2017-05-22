const client_id = "aisleypai-u1hxi"
const client_secret = "xdLdpnuvngIhCAan7WfyXwO"

var settings = {
  "url": `https://anilist.co/api/auth/access_token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
  "method": "POST"
}

$(document).ready(function() {
    
    
    var access_token = $.ajax(settings).done(function (response) {
        return response.access_token
    })
    
    $('form#anime-form').on('submit',function(event) {
        var $input = $('#query').val()
        event.preventDefault()
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": `https://anilist.co/api/browse/anime?sort=popularity-desc`,
            "method": "GET",
            "headers": {
                "authorization": "Bearer oDVS322noQowfiySwX38IzA5rOYClhYpDt8dPocP",
            }
        }).done(function (response) {
            response.forEach(function(anime, i) {
                console.log(anime)
                $('#animeResults').append(`<div class='item'>
                    
                    <div class='title' id='title${i}'>${anime.title_romaji}</div>
                    <div class='img' id='img${i}'><img src=${anime.image_url_lge}></div>
                    <div class='content' id='content${i}'>

                        ${anime.title_japanese}<br>
                        ${anime.type}<br>
                        ${anime.total_episodes}<br>
                        ${anime.genres}<br>
                        ${anime.average_score}<br>
                        ${anime.popularity}
                    </div>
                </div>`)
                $(`#content${i}`).hide(); 
                $(`#img${i}`).click(function() {
                    $(`#content${i}`).slideToggle("slow"); 
                })
            }, this);
            // $('#animeResults').append(`
            //     <h1>${response.title_romaji}</h1>
            //     <img id='animeImage' src=${response.image_url_med}>
            //     <div id='animeContent'>
            //         The movie is pretty good
            //     </div>`)
            // $('#animeContent').hide();    

            // $('#animeImage').click(function() {
            //     $( "#animeContent" ).slideToggle("slow");
            // })
            // $('#animeContent').click(function() {
            //     $( "#animeContent" ).slideToggle("slow");
            // })
        });
    })
    
})
