var currentGame = {}

$(document).ready( funtion() {
    $('.game-item').on('click', funtion() {
        currentGame.id = this.dataset.name
        currentGame.id = this.dataset.id
        $.ajax({
            url: '/games/' + currentGame.id + '/characters',
            method: 'GET',
            dataType: 'JSON'
        }).done( function(characters) {
            $('#game').text('Characters in ' + currentGame)
            var list = $('#characters')
            list.empty()
            characters.forEach( funtion(char) {
                var li = '<li data-character-id=" '+ char.id + '">' + char.name + '-' + char.power + '</li>'
                list.append(li)

            })
        })
    }
})


$('#toggle').on('click', funtion() {
    showForm = !showForm
    $('#game-form').remove()
    $('#games-list').toggle()

    if(showForm) {
        $.ajax({
            url: '/game_form',
            method: 'GET'

        }).done( funtion(html) {
            $('#toggle').after(html)
        })
    }

})

$(document).on('submit', '#game-form form', function(e) {
e.preventDefault()
var data = $(this).serializeArray()
$.ajax({
    url:'/games'
    type: 'POST'
    dataType: 'JSON'
    data: data

}).done(funtion(game) {
    var g = '<li class="game-item" data-id="' + game.id + '" data-name="' + game.name + '">' + game.
    name + '-' + game.description + '</li>';
    $('#games-list').append(g)

}).fail( function(err){
    alert(err,responseJSON.errors)
})
})



