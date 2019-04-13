// wrapping js in document.ready() function
$(document).ready(function () {

    userZip = 30308;
// < --- ========== Begin API KEYS ========== --- >
// placing our keys here so we can reuse ajax method
    var apiKeys = [
        {
            api: 'geolocation',
            key: '8bf6f7f9f28c7ed5495f6f6353d07d28a05c6bb9fbab598f32e7cba3',
            url: 'https://api.ipdata.co/?api-key=',
        },
        {
            api: 'events',
            key: 'RWZMsGXPj9h35CHD',
            zip: '30316',
            url: 'http://eventful.com/json/events?q=music&l=30316&app_key=',
        },
        {
        api: 'restaurants',
        url: 'http://opentable.herokuapp.com/api/restaurants?per_page=5&zip=' + userZip
        }
    ];
// < --- ========== End API KEYS ========== --- >

    var queryURL = apiKeys[0].url + apiKeys[0].key;

    let API = function() {
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'jsonp',
    }).then(function (response) {
        // do a bunch of cool things with our returned json data here
    console.log(response); // preserved this just in case i need to quickly console this json data out 
    });
    
};
API(); // calling our location API

    var queryURL = apiKeys[2].url;

    let APIRestaurant = function() {
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'jsonp',
    }).then(function (response) {
        console.log(response)
        // do a bunch of cool things with our returned json data here
        for (i = 0; i < 5; i++) {
            let rest = response.restaurants[i]
        console.log(rest.name, rest.price, rest.address); // preserved this just in case i need to quickly console this json data out 
       }
    });

    };

    APIRestaurant(); // calling our APIRestaurant method to test

    $('.yourdiv').hover(function () {
        $(this).addClass('magictime puffIn');
    });

    console.log("Stayed at the ace hotel!");
});



// 8bf6f7f9f28c7ed5495f6f6353d07d28a05c6bb9fbab598f32e7cba3

/* Zomato - restaurants

🔑 - 68eb0060bac91f9d51a849356a1720f1

Documentation - developers.zomato.com/docu…

IMDB - movies (1000 per day max)

🔑 - 69b945e06fmsh34874c0e87f7ddcp13b6f5jsn04b50333f22b

Documentation - I don't know. rapidAPI I guess

Food2Fork - socially ranked recipes

🔑 - 619bb582bcf5cdc9781f54942ddc1335

JSON - www.food2fork.com/api…

Eventful - events (I got 2 keys on accident)

🔑 - RWZMsGXPj9h35CHD

🔑 - nSGqTC7S89C8cvd5

Documentation - api.eventful.com/ */