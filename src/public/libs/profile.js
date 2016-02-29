$(document).ready(function() {

  function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
  }

  var query = getQueryParams(document.location.search);
  var token = query.token;
  console.log(token);

  $("#AddUserRole").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/addUserRoles/56d3ffb84808813025b0b23f/Admin?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#DeleteUserRole").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/deleteUserRoles/56d3ffb84808813025b0b23f/Admin?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#ManageUsers").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/manageUsers?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#SendRawEmail").click(function(){
    $.ajax({
      type: "GET",
      url: "/mail/SendRawEmail?token="+token,
      dataType: 'json',
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
  });

  $("#SendWelcomeEmail").click(function(){
    $.ajax({
      type: "GET",
      url: "/mail/SendWelcomeEmail?token="+token,
      dataType: 'json',
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
  });

  $("#SendEmailWithAttachments").click(function(){
    $.ajax({
      type: "GET",
      url: "/mail/SendEmailWithAttachments?token="+token,
      dataType: 'json',
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
  });

  $("#SendSMSMessage").click(function(){
    $.ajax({
      type: "GET",
      url: "/mail/SendSMSMessage/61402713607?token="+token,
      dataType: 'json',
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  // DRA12X2VFBVZNVMCKFMJKSXY3V2EOYWV52COJC4JGMPPTG2P
  // WVYACRR0VL5V2YTO0X4EKOP2BHTJIS1BH3L02GVD3ZD0LMKE
  $("#SearchFoursquareVenues").click(function(){
    $.ajax({
      type: "GET",
      url: "/foursquare/search?token="+token+"&near=Perth,WA&name=laundry&fstoken=WVYACRR0VL5V2YTO0X4EKOP2BHTJIS1BH3L02GVD3ZD0LMKE",
      dataType: 'json',
      success: function(data){
        alert(JSON.stringify(data));
      },
      error: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#GetFoursquareVenuewDetails").click(function(){
    $.ajax({
      type: "GET",
      url: "/foursquare/venue?token="+token+"&venueId=552d1f33498e8589de121113&fstoken=WVYACRR0VL5V2YTO0X4EKOP2BHTJIS1BH3L02GVD3ZD0LMKE",
      dataType: 'json',
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#GetFoursquareVenueTips").click(function(){
    $.ajax({
      type: "GET",
      url: "/foursquare/venue/tips?token="+token+"&venueId=552d1f33498e8589de121113&fstoken=WVYACRR0VL5V2YTO0X4EKOP2BHTJIS1BH3L02GVD3ZD0LMKE",
      dataType: 'json',
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });


});