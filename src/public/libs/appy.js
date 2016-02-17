$(document).ready(function() {
    var option = 0;

    $('#addClick').click(function() {
        $('.addTable').toggle();
    });

    $('#openModalNews').click(function() {
      option = 1;
      $('#feedModal').modal({
          show: true
      });
    });

    $('#openModalReviews').click(function() {
      option = 2;
      $('#feedModal').modal({
          show: true
      });
    });

    $('#openModalAdvice').click(function() {
      option = 3;
      $('#feedModal').modal({
          show: true
      });
    });

    $(window).on('shown.bs.modal', function() {
        PopulateFeedList(option);
    });

    $('#AddFeedItems').click(AddFeedItems);

    $('.addTable').toggle();
    var Ads = GenerateTableFromAds();

    window.initInterval = setInterval(function(){
      var rnd = Math.floor(Math.random()*3);
      $('#news').attr('href', Ads[rnd].Url);
      $('#news').text(Ads[rnd].Title);
    }, 4000);

    $.ajaxSetup({
      beforeSend: function() {
         $('#loader').show();
      },
      complete: function(){
         $('#loader').hide();
      },
      success: function() {}
    });
});

$(document).on('click', '#AddUrlButton', null, function(event) {
    var Title = $('#AddTitleTexbox').val();
    var Url = $('#AddUrlTexbox').val();
    var Img = $('#AddImgTexbox').val();

    if (Title.length > 0 && Url.length > 0 && Img.length > 0) {
        $('#AddTitleTexbox').removeClass('Error');
        $('#AddUrlTexbox').removeClass('Error');
        $('#AddImgTexbox').removeClass('Error');

        var ad = {Title: Title, Url: Url, Img: Img};

        BeginAddItemToAdsTable(ad);

        $('#AddTitleTexbox').val("");
        $('#AddUrlTexbox').val("");
        $('#AddImgTexbox').val("");
    } else {
        if (Title.length == 0)
            $('#AddTitleTexbox').addClass('Error');
        else
            $('#AddTitleTexbox').removeClass('Error');
        if (Url.length == 0)
            $('#AddUrlTexbox').addClass('Error');
        else
            $('#AddUrlTexbox').removeClass('Error');
        if (Img.length == 0)
            $('#AddImgTexbox').addClass('Error');
        else
            $('#AddImgTexbox').removeClass('Error');
    }
});

$(document).on('click', '#SaveButton', null, function(event) {
    var saveButton = $(event.target);
    var par = $(saveButton).parent().parent();
    var tdTitle = par.children("td:nth-child(2)");
    var url = $(par).attr('data-Url');

    $(par).attr('data-Title', tdTitle.children("input[type=text]").val());
    tdTitle.html("<a href='" + url + "' target='_blank'>" + tdTitle.children("input[type=text]").val() + "</a>");
    saveButton.parent().html('<input type="button" class="btn btn-info" id="EditButton" value="Edit">');

    var deleteButton = $("#DeleteButton");
    deleteButton.removeAttr("disabled");

    ClearFeedbackMessage();
});

$(document).on('click', '#EditButton', null, function(event) {
    var editButton = $(event.target);
    var par = $(editButton).parent().parent();
    var tdTitleLink = par.children("td:nth-child(2)").children();

    tdTitleLink.parent().html("<input class='form-control' type='text' id='adTitle' value='" + tdTitleLink.html() + "'/>");
    editButton.parent().html('<input type="button" class="btn btn-info" id="SaveButton" value="Save">');

    var deleteButton = $("#DeleteButton");
    deleteButton.prop("disabled", true);
    ClearFeedbackMessage();
});

$(document).on('click', '#DeleteButton', null, function(Event) {
    var DeleteButton = $(Event.target);
    DeleteButton.closest('tr').remove();
    ClearFeedbackMessage();
});

$(document).on('click', '#feedList li', null, function(Event) {
    $(Event.target).toggleClass('Selected');
});

function GetAdsTable() {
    return $('#AdsTable');
};

function ClearFeedbackMessage() {
    SetFeedbackMessage('');
};

function SetFeedbackMessage(Text) {
    $('#Feedback').text(Text);
};

function GenerateTableFromAds() {
    var Ads = ads_jade;
    GetAdsTable().find('tr').remove();
    for (var i = 0; i < Ads.length; ++i) {
        CompleteAddItemToTable(Ads[i]);
    }

    var rnd = Math.floor(Math.random()*3);
      $('#news').attr('href', Ads[rnd].Url);
      $('#news').text(Ads[rnd].Title);

    return Ads;
};

function CompleteAddItemToTable(Ad) {
    var Url = Ad.Url;
    var Title = Ad.Title;
    var Img = Ad.Img;

    var TableRow = $('<tr data-Title="' + Title + '" data-Url="' + Url + '" data-Img="' + Img +
        '"><td><img src="' + Img +
        '" width="42px"></td><td width="100%"><a href="' + Url +
        '" target="_blank">' + Title + '</a></td>' +
        '<td align="right"><input type="button" class="btn btn-info" id="EditButton" value="Edit"/></td>' +
        '<td align="right"><input type="button" class="btn btn-danger" id="DeleteButton" value="Delete"></td></tr>');
    GetAdsTable().append(TableRow);
};

function BeginAddItemToAdsTable(Ad) {
    ClearFeedbackMessage();
    CompleteAddItemToTable(Ad);
};

function GetArrayOfAdsFromTable() {
    Ads = new Array();
    var AdsTable = GetAdsTable();
    AdsTable.find('tr').each(function(Index, Element) {
        var Row = $(Element);
        var Url = Row.attr('data-Url');
        var Title = Row.attr('data-Title');
        var Img = Row.attr('data-Img');

        Ads.push({
            Title: Title,
            Url: Url,
            Img: Img
        });
    });
    return Ads;
};

