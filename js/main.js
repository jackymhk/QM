var appscript_url = 'https://script.google.com/macros/s/AKfycbyhle-PX-nb9GK_a3z0Zv4hOFSP8mHeoaKe3Gws_KsFvX2pYf0/exec';

var listIds = ['5781353e2adfa093b77818bc', // List - 木櫃A
               '578277ca48b1999e7ec8e9b8', // List - 木櫃B
               '5780d6699daac89930dde53f', // List - 木櫃C
               '57812d4492e051d3bd9dbdd1']; // List - 木櫃外

var pendingListId = '5788f02751619a8ccafcd442'; // List - Pending

var borrowLabelId = '5787b74784e677fd368578df'; // Label - 借用記錄
var damagedLabelId = '5780d65784e677fd36737247'; // Label - 損壞
var brokenLabelId = '5781209484e677fd3673e50a'; // Label - 不能使用

var tentLabelId = '5780d7d084e677fd3673747b'; // Label - A字營
var yurtLabelId = '578277dd84e677fd367594b9'; // Label - 蒙古包
var tentpegLabelId = '5781336184e677fd367404f3'; // Label - 營釘
var flyLabelId = '578131ea84e677fd36740230'; // Label - 天幕
var cooksetLabelId = '5781327284e677fd36740338'; // Label - Cookset
var stoveLabelId = '578136e584e677fd36740a0f'; // Label - 爐頭
var otherLabelId = '578133eb84e677fd367405aa'; // Label - 其他

function trelloGet(url, done, fail) {
    //Trello.get(url, done, fail);
    $.get(appscript_url, {
        "trello_url": url,
        "method": "get"
    })
    .done(done)
    .fail(fail);
}

function trelloPost(url, data, done, fail) {
    //Trello.post(url, data, done, fail);
    $.get(appscript_url, {
        "trello_url": url,
        "method": "post",
        "data": JSON.stringify(data)
    })
    .done(done)
    .fail(fail);
}

function successAlert(msg) {
    $("#alert-box").removeClass("hidden");
    $("#alert-box").addClass("alert-success");
    $("#alert-msg").html(msg);
}

function failAlert(msg) {
    console.log("FAIL - " + msg);
    $("#alert-box").removeClass("hidden");
    $("#alert-box").addClass("alert-danger");
    $("#alert-msg").html(msg);
}

function hasLabel(card, labelId) {
    for (var i = 0; i < card.labels.length; i++) {
        if (card.labels[i].id == labelId) 
            return true;
    }
    return false;
}

function urlParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function(){
    $(".datepicker").datepicker({
        format: 'yyyy/mm/dd',
        autoclose: true
    });
});