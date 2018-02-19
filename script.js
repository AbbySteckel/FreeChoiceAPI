
// https://github.com/harvardartmuseums/api-docs
$(document).ready(function(){
    console.log(magic('Object'));
});

function magic(type){
    $.ajax({
        url: 'https://api.harvardartmuseums.org/'+type+'?apikey=b58976d0-1287-11e8-b9d0-8dfce0d04c25',
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(type) {
            magic(type);
        },
        error: function() { alert('Failed!'); }
    });
}