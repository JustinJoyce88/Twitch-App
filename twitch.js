"use strict";

$(() => {
  const streamers = [
    "nl_kripp",
    "kitboga",
    "dansgaming",
    "day9tv",
    "trihex",
    "trumpsc",
    "angryjoeshow",
    "lethalfrag"
  ];
  let html = "";
  streamers.forEach(streamer => {
    const url = "https://wind-bow.glitch.me/twitch-api/streams/" + streamer;
    $.getJSON(url, data => {
      const strmDat = data.stream;
      if (strmDat != null) {
        html += '<div class="container-fluid streamers">';
        html += '<div class="row"><div class="col-sm-3">';
        html +=
          '<img src="' +
          strmDat.channel.logo +
          '"><hr><div class="live-div"><div class="status-online"></div>';
        html += "<span>Live</span></div></div>";
        html += '<div class="col-lg-9 info"><div class="row">';
        html +=
          '<a href="' +
          strmDat.channel.url +
          '">' +
          strmDat.channel.display_name +
          "</a></div>";
        html +=
          '<p class="playing">Playing: <strong>' +
          strmDat.game +
          "</strong></p>";
        html +=
          '<p class="description">' + strmDat.channel.status + "</p></div>";
        html += "</div></div>";

        $("#streamers").html(html);
      } else {
        const url = "https://wind-bow.glitch.me/twitch-api/channels/" + streamer;
        $.getJSON(url, data => {
          html += '<div class="container-fluid streamers offline">';
          html += '<div class="row"><div class="col-sm-3">';
          html +=
            '<img src="' +
            data.logo +
            '"><hr><div class="live-div"><div class="status-offline"></div>';
          html += "<span>Offline</span></div></div>";
          html += '<div class="col-lg-9 info"><div class="row">';
          html +=
            '<a href="' + data.url + '">' + data.display_name + "</a></div>";
          html += "</div></div></div>";

          $("#streamers").html(html);
        });
      }
    });
  });

  $(".btn-primary").on("click", function() {
    if (!$(this).hasClass("active")) {
      $(".offline").hide();
      $(this).html("Show Offline");
    } else {
      $(".offline").show();
      $(this).html("Hide Offline");
    }
  });
});
