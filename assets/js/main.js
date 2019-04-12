let apiResponse = [];

$(document).ready(function () {

    // < --- ========== Begin API KEYS ========== --- >
    // placing our keys here so we can reuse ajax method
    let apiKeys = [
        {
            api: 'geo',
            key: '8bf6f7f9f28c7ed5495f6f6353d07d28a05c6bb9fbab598f32e7cba3',
            params: [],
            url: 'https://api.ipdata.co/?api-key=',
        },
        // extra  template api object
        // {
        //     api: '',
        //     key: '',
        //     url: '',
        // },
        {
            api: 'events',
            key: '1WLkNy3Qylx70A9ds5a5gXCT2PNoGeGq',
            url: 'https://app.ticketmaster.com/discovery/v1/events.apiResponse?apikey='
        }
    ];
    // < --- ========== End API KEYS ========== --- >

    // --------------- DEPRECATED TESTING ---------------
    // < --- ========== BEGIN API CALL FUNCTION ========== --- >
    // let callAPI = function () {
    //     var queryURL = apiKeys[i].url + apiKeys[i].key;

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET",
    //         success: function (data) {
    //             myVariable = data;
    //         }
    //         // dataType: 'jsonp',
    //     }).then(function (response) {
    //         // do a bunch of cool things with our returned apiResponse data here
    //         console.log(response); // testing API response   
    //     });
    // } // end callAPI

    // // loop thru api responses for easy access during dev and DRY code in production
    // for (i = 0; i < apiKeys.length; i++) {
    //     //callAPI(); // calling our API method to test
    // }
    // --------------- DEPRECATED TESTING ---------------

    // < --- ========== BEGIN API SINGLE USE TESTING ========== --- >
   

    let callAPI_test = function (url, key, api) {
        var queryURL = url + key;
        name = api
        $.ajax({
            url: queryURL,
            method: "GET",
            success: function (data) {
                 apiResponse.push(data); // trying to dynamically create a variable name - dunno if it is possible
            }
            // dataType: 'jsonp',
        }).then(function (response) {
            
            
            // do a bunch of cool things with our returned apiResponse data here
            //console.log(response); // testing API response   
            //console.log(apiResponse); 
        });
    } // end callAPI_test

callAPI_test(apiKeys[0].url, apiKeys[0].key);
callAPI_test(apiKeys[1].url, apiKeys[1].key);

console.log(apiResponse); 
// < --- ========== END API SINGLE USE TESTING ========== --- >


    // just testing the magic css animation library
    $('.yourdiv').hover(function () {
        $(this).addClass('magictime puffIn');
    })

}) // end document.ready



// --- ========== API KEYS NOT YET IN APIKEYS ARRAY ========== --- //
/*

/ ----------------------------------------------------------------- /
IMDB - movies (1000 per day max)
🔑 - 69b945e06fmsh34874c0e87f7ddcp13b6f5jsn04b50333f22b
/ ----------------------------------------------------------------- /

*/
// --- ========== API KEYS NOT YET IN APIKEYS ARRAY ========== --- //