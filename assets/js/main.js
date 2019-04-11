// wrapping js in document.ready() function
$(document).ready(function () {

// < --- ========== Begin API KEYS ========== --- >
// placing our keys here so we can reuse ajax method
    var apiKeys = [
        {
            key: '8bf6f7f9f28c7ed5495f6f6353d07d28a05c6bb9fbab598f32e7cba3',
            url: 'https://api.ipdata.co/?api-key=',
        }
    ];
// < --- ========== End API KEYS ========== --- >

    var queryURL = apiKeys[0].url + apiKeys[0].key;

    let API = function() {
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // do a bunch of cool things with our returned json data here

        let location = `${'<div>'}${'<br>'}Hello there! Welcome to ${response.city}`;
        $('.yourdiv').append(location);
        console.log(response); // preserved this just in case i need to quickly console this json data out 
    });

    };

    API(); // calling our API method to test

    $('.yourdiv').hover(function () {
        $(this).addClass('magictime puffIn');
    });

    console.log("Stayed at the ace hotel!");
});


// 8bf6f7f9f28c7ed5495f6f6353d07d28a05c6bb9fbab598f32e7cba3