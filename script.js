
// https://github.com/harvardartmuseums/api-docs

//if commentary is not null, add to array. then select random object from array.

//possible data: culture, title, description, commentary

var urlStart= 'https://api.harvardartmuseums.org/Object?size=50&apikey=b58976d0-1287-11e8-b9d0-8dfce0d04c25';

$(document).ready(function() {
    var classification = "";
    var century = "";


    $("#classification").on('change', function () {
        classification = $(this).val();

    });

    $('#century').on('change', function () {
        century = $(this).val();

    });

    $("#getData").on('click', function () {
        magic(classification, century);
    });

});

function magic(classification, century){
    $.ajax({
        url: urlStart+'&classification='+classification+ '&century='+ century,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            dataSet = result;
        },
        error: function() { alert('Failed!'); }


    });
}

function getPhotos(){
    console.log(dataSet);
    $("#photos").empty();
    var photos=[];
    var result="";
    for (var i=0; i<dataSet.records.length; i++){

        console.log(dataSet.records[i].hasOwnProperty("images"));
        if(dataSet.records[i].hasOwnProperty("images")&&dataSet.records[i].images.length>0) {
            photos.push(dataSet.records[i].images[0].baseimageurl);
        }
    }
    for (var i=0; i<4; i++){

        if(correct) {
            result+="<img height='70' class='photos' id='YESphoto" + i + "' src="+photos[i]+"><br>";
        } else {
            result+="<img height='70' class='photos' id='photo" + i + "' src="+photos[i]+"><br>";
        }

    }
    $("#photos").append(result);
    getRandomTitle();
}

function getRandomTitle(){
    $("#title").empty();
    var titles=[];
    var title = "";
    for (var i=0; i<dataSet.records.length; i++){
        if(dataSet.records[i].hasOwnProperty("images")&&dataSet.records[i].images.length>0) {
            if(titles.length<4){
                titles.push(dataSet.records[i].title);
            }
        }
    }

    title+=titles[Math.floor(Math.random()*titles.length)];
    $("#title").append(title);
}

function checkAnswer(){
    var title=$("#title").text();
    $(".photos").on('click', function(){
        //var photo=this.val();
        console.log(this.id);

    });
}