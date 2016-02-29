$(document).ready(function() {
  $("#LoginButton").click(function(){
    var username = $("#username").val();
    var password = $("#password").val();
    $.ajax({
      type: "POST",
      url: "/auth/login",
      data: JSON.stringify({ username: username, password: password }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
          alert(errMsg);
      }
    });
  });

   $("#FacebookButton").click(function(){
    $.ajax({
      type: "GET",
      url: "/auth/facebook",
      //crossDomain: true,
      //contentType: "application/json; charset=utf-8",
      //dataType: "jsonp",
      success: function(result,status,xhr){
        alert(JSON.stringify(xhr));
      },
      failure: function(errMsg) {
          alert(errMsg);
      }
    });
  });
});