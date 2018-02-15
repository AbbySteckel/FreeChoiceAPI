
// https://github.com/harvardartmuseums/api-docs

$.ajax({
    url: 'https://api.harvardartmuseums.org/Object?apikey=b58976d0-1287-11e8-b9d0-8dfce0d04c25',
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function(result) {
        console.log(result);
    },
    error: function() { alert('Failed!'); }


});