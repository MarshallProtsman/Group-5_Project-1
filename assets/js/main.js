$(document).ready(function () {
    let latitude = ''; // this changes with each step in the app (initial ip geolocation, then dining, then event)
    let longitude = ''; // this changes with each step in the app (initial ip geolocation, then dining, then event)
    let city = '';
    let APIResponse = false;


    //    just set the info for the ticketmaster call as an object (temporary for testing)
    let apiEvent = {
        api: 'events',
        zip: '',
        country: 'US',
        city: 'Atlanta',
        key: '1WLkNy3Qylx70A9ds5a5gXCT2PNoGeGq',
        get url() {
            return 'https://app.ticketmaster.com/discovery/v2/events.json?city=' + this.city + '&apikey=';
        }
    };

    // ==================== Begin GeoLocation API Call ====================
    let callAPIGeo = function () {
        let url = 'https://api.ipdata.co/?api-key=';
        const key = '8bf6f7f9f28c7ed5495f6f6353d07d28a05c6bb9fbab598f32e7cba3';
        var queryURL = url + key;
        $.ajax({
            url: queryURL,
            method: "GET",
            // dataType: 'jsonp', // optional - needed to work around a CORS warning/error
        }).then(function (response) {
            APIResponse = true;
            console.log(response); // returns the initial ip address geolocation data
            latitude = response.latitude; // sets current lat
            longitude = response.longitude; // sets current long
            city = response.city;
            console.log('User latitude is ' + latitude); // tell us the lat
            console.log('User longitude is ' + longitude); // tell us the long
            console.log('You are in ' + city);
        });
    };
    // ==================== End GeoLocation API Call ====================
    let callAPIEvents = function () {
        let url = 'https://app.ticketmaster.com/discovery/v2/events.json?city=';
        const key = '1WLkNy3Qylx70A9ds5a5gXCT2PNoGeGq';
        var queryURL = url + city + '&apikey=' + key;
        $.ajax({
            url: queryURL,
            method: "GET",
            // dataType: 'jsonp', // optional - needed to work around a CORS warning/error
        }).then(function (response) {
            console.log(response); // returns the initial ip address geolocation data
            for (i = 0; i < response._embedded.events.length; i++) {
                console.log(response._embedded.events[i].name);
                let event = response._embedded.events[i].name;
                let image = response._embedded.events[i].images[5].url;
                let imageEvent = $('<img>');
                imageEvent.attr('src', image);
                imageEvent.addClass('image');
                let eventItem = $('<div>');
                eventItem.text(event);
                $('#eventsList').append(eventItem);
                $('#eventsList').append(imageEvent);
            }
        });
    };


    // ==================== click to start app - populate dining, movie, event buttons ====================
    $('#start').on('click', function () {
        callAPIGeo(); // gets the initial geolocation data for the user
        if (APIResponse === true) {
            $('.menu1-btn').addClass('scale-in'); // reveals the next menu options (these will eventually be in a seperate component)
            $('#city').text('It looks like you are in ' + city + '.  Is this correct?'); // populates the text for location (depends on APIResponse === true)
        } else {
            alert('Loading data - please wait and try again...'); // placeholder for loading - set loading animation and error timeout modal
        };
    });

    $('#eventSearch').on('click', function() {
        callAPIEvents();
        
    })

});


// _embedded.events[""0""]