function PopulateFeedList(option) {
    ClearFeedList();
    var client = client_jade;
    var campaign = campaign_jade;
    var section = section_jade;
    var option = option;
    $.ajax('/feed/' + client + '/' + campaign + '/' + section+'/'+option, {
        success: HandleAjaxFeedResponse
    });
}

function HandleAjaxFeedResponse(Data, Status, jqXHR) {
    for (var i = 0; i < Data.length; ++i) {
        AddAdToList(Data[i].Title, Data[i].Url, Data[i].Img);
    }
};

function ClearFeedList() {
    $('#feedList li').remove();
};

function AddAdToList(Title, Url, Img) {
    if (Url.indexOf("?") > -1) {
        Url = Url.substr(0, Url.indexOf("?"));
    }
    $('#feedList').append('<li class="list-group-item" data-Title="' + Title + '" data-Url="' + Url + '" data-Img="' + Img + '"><img src="' + Img + '" width="60px">&nbsp;' + Title + '</li>');
};

function GetSelectedItems() {
    var SelectedItems = $('#feedList li.Selected');

    var ResultingArray = new Array();
    SelectedItems.each(function(Index, Element) {
        var Title = $(Element).attr('data-Title');
        var Url = $(Element).attr('data-Url');
        var Img = $(Element).attr('data-Img');
        ResultingArray[Index] = {
            Title: Title,
            Url: Url,
            Img: Img
        };
    });
    return ResultingArray;
};

function AddFeedItems() {
    var newAds = GetSelectedItems();
    for (var i = 0; i < newAds.length; ++i) {
        CompleteAddItemToTable(newAds[i]);
    }
};

function PublishAds() {
    var AdsTable = GetAdsTable();
    var Ads = GetArrayOfAdsFromTable();
    var client = client_jade;
    var campaign = campaign_jade;
    var section = section_jade;
    var MaxAds = 3;

    if (Ads.length < 1) {
        var Feedback = "Please select ads";
        $('#AdsCountFeedback').text(Feedback);
        return false;
    }

    if (Ads.length > MaxAds) {
        var Feedback = "You've selected " + (Ads.length) + " ads. Please removed " + (Ads.length - MaxAds) + " ads to fit the maximum of " + MaxAds + ".";
        $('#AdsCountFeedback').text(Feedback);
        return false;
    } else {

        clearInterval(window.initInterval);

        window.initInterval = setInterval(function(){
          var rnd = Math.floor(Math.random()*3);
          $('#news').attr('href', Ads[rnd].Url);
          $('#news').text(Ads[rnd].Title);
        }, 4000);

        $('#AdsCountFeedback').text('');
        var file = {
            client: client,
            key: campaign + '/' + section + '/demo.js',
            content: JSON.stringify(Ads)
        };
        // save demo file
        $.ajax({
            url: '/publish/' + client + '/' + campaign + '/' + section,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(file),
            dataType: 'json',
            complete: function() {
                IFramesRefresh();
            },
            success: function(data) {
                var success = "Feed published";
                $('#FeedSuccess').text(success);
                $('#FeedSuccess').show();
                function hideFeedSuccessLabel(){
                  $('#FeedSuccess').hide();
                }
                setTimeout(hideFeedSuccessLabel, 2000);
                IFramesRefresh();
            },
            error: function() {
              var error = "Feed published error";
                $('#FeedError').text(error);
                $('#FeedError').show();
                function hideFeedErrorLabel(){
                  $('#Success').hide();
                }
                setTimeout(hideFeedErrorLabel, 2000);
                console.log('process error');
            }
        });

        var file = {
            client: client,
            key: campaign + '/' + section + '/live.js',
            content: JSON.stringify(Ads)
        };
        // save live file
        $.ajax({
            url: '/publish/' + client + '/' + campaign + '/' + section,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(file),
            dataType: 'json',
            complete: function() {
                IFramesRefresh();
            },
            success: function(data) {
                IFramesRefresh();
            },
            error: function() {
                console.log('process error');
            }
        });
    }
};

function IFramesRefresh(){
    var frame = $("#Preview");
    frame.attr('src', frame.attr('src'));
    //document.getElementById("Preview").contentDocument.location.reload(true);
};

function ReplayLinks(ads){
  $('#news').text(ads[Math.floor(Math.random()*3)].Title);
}

function ReplayDemo() {
    var Ads = GetArrayOfAdsFromTable();
    var client = client_jade;
    var campaign = campaign_jade;
    var section = section_jade;
    var MaxAds = 3;

    if (Ads.length < 1) {
        var Feedback = "Please select ads";
        $('#AdsCountFeedback').text(Feedback);
        return false;
    }

    if (Ads.length > MaxAds) {
        var Feedback = "You've selected " + (Ads.length) + " ads. Please removed " + (Ads.length - MaxAds) + " ads to fit the maximum of " + MaxAds + ".";
        $('#AdsCountFeedback').text(Feedback);
        return false;
    } else {

        clearInterval(window.initInterval);

        window.initInterval = setInterval(function(){
          var rnd = Math.floor(Math.random()*3);
          $('#news').attr('href', Ads[rnd].Url);
          $('#news').text(Ads[rnd].Title);
        }, 4000);

        $('#AdsCountFeedback').text('');
        var file = {
            client: client,
            key: campaign + '/' + section + '/demo.js',
            content: JSON.stringify(Ads)
        };
        // save demo file
        $.ajax({
            url: '/publish/' + client + '/' + campaign + '/' + section,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(file),
            dataType: 'json',
            complete: function() {
                IFramesRefresh();
            },
            success: function(data) {
                IFramesRefresh();
            },
            error: function() {
                console.log('process error');
            }
        });
    }
};