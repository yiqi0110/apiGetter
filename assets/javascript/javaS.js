// global variables
// ===============================================================
var ratings = ["G", "PG", "PG-13"];
// var ratingsArr = ["G", "G", "G", "PG", "PG", "PG", "PG", "PG-13", "PG-13", "PG-13"];
var intialGiphArr = ["Dark Souls", "Overwatch", "PUBG", "Starcraft", "World of Warcraft"];
var urlHolder = [];




// function defintions
// ===============================================================

var makePicture = function(ratings, data) {
    for (var k = 0; k < ratings.length; k++){
        var div = $("<div>");
        div.addClass(ratings[i]);
        var p = $("<p class'coloreD'>").text("Ratings: " + ratings);
        var imgSlot = $("<img class='img-fluid'>");
        imgSlot.attr('src', data[k].images.fixed_height.url);
        div.append(p).append(imgSlot);
        $('#placeToPutThings').prepend(div);
        console.log(data[k]);
    };
};

var creatingButtons = function (catagory) {
    var thing = catagory;
    var button = $("<button>").text(thing);
    button.addClass("d-inline btn btn-secondary _button").attr("type", "button").attr("data-name", thing);
    $("div#containsButtons").append(button);
};

var giphyRATINGS = function (array) {
    if (array === "G") {
        return 3;
    }
    if (array === "PG-13") {
        return 3;
    }
    if (array === "PG") {
        return 4;
    }
};

var searchGIPHY = function (search) {
    // use this when calling the search thing in a for loop thang
    var arr = urlHolder;
    for (var i = 0; i < ratings.length; i++) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kBzRKprFn5QACjSiqR9QVm2yFNw4kLNP&q=" + search + "&limit=" + giphyRATINGS(ratings[i]) + "&offset=0&rating=" + ratings[i] + "&lang=en";
        arr.push(queryURL);
    }

    for (var i = 0; i < ratings.length; i++) {
        // I guess you need to wrap this around an annonomous function, dont know why but you do haha
        var annonomous = function () {
            var currentUrl = arr[i];
            $.ajax({
                url: currentUrl,
                method: "GET"
            }).then(function (response) {
                var data = response.data;
                console.log(data);
                var div4Img = $("<div class'"+data[i].rating+" row'>");
                var p = $("<p>").text("Rating: " + data[i].rating);
                for (var b = 0; b < ratings.length; b++) {
                    console.log('this many times '+ b);
                    var image = $("<img class='"+data[b].rating+"'>");
                    image.attr('src', data[b].images.fixed_height.url);
                    $(div4Img).prepend(image);
                    console.log("this should be doing 3 times");
                };
                console.log("this should have happend three times");
                $('#placeToPutThings').prepend(div4Img);
                // makePicture(ratings, data);
            });
        };
        annonomous();
    };
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

    if (typeof userInput === "string") {
        console.log("this is working");
        creatingButtons(userInput);
        $("#searchBar").val("");
    } else {
        console.log("You did not type in a word... rubbish");
    }
});

$(document.body).on("click", "._button", function () {
    $("#placeToPutThings").empty();
    // have something to remove the old gifs
    var thisButton = $(this).attr("data-name");
    console.log(thisButton);
    searchGIPHY(thisButton);
});