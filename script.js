
// https://github.com/harvardartmuseums/api-docs

//if commentary is not null, add to array. then select random object from array.

//possible data: culture, title, description, commentary
var objects = [];
var urlStart= 'https://api.harvardartmuseums.org/Object?size=50&apikey=b58976d0-1287-11e8-b9d0-8dfce0d04c25';

$(document).ready(function() {
    var classification = "";
    var century = "";


    $("#classification").on('change', function () {
        classification = $(this).val();
        console.log(classification);

    });

    $('#century').on('change', function () {
        century = $(this).val();

    });

    $("#getPhotos").on('click', function () {
        magic1(classification, century);

    });

    $(".photos").on('click', function(){
        console.log('click');
        checkAnswer(this.src);

    });

    $("#getPhoto").on('click', function(){
       magic2(classification,century);
    });

    $("#submitGuess").on('click', function(){
        var guess = $('input[name=origin]:checked').val();
        console.log(guess);
       guessOrigin(guess);
    });

});


function magic1(classification, century){
    $.ajax({
        url: urlStart+'&classification='+classification+ '&century='+ century,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            getPhotos(result);
        },
        error: function() { alert('Failed!'); }


    });

}

function magic2(classification, century){
    $.ajax({
        url: urlStart+'&classification='+classification+ '&century='+ century,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            getPhoto(result);
        },
        error: function() { alert('Failed!'); }


    });

}


function getPhotos(dataSet){
    $("#verification").empty();
    $("#error").empty();
    console.log(dataSet);
    var photos=[];
    objects=[];
    if(dataSet.records.length==0){
        $("#error").append("Sorry, no works meet this description");
    }


//here: filter your data and get the exact
// data set you are going to work with this time through

    var counter = 0;
    while(photos.length<5) {

        if(dataSet.records[counter].hasOwnProperty("images")&&dataSet.records[counter].images.length>0) {

            //still glitching when images array is empty
            photos.push(dataSet.records[counter].images[0].baseimageurl);
            objects.push(dataSet.records[counter]);

        }

        counter++;

    }

    // for (var i=0; i<dataSet.records.length; i++){
    //     if(dataSet.records[i].hasOwnProperty("images")&&dataSet.records[i].images.length>0) {
    //         photos.push(dataSet.records[i].images[0].baseimageurl);
    //
    //         objUsing.push(dataSet.records[i]);
    //     }
    // }

    for (var i=0; i<5; i++) {

        $("#photos" + i).attr("src",photos[i]);
        $("#photos" + i).attr("height",200);

    }

    //pass data
    getRandomTitle(objects);
}


//add a parameter
function getRandomTitle(objects){
    $("#title").empty();
    var titles=[];
    var title = "";
    for (var i=0; i<objects.length; i++){
        titles.push(objects[i].title);
    }

    title+=titles[Math.floor(Math.random()*titles.length)];
    $("#title").append(title);
}

function checkAnswer(url){
    $("#verification").empty();
    console.log(objects);
    console.log(url);
    var title=$("#title").text();
    for(var i=0; i<objects.length; i++){
        if(objects[i].images[0].baseimageurl==url){
            if(objects[i].title==title) {
                return $("#verification").append("correct!");
            }
        }
    }
    $("#verification").append("sorry, try again");
}

function getPhoto(dataSet){
    var photos=[];
    objects=[];
    var photo="";

    var counter = 0;
    while(photos.length<5) {

        if(dataSet.records[counter].hasOwnProperty("images")&&dataSet.records[counter].images.length>0) {

            photos.push(dataSet.records[counter].images[0].baseimageurl);
            objects.push(dataSet.records[counter]);

        }

        counter++;

    }
    photo+=photos[Math.floor(Math.random()*photos.length)];
    console.log(photo);
    $("#photo").attr("src",photo);
    $("#photo").attr("height",200);
    getOrigin();


}

function getOrigin(){
    var origins=[];
    for (var i=0; i<objects.length; i++){
        origins.push(objects[i].culture);
    }
    for(var i=0; i<origins.length; i++){
        $("#originOptions").append("<input type='radio' name='origin' value='"+origins[i]+"'>"+origins[i]+"<br>");
    }
}

function guessOrigin(guess){
    var url=$("#photo").src;
    console.log(url);
    for(var i=0; i<objects.length; i++){
        if(objects[i].images[0].baseimageurl==url){
            if(objects[i].culture==guess) {
                return $("#verification").append("correct!");
            }
        }
    }
    $("#verification").append("sorry, try again");
}

//next steps: work on CSS, clean up glitches, create error messages

function hideEverything(){
    var ids = ["#getPhotos","#title","#photos","#verification","#getPhoto","#originGuess","#submitGuess","#photo"];

    for(var i=0;i<ids.length;i++){
        $(ids[i]).css("display", "none");
    }

}

function displayMatchTitle(){
    hideEverything();
    $("#getPhotos").css("display","inline");
    $("#photos").css("display","inline");
    $("#verification").css("display","inline");
    $("#title").css("display","inline");

}

function displayGuessOrigin(){
    hideEverything();
    $("#getPhoto").css("display","inline");
    $("#photo").css("display","inline");
    $("#originGuess").css("display","inline");
    $("#submitGuess").css("display","inline");
}
