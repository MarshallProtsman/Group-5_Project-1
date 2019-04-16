$(document).ready(function () {
    let latitude = ''; // this changes with each step in the app (initial ip geolocation, then dining, then event)
    let longitude = ''; // this changes with each step in the app (initial ip geolocation, then dining, then event)
    let city = ''; // swap variable name for whatever we end up using
    let APIResponse = false; // check for api success (re-use as needed)
    let params = []; // array to hold event parameters (needs to be accessed by click event listener and api call - hence global scope)
    let loaderText = '';

    // just set the info for the ticketmaster call as an object (temporary for testing)
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

    /* ----------------------------------------------------------------------------------- */
    // --------------------------------- BEGIN API CALLs --------------------------------- //
    /* ----------------------------------------------------------------------------------- */

    // ==================== BEGIN GeoLocation API Call ====================
    let callAPIGeo = function () {
        loaderText = 'Finding your location...';
        let url = 'https://api.ipdata.co/?api-key=';
        const key = '8bf6f7f9f28c7ed5495f6f6353d07d28a05c6bb9fbab598f32e7cba3';
        var queryURL = url + key;
        $.ajax({
            url: queryURL,
            method: "GET",
            // dataType: 'jsonp', // optional - needed to work around a CORS warning/error
        }).then(function (response) {
            APIResponse = true;
            // console.log(response); // returns the initial ip address geolocation data // TEST CODE
            //latitude = response.latitude; // sets current lat // TEST CODE
            // longitude = response.longitude; // sets current long // TEST CODE
            city = response.city; // sets city - swap for whatever location data we end up using - change variable name!!!!
            // console.log('User latitude is ' + latitude); // tell us the lat // TEST CODE
            //  console.log('User longitude is ' + longitude); // tell us the long // TEST CODE
            // console.log('You are in ' + city); // TEST CODE
            $('#city').text('It looks like you are in ' + city + '.  Is this correct?'); // populates the text for location (depends on APIResponse === true)
        });
    };
    // ==================== END GeoLocation API Call ====================

    // ==================== BEGIN Events API Call ====================
    let callAPIEvents = function () { // Begin ajax call for events
        loaderText = 'Finding awesome events near you...';
        let url = 'https://app.ticketmaster.com/discovery/v2/events.json?city=';
        const key = '1WLkNy3Qylx70A9ds5a5gXCT2PNoGeGq';

        // ===== TESTING CODE =====
        console.log('need to add these to our events query: ' + params);
        $('#paramsList').empty();
        for (i = 0; i < params.length; i++) {
            let paramItem = $('<h3>');
            paramItem.text(params[i]);
            $('#paramsList').append(paramItem);
        };
        // need a loop to add params based on user selection into query url - easy fix :)
        // ===== TESTING CODE =====

        let queryURL = url + city + '&apikey=' + key; // city pulled from geolocatin API call (this could be moved to be called on load for efficeincy instead of tied to a click event)
        $.ajax({
            url: queryURL,
            method: "GET",
            // dataType: 'jsonp', // optional - needed to work around a CORS warning/error
        }).then(function (response) {
            // console.log(response); // returns the initial ip address geolocation data // TEST CODE 

            // ===== Begin Event List Rendering =====
            // NOTE: Most of the event details should be rendered in a modal - show only the key data (event, time, date, etc.) in the list items
            for (i = 0; i < response._embedded.events.length; i++) {
                // console.log(response._embedded.events[i].name); // TEST CODE

                // ===== Begin Event Item core data (main data like name, date, etc.) =====
                let event = response._embedded.events[i].name; // get event name
                let eventItem = $('<div>');
                eventItem.text(event);
                $('#eventsList').append(eventItem);
                // ===== End Event Item core data (main data like name, date, etc.) =====

                // ===== Begin Event Details core data (extra data for modals) =====
                let image = response._embedded.events[i].images[5].url; // get event img 
                let imageEvent = $('<img>');
                imageEvent.attr('src', image);
                imageEvent.addClass('image');
                $('#eventsList').append(imageEvent); // this may be swapped (we may not need images) or added to a seperate element that popualates on event details modal
                // ===== End Event Details core data (extra data for modals) =====
            } // ===== End Event List Rendering =====
        }); // ===== End ajax .then actions
    };
    // ==================== END Events API Call ====================

    /* ----------------------------------------------------------------------------------- */
    // ---------------------------------- END API CALLs ---------------------------------- //
    /* ----------------------------------------------------------------------------------- */


    /* ----------------------------------------------------------------------------------- */
    // ------------------------------ BEGIN EVENT LISTENERS ------------------------------ //
    /* ----------------------------------------------------------------------------------- */

    // ==================== BEGIN - CLICK EVENT - start app - populate ip-based geo location ====================
    $('#start').on('click', function () {

        // $('.overlay').removeClass('hidden'); // TEST CODE
        callAPIGeo(); // gets the initial geolocation data for the user
        if (APIResponse === true) {
            // $('.overlay').addClass('hidden'); // TEST CODE
            // $('.menu1-btn').addClass('scale-in'); // reveals the next menu options (these will eventually be in a seperate component)
        };
    });
    // ==================== END - CLICK EVENT - start app - populate ip-based geo location ====================

    // ---------- Click Event - Location Confirmation
    $('#locationYes').on('click', function () {
        console.log('User confirmed - update view...');
        // this is going to change our view here
    })

    $('#locationNo').on('click', function () {
        // displays the hidden form to update the city
        $('#cityForm').css('display', 'block');
    })

    // ---------- Click Event - Events API Call
    $('#eventSearch').on('click', function () {
        callAPIEvents();
    })

    // ---------- Ajax Loading Animations
    $(document).ajaxStart(function () {
        $('#loaderText').text(loaderText);
        $(".overlay").css("display", "block");
        $(".overlay").css("opacity", "1");
    });

    $(document).ajaxComplete(function () {
        $(".overlay").css("opacity", "0");
        setTimeout(function () {
            $(".overlay").css("display", "none");
        }, 1000);
    });

    // ---------- adding and removing event search parameters from params array
    $('.btn-events').on('click', function () {

        param = $(this).text();
        let paramIndex = params.indexOf(param);

        if ($(this).hasClass('btn-events-active')) {
            console.log('Already active - removed from events params'); // TEST CODE
            $(this).removeClass('btn-events-active');
            params.splice(paramIndex, 1);
            console.log(paramIndex); // TESt CODE
            console.log(params); // TEST CODE
        } else {
            $(this).addClass('btn-events-active');
            params.push($(this).text()) // TEST CODE
            console.log(params);  // TEST Code
        };
    });

    /* ----------------------------------------------------------------------------------- */
    // ------------------------------- END EVENT LISTENERS ------------------------------- //
    /* ----------------------------------------------------------------------------------- */


    // =============== BEGIN COMMON FUNCTIONS (TRANSITIONS) ===============
    // ----- use this space to define things that can be recycled, like transitions 
    // =============== END COMMON FUNCTIONS (TRANSITIONS) ===============
});



