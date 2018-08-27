// global variables
// ===============================================================
var ratings = ["G", "PG", "PG-13"];
// var ratingsArr = ["G", "G", "G", "PG", "PG", "PG", "PG", "PG-13", "PG-13", "PG-13"];
var intialGiphArr = ["Dark Souls", "Overwatch", "PUBG", "Starcraft", "World of Warcraft"];
var urlHolder = [];




// function defintions
// ===============================================================

var makeRatingDiv = function () {
    for (var k = 0; k < ratings.length; k++) {
        var pdiv = $("<div class='row'>");
        var p = $("<p>").html("Ratings for these gifs is: " + ratings[k] + "<br>Click on each image to start the gif, and again to stop it! Enjoy!");
        p.attr('id', ratings[k]);
        pdiv.append(p);
        $("#placeToPutThings").append(pdiv);
        var imgDiv = $("<div class='row'>");
        imgDiv.attr('id', ratings[k] + "-img");
        $("#placeToPutThings").append(imgDiv);
    };
};

var creatingButtons = function (catagory) {
    var thing = catagory;
    var button = $("<button>").text(thing);
    button.addClass("d-inline btn btn-secondary _button").attr("type", "button").attr("data-type", thing);
    $("div#containsButtons").append(button);
};

var searchGIPHY = function (search) {
    // use this when calling the search thing in a for loop thang
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kBzRKprFn5QACjSiqR9QVm2yFNw4kLNP&q=" + search + "&limit=10&offset=0&lang=en";

    // I guess you need to wrap this around an annonomous function, dont know why but you do haha
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var data = response.data;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var imG = $("<img>");
            console.log(data[i].rating);
            var stillIMG = data[i].images.downsized_still.url;
            var animatedIMG = data[i].images.downsized.url;
            imG.attr('src', stillIMG).attr('data-still', stillIMG).attr('data-animate', animatedIMG).attr('data-state', 'still');
            imG.addClass('searchedImg');
            if (data[i].rating === 'g') {
                var imgCol = $("<div class='col-md-4'>");
                $(imgCol).append(imG);

                $("div#G-img").append(imgCol)
            } else if (data[i].rating === 'pg') {
                var imgCol = $("<div class='col-md-4'>");
                $(imgCol).append(imG);
                
                $("div#PG-img").append(imgCol);
            } else {
                var imgCol = $("<div class='col-md-4'>");
                $(imgCol).append(imG);
                
                $("div#PG-13-img").append(imgCol);
            };
        };
        if ($("div#G-img:empty").length) {
            $("p#G").text("no gifs for G ratings");
            console.log("working");
        };
        if ($("div#PG-img:empty").length) {
            $("p#PG").text("no gifs for PG ratings");
            console.log("working");
        };
        if ($("div#PG-13-img:empty").length) {
            $("p#PG-13").text("no gifs for PG-13 ratings");
            console.log("working");
        };
    });
};

// function calls (if any (initaize stuff))
// ===============================================================

for (var i = 0; i < intialGiphArr.length; i++) {
    creatingButtons(intialGiphArr[i]);
    console.log('this is doing something');
};

$("#searchButton").on("click", function (event) {
    // prevent form from submitting
    event.preventDefault();
    var userInput = $("#searchBar").val().trim();
    creatingButtons(userInput);
    $("#searchBar").val("");
});

$(document.body).on("click", "._button", function () {
    $("#placeToPutThings").empty();
    makeRatingDiv();
    // have something to remove the old gifs
    var thisButton = $(this).attr("data-type");
    searchGIPHY(thisButton);
    console.log(thisButton);
});

$(document.body).on("click", ".searchedImg", function(){
    var gifState = $(this).attr("data-state");
    if (gifState == "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "stilled");
    }

});