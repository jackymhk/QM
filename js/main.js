var APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyhle-PX-nb9GK_a3z0Zv4hOFSP8mHeoaKe3Gws_KsFvX2pYf0/exec';

var Board = 'OPFLEvqH';

var List = {
    inSchool: [
        '5781353e2adfa093b77818bc', // List - 木櫃A
        '578277ca48b1999e7ec8e9b8', // List - 木櫃B
        '5780d6699daac89930dde53f', // List - 木櫃C
        '57812d4492e051d3bd9dbdd1', // List - 木櫃外
        '578f3cbf80ae36f057747cde'  // List - 校內晾曬中
    ],
    cupboardA: '5781353e2adfa093b77818bc',  // List - 木櫃A
    cupboardB:'578277ca48b1999e7ec8e9b8',   // List - 木櫃B
    cupboardC:'5780d6699daac89930dde53f',   // List - 木櫃C
    cupboardOut:'57812d4492e051d3bd9dbdd1', // List - 木櫃外
    drying: '578f3cbf80ae36f057747cde',     // List - 校內晾曬中
    pending: '5788f02751619a8ccafcd442',    // List - Pending
    completed: '5787bae25f65acee6fef6abd',  // List - Completed
    repair: '57812d761a3098af76c8b2be',     // List - 維修中
};

var Label = {
    borrowRec: '5787b74784e677fd368578df', // Label - 借用記錄
    repairRec: '5787b3e184e677fd36856b72', // Label - 維修記錄
    damaged: '5780d65784e677fd36737247',   // Label - 損壞
    broken: '5781209484e677fd3673e50a',    // Label - 不能使用
    cleaning: '5780d65784e677fd36737245',  // Label - 清洗中
    tent: '5780d7d084e677fd3673747b',      // Label - A字營
    yurt: '578277dd84e677fd367594b9',      // Label - 蒙古包
    tentpeg: '5781336184e677fd367404f3',   // Label - 營釘
    fly: '578131ea84e677fd36740230',       // Label - 天幕
    cookset: '5781327284e677fd36740338',   // Label - Cookset
    stove: '578136e584e677fd36740a0f',     // Label - 爐頭
    other: '578133eb84e677fd367405aa'      // Label - 其他
};

function trelloGet(url, done, fail) {
    //Trello.get(url, done, fail);
    $.get(APPSCRIPT_URL, {
        "trello_url": url,
        "method": "get"
    })
    .done(done)
    .fail(fail);
}

function trelloPost(url, data, done, fail) {
    //Trello.post(url, data, done, fail);
    $.get(APPSCRIPT_URL, {
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

function hasLabel(card, Label) {
    for (var i = 0; i < card.labels.length; i++) {
        if (card.labels[i].id == Label)
            return true;
    }
    return false;
}

function isBorrowed(card) {
    if (card.idList == List.cupboardA ||
        card.idList == List.cupboardB ||
        card.idList == List.cupboardC ||
        card.idList == List.cupboardOut ||
        card.idList == List.drying ||
        card.idList == List.repair) {
        return false;
    }
    return true;
}

function getItemLabelSeq(card) {
    if (hasLabel(card, Label.tent))
        return 1;
    else if (hasLabel(card, Label.yurt))
        return 2;
    else if (hasLabel(card, Label.tentpeg))
        return 3;
    else if (hasLabel(card, Label.fly))
        return 4;
    else if (hasLabel(card, Label.cookset))
        return 5;
    else if (hasLabel(card, Label.stove))
        return 6;
    else if (hasLabel(card, Label.other))
        return 7;
    else
        return 99;
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

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(function(){
    $(".datepicker").datepicker({
        format: 'yyyy/mm/dd',
        autoclose: true
    });
});

// button_checkbox
function button_checkbox_init() {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color');

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            } else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        updateDisplay();
    });
}

function button_checkbox_reset() {
    $('.button-checkbox').each(function () {
        var $checkbox = $(this).find('input:checkbox');
        $checkbox.triggerHandler('change');
    });
}

// Custom url replacement function
function cardUrlReplace(autolinker, match, cards) {
    switch( match.getType() ) {
        case 'url' :
            var anchorText = match.getAnchorText().split('/');
            if (anchorText[0] == 'trello.com' && anchorText[1] == 'c') {
                return '<a href="'+match.getUrl()+'">'+getCardNameByUrl(cards, match.getUrl())+'</a>';
            } else {
                return true;
            }

        case 'email' :
            return true;

        case 'phone' :
            return true;

        case 'twitter' :
            return true;

        case 'hashtag' :
            return true;
    }
}

function getCardNameByUrl(cards, url) {
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].url == url) {
            return cards[i].name;
        }
    }
    return url;
}
