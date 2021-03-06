var APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyhle-PX-nb9GK_a3z0Zv4hOFSP8mHeoaKe3Gws_KsFvX2pYf0/exec';

var USE_PROXY = true;
if (window.location.href.substring(0,4) == 'http' && isLogin()) {
	USE_PROXY = false;
} else if (window.location.href.substring(0,4) == 'http' && window.location.href.indexOf('/admin/') > 0) {
	USE_PROXY = false;
}

var Board = 'OPFLEvqH';
var BoardId = '5780d6578f40552d7f41acd7';

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
    borrowed: '57c2b73f45cc4eef8acd26db',  // Label - 借用中
    
    tent: '5780d7d084e677fd3673747b',      // Label - A字營
    yurt: '578277dd84e677fd367594b9',      // Label - 蒙古包
    tentpeg: '5781336184e677fd367404f3',   // Label - 營釘
    fly: '578131ea84e677fd36740230',       // Label - 天幕
    cookset: '5781327284e677fd36740338',   // Label - Cookset
    stove: '578136e584e677fd36740a0f',     // Label - 爐頭
    other: '578133eb84e677fd367405aa',     // Label - 其他
    
    tent_tent: '57c50adf0b13f6d890dd6ffc', // Label - A字營 (營)
    tent_pole: '57c50af324d704b9819d6d1b', // Label - A字營 (營柱)
    tent_shelter: '57c50b040b26b0b7969e5b89', // Label - A字營 (天幕)
    
    borrowProcess: '57bd71a6f4a0cb79e28ec61d', // Label - 借用處理中
    active: '57bd71e205838e073940b4b3'     // Label - 進行中
};

var ADMIN_EMAIL = 'm.jacky@gmail.com';
