 //source link for firebase to go in index.html
 //<script src="https://www.gstatic.com/firebasejs/5.9.4/firebase.js"></script>
 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBABOMAyspPrJFTDDfDcrK2GOk0iVYopm4",
    authDomain: "project-1-4d357.firebaseapp.com",
    databaseURL: "https://project-1-4d357.firebaseio.com",
    projectId: "project-1-4d357",
    storageBucket: "project-1-4d357.appspot.com",
    messagingSenderId: "181689746107"
  };
  firebase.initializeApp(config);

  //assigns a reference to firebase's database
  var database = firebase.database();
  var ref = database.ref('userInfo');

  //variable that will store user info from app that will load into firebase
  var data = {
    userReview = "",
    userEvent = "",
    userFood = "",
    userZip = ""
  }

ref.push(data);