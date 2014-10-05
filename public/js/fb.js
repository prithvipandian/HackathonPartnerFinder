var uuid;

function leaveIdea(idea){
  fbid(function(uuid){
      var data = {'idea':idea, 'id':id};
      $.ajax({
      url: '/app/leaveIdea'+ "?" +$.param(data),
      dataType: 'jsonp',
      success: function(data){
          //do nothing
      }
  });

  });
}

function joinIdea(idea){
  fbid(function(uuid){
      var data = {'idea':idea, 'id':id};
      $.ajax({
      url: '/app/joinIdea'+ "?" +$.param(data),
      dataType: 'jsonp',
      success: function(data){
          //do nothing
      }
  });

  });
}

function fbid(callback){
  FB.getLoginStatus(function(response){
    callback(response.authResponse.userID);
  });
}

function registerUser(){
  var user = {};
  user.first_name = $('#first_name').val();
  if(!user.first_name){
    user.first_name = $('#first_name').attr('placeholder');
  }
  user.last_name = $('#last_name').val();
  if(!user.last_name){
    user.last_name = $('#last_name').attr('placeholder');
  }
  user.img = $('#profilePicture').attr('src');
  user.level = $('#level').val();
  user.skills = $('#skills').val();
  user.uuid= uuid;
  console.log(user);
  //$.post( "/app/register", user );
   $.ajax({
      url: "/app/register"+"?" +$.param(user),
      dataType: 'jsonp',
      success: function(data){
          //do nothing
      }
  });
  //$.getJSON("/app/register"+"?" +$.param(user), 
  //          function(data) { onComplete(data); });
  // $.get( "/app/register"+"?" +$.param(user), function(retval){
  //   //donothing
  // } );
  $('#registerModal').modal('hide');
}

function registerIdea(){
  fbid(function(uuid){
  var idea = {};
  idea.title= $('#title').val();
  idea.looking= $('#looking').val();
  idea.keywords= $('#keywords').val();
  idea.size= $('#size').val();
  idea.description= $('#description').val();
  idea.uuid = uuid;

  $.ajax({
      url: '/app/teamInfo'+ "?" +$.param(idea),
      dataType: 'jsonp',
      success: function(data){
          //do nothing
      }
  });
  //$.getJSON('/app/teamInfo'+ "?" +$.param(idea), 
  //          function(data) { onComplete(data); });
  //$.post( "/app/teamInfo", idea );
  // $.get( "/app/teamInfo"+ "?" +$.param(idea), function(retval){
  //   //donothing
  // } );
  $('#myModal').modal('hide');
  });

}




function getProfile(){

  FB.api(
      "/me/picture?redirect=false&type=large",
      function (response) {
        if (response && !response.error) {
          /* handle the result */
          console.log(response)
          var pictureUrl = response.data.url
          FB.api(
              "/me",
              function (response) {
                if (response && !response.error) {
                  /* handle the result */
                  console.log(response);
                  var user = response
                  user['url'] = pictureUrl;
                  $('#myModalLabel').text('Hi '+ user.first_name+', create your hacker profile!');
                  $('#first_name').attr("placeholder", user.first_name);
                  $('#last_name').attr("placeholder", user.last_name);
                  uuid = user.id;

                }
              }
            );
          $('#profilePicture').attr("src", response.data.url);
        }
      }
  );


}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //show modal 
      $('#registerModal').modal('show');
      getProfile();
    } else{
     console.log("user refused login");
    }
  }

  function login(){
     //FB.getLoginStatus(function(response){
     // if(response.status !== "connected"){
            FB.login(function(response){
      statusChangeCallback(response);
     }); 
     // }
     //})

  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '386707621414765',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });


  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));