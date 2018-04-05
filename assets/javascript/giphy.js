//Variables
var topics = ["chicken", "cat", "bird", "cow"];
var stillImages = [];
var animatedImages = [];

//Function to create a single animal button
function createSingleButton (buttonName) {
    var animalButton = $("<button>");
    animalButton.attr("id", buttonName);
    animalButton.attr("class", "btn btn-primary");
    animalButton.attr("type", "button");
    animalButton.attr("value", buttonName);
    animalButton.text(buttonName);
    $("#animalButtons").append(animalButton);
}

//Function to create all the buttons
function createButtons (buttonArray) {
    $("#animalButtons").empty();
    for (var i = 0; i <buttonArray.length; i++) {
        createSingleButton(buttonArray[i]);
    }
}

//Function to call the GIPHY API
function apiCall (buttonClicked) {
    $("#animals").empty();
    stillImages = [];
    animatedImages = [];

    // Storing our giphy API URL 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonClicked + "&api_key=P7jC5fseJKPYL7AlFn0jH7CBw8DBfZs0&limit=10";

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After the data from the AJAX request comes back
      .then(function(response) {
         
        for (var i = 0; i < response.data.length; i++) {
            // Saving the image URL and rating
            var imageUrl = response.data[i].images.fixed_height_small_still.url;
            var rating = response.data[i].rating;
            //Lets create an array with both still and animated images for 
            //changing later when the picture is clicked
            stillImages.push(response.data[i].images.fixed_height_small_still.url);
            animatedImages.push(response.data[i].images.fixed_height_small.url);

            // Creating and storing an image tag
            var animalImage = $("<img>");

            // Setting the animalImage src attribute to imageUrl
            animalImage.attr("src", imageUrl);
            animalImage.attr("alt", buttonClicked + "_image");
            animalImage.attr("class", "image");
            animalImage.attr("value", i);
            animalImage.attr("data", "still");
            
            //Creating a div tag for the gif rating.
            var ratingTag = $("<div>");
            ratingTag.attr("class", "text");
            ratingTag.text("Rating: " + rating);

            // Prepending images to animals tag
            $("#animals").append(ratingTag);
            $("#animals").append(animalImage);
        }
    });
}

//Function to add new topic
$("#addAnimal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#animal-input").val().trim();
    topics.push(newAnimal); 
    createButtons(topics);
});

//Function to get gifs when button clicked
$(document).on("click", ".btn", function(event) {
    event.preventDefault();
    var buttonClicked = $(this).val();
    console.log("Button clicked:" + buttonClicked);
    apiCall(buttonClicked);
});

//Function to switch between animated or still gif when image is clicked
$(document).on("click", ".image", function(event) {
    event.preventDefault();
    var pictureClicked = $(this);
    var pictureClickedValue = $(this).attr("value");
    var isAnimated = $(this).attr("data");
    console.log("Picture clicked:" + pictureClickedValue);
    console.log("Mode:", isAnimated);

    if (isAnimated === "still") {
        pictureClicked.attr("data", "animated");
        pictureClicked.attr("src", animatedImages[pictureClickedValue]);
    } else if (isAnimated === "animated") {
        pictureClicked.attr("data", "still");
        pictureClicked.attr("src", stillImages[pictureClickedValue]);
    }
    
});

//Call function to create the buttons
createButtons(topics);

