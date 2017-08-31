// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


var webshot = require('webshot');

var options = {
    screenSize: {
        width: 480,
        height: 760
    },
    shotSize: {
        width: 'window',
        height: 'window'
    },
    userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 10_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
};

var mainInfo = {
    searchers: ["http://www.baidu.com/s?wd=",
        "https://www.so.com/s?q=",
        "https://www.sogou.com/web?query="],
    keywords: [
        ["文本段1-1", "文本段1-2", "文本段1-3", "文本段1-4", "文本段1-5", "文本段1-6", "文本段1-7", "文本段1-8"],
        ["测试文本段2-1", "测试文本段2-2", "测试文本段2-3", "测试文本段2-4", "测试文本段2-5", "测试文本段2-6", "测试文本段2-7", "测试文本段2-8"]
    ]
}

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function screenshots(data) {
    var searcherData = data.searchers;
    var keywordData = data.keywords;
    var searcherNum = searcherData.length;
    var keywordNum = keywordData.length;
    var keyArray = [];
    for (let i = 0; i < searcherNum; ++i) {
        //console.log(searcherData[i]);
        for (let j = 0; j < keywordNum; ++j) {
            //console.log(searcherData[i],j);
            keyArray = getRandomArrayElements(keywordData[j], 3);
            for (let k = 0; k < keyArray.length; ++k) {
                (function (i, k) {
                    webshot(encodeURI(searcherData[i] + keyArray[k]), new Date().Format("yyyy-MM-dd") + '/' + i + 'IMG_' + (4300) + keyArray[k] + '.png', options, function (err) {
                        // screenshot now saved to google.png 
                        console.log(searcherData[i], keyArray[k]);
                        if (err) throw err;
                        console.log('Done');
                    });
                })(i, k);

            }
        }
    }
}

screenshots(mainInfo);
