// global variables
// ===============================================================
var ratings = ["G", "PG", "PG-13"];
// var ratingsArr = ["G", "G", "G", "PG", "PG", "PG", "PG", "PG-13", "PG-13", "PG-13"];
var intialGiphArr = ["Dark Souls", "Overwatch", "PUBG", "Starcraft", "World of Warcraft"];
var urlHolder = [];
console.log(intialGiphArr[0]);



// function defintions
// ===============================================================


var creatingButtons = function (catagory) {
    var thing = catagory;
    var button = $("<button>").text(thing);
    button.addClass("d-inline btn btn-secondary _buttons").attr("type", "button").attr("data-name", thing);
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

$(document.body).on("click", "._buttons", function () {
    // have something to remove the old gifs
    var thisButton = $(this).attr("data-name");
    console.log(thisButton);
    searchGIPHY(thisButton);

});