$(document).ready(function() {
  
  $('#json-rendereruser').jsonViewer(user);

  var getUserEmails = function(user)
  {
    var emails = [];
    emails.push(user.email);
    if (user.facebook)
    {
      for(var i = 0; i < user.facebook.emails.length; i++)
        emails.push(user.facebook.emails[i].value);
    }
    if (user.linkedin)
    {
      for(var i = 0; i < user.linkedin.emails.length; i++)
        emails.push(user.linkedin.emails[i].value);
    }

    return emails;
  }

  var emailSelect  = $("#MainEmail");
  var userEmails = getUserEmails(user);
  console.log(userEmails);
  for(var i = 0; i < userEmails.length; i++)
    emailSelect.append($("<option>", 
      { value: userEmails[i], 
        html: userEmails[i]
      }
    ));

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

  $("#hide").click(function(){
    $("#json-rendereruser").hide();
  });

  $("#show").click(function(){
    $("#json-rendereruser").show();
  });

  $("#resultHide").click(function(){
    $("#json-renderer").hide();
  });

  $("#resultShow").click(function(){
    $("#json-renderer").show();
  });


  $("#FacebookPostOnWall").click(function(){
    $.ajax({
      type: "POST",
      url: "/messages/facebook/postOnWall?token="+token,
      data: JSON.stringify({ 
        accessToken: user.facebook.accessToken,
        message: "I think it's a good day today..."
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        $('#json-renderer').jsonViewer(data);
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#FacebookSendNotification").click(function(){
    $.ajax({
      type: "POST",
      url: "/messages/facebook/sendNotification?token="+token,
      data: JSON.stringify({ 
        accessToken: user.facebook.accessToken,
        userId: user.facebook.id,
        message: "I think it's a good day today..."
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        $('#json-renderer').jsonViewer(data);
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#MainEmailSave").click(function(){
    var select = $("#MainEmail");
    var email = select.val();
    console.log(email);
    $.ajax({
      type: "POST",
      url: "/users/changeEmail?token="+token,
      data: JSON.stringify({ 
        email: email 
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        alert(JSON.stringify(data));
        location.reload();
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#UnlinkTwitterAccount").click(function(){
    $.ajax({
      type: "GET",
      url: "/users/unlinkTwitter/"+user._id+"?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
        location.reload();
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#UnlinkFacebookAccount").click(function(){
    $.ajax({
      type: "GET",
      url: "/users/unlinkFacebook/"+user._id+"?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
        location.reload();
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#UnlinkLinkedInAccount").click(function(){
    $.ajax({
      type: "GET",
      url: "/users/unlinkLinkedIn/"+user._id+"?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
        location.reload();
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#WhatResources").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/whatResources/Admin?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#RemoveRole").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/removeRole/User?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#RemoveResource").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/removeResource/Messages?token="+token,
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#RemovePermission").click(function(){
    $.ajax({
      type: "POST",
      url: "/admin/removePermission?token="+token,
      data: JSON.stringify({ 
        roles: 'Admin', 
        resources: 'Messages',
        permissions: 'View' 
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#AllowPermission").click(function(){
    $.ajax({
      type: "POST",
      url: "/admin/allowPermission?token="+token,
      data: JSON.stringify({ 
        roles: 'Admin', 
        resources: 'Messages',
        permissions: 'View' 
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        alert(JSON.stringify(data));
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

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

  $("#GetUserRoles").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/getUserRoles?token="+token,
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

  $("#ManageMessages").click(function(){
    $.ajax({
      type: "GET",
      url: "/admin/manageMessages?token="+token,
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
        $('#json-renderer').jsonViewer(data);
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
        $('#json-renderer').jsonViewer(data);
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
        $('#json-renderer').jsonViewer(data);
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });

  $("#SearchLocuVenues").click(function(){
    $.ajax({
      type: "GET",
      url: "/locu/search?name=bar&country=Australia&locality=perth&token="+token,
      dataType: 'json',
      success: function(data){
        $('#json-renderer').jsonViewer(data);
      },
      failure: function(errMsg) {
        alert(JSON.stringify(errMsg));
      }
    });
  });


});