
// https://github.com/harvardartmuseums/api-docs

//hide photo borders when there aren't photos


var objects = [];
var urlStart= 'https://api.harvardartmuseums.org/Object?size=50&apikey=b58976d0-1287-11e8-b9d0-8dfce0d04c25';
var origins=[];

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

    $("#matchTitle").on('click', function(){
        $("#game1").slideToggle();
        $("#game2").hide();
    });

    $("#guessOrigin").on('click', function(){
       $("#game2").slideToggle();
       $("#game1").hide();
    });

    $("#getPhotos").on('click', function () {
        $('.wrong').removeClass('wrong');
        $('.correct').removeClass('correct');
        if(classification=="allWorks"&&century=="allPeriods") {
            magic1("", "");
        }
        else if(classification=="allWorks") {
            magic1("", century);
        }
        else if(century=="allPeriods"){
            magic1(classification,"");
        }else{
            magic1(classification, century);
        }

    });

    $(".photos").on('mouseenter', function () {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    $(".photos").on('mouseleave', function () {
        $('.selected').removeClass('selected');
    });

    $(".photos").on('click', function(){
        console.log('click');
        $('.wrong').removeClass('wrong');
        $('.correct').removeClass('correct');
        checkAnswer(this.src);

    });

    $("#getPhoto").on('click', function(){
        if(classification=="allWorks"&&century=="allPeriods") {
            magic2("", "");
        }
        else if(classification=="allWorks") {
            magic2("", century);
        }
        else if(century=="allPeriods"){
            magic2(classification,"");
        }else{
            magic2(classification, century);
        }

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
    $("#error1").empty();
    console.log(dataSet);
    var photos=[];
    objects=[];

    if(dataSet.records.length==0 || dataSet.records[0].hasOwnProperty("images")==false){
        for (var i=0; i<5; i++) {

            $("#photos" + i).attr("src","");
            $("#photos" + i).attr("height",200);

        }

        $("#error1").append("Sorry, no works meet this description");
        $("#title").empty();
        $(".photos").removeClass('border');
    }else{
        var counter = 0;
        while(photos.length<5) {
            if(counter<dataSet.records.length) {
                if (dataSet.records[counter].hasOwnProperty("images") && dataSet.records[counter].images.length > 0) {
                    photos.push(dataSet.records[counter].images[0].baseimageurl);
                    objects.push(dataSet.records[counter]);

                }

                counter++;

            }else {
                break;
            }
        }


        for (var i=0; i<5; i++) {
            if(i<photos.length){
                $("#photos" + i).attr("src",photos[i]);
                $("#photos" + i).attr("height",200);
            }else{

                $("#photos" + i).attr("src","");
                $("#photos" + i).attr("height",200);
            }

        }
        getRandomTitle(objects);
    }

}


function getRandomTitle(objects){
    var titles=[];
    var title = "";
    for (var i=0; i<objects.length; i++){
        titles.push(objects[i].title);
    }

    title+=titles[Math.floor(Math.random()*titles.length)];
    $("#title").empty(title);
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
                $('.selected').addClass('correct');
                return $("#verification").append("correct!");
            }
        }
    }
    $("#verification").append("sorry, try again");
    $('.selected').addClass('wrong');
}

function getPhoto(dataSet){

    $("#verif2").empty();
    $("#error2").empty();
    var photos=[];
    origins=[];
    objects=[];
    var photo="";
    if(dataSet.records.length==0 || dataSet.records[0].hasOwnProperty("images")==false){
        $("#error2").append("Sorry, no works meet this description");
        $("#photo").attr("src","");
        $("#photo").attr("height",5);
        $("#photo").removeClass('border');

    }else{
        var counter = 0;
        while(photos.length<5) {
            if(counter<dataSet.records.length) {
                if (dataSet.records[counter].hasOwnProperty("images") && dataSet.records[counter].images.length > 0) {
                    if (dataSet.records[counter].culture != null && origins.indexOf(dataSet.records[counter].culture) < 0) {
                        photos.push(dataSet.records[counter].images[0].baseimageurl);
                        objects.push(dataSet.records[counter]);
                        origins.push(dataSet.records[counter].culture);
                    }
                }
            }else{
                break;


            }

            counter++;
        }
        var extraOrigins=["Indian","German","Iberian","Byzantine","Chinese","French","Mexican","Korean","Chilean","Polish"];
        while(origins.length<5){
            var extraOrig=extraOrigins[Math.floor(Math.random()*extraOrigins.length)];
            if(origins.indexOf(extraOrig)<0){
                origins.push(extraOrig);
            }
        }

        photo+=photos[Math.floor(Math.random()*photos.length)];
        console.log(photo);
        $("#photo").attr("src",photo);
        $("#photo").attr("height",200);
        getOrigin();
        console.log(origins);
    }

}

function getOrigin(){
    $("#originOptions").empty();
    for(var i=0; i<origins.length; i++){
        $("#originOptions").append("<input type='radio' name='origin' value='"+origins[i]+"'>"+origins[i]+"<br>");
    }
}

function guessOrigin(guess){
    $("#verif2").empty();
    var url=$(".photo").attr('src');
    console.log(url);
    for(var i=0; i<objects.length; i++){
        if(objects[i].images[0].baseimageurl==url){
            if(objects[i].culture==guess) {
                return $("#verif2").append("correct!");
            }
        }
    }
    $("#verif2").append("sorry, try again");
}
