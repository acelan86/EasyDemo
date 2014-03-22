var http = require('http');
var iconv = require('iconv-lite');
var url = require('url');

exports.fetchURL = function (requset, response) {
    var destURL = requset.body.url;
    if (destURL) {

        var html = "";
        var getURL = url.parse(destURL);
        var req = http.get(getURL, function (res) {
            res.setEncoding('binary');//or hex
            res.on('data',function (data) {//加载数据,一般会执行多次
                html += data;
            }).on('end', function () {
                var match = html.match(/<meta.*?charset=['"]?(.*?)['"].*?[\/]?>/);
                if (match && match[1].toLowerCase() != 'utf8') {
                    var buf = new Buffer(html,'binary');//这一步不可省略
                    console.log('decode ' + match[1])
                    var str = iconv.decode(buf, match[1]);//将GBK编码的字符转换成utf8的
                    response.send(str);
                } else {
                    response.send(html)
                }
                })
            }).on('error', function(err) {
                response.send("http get error");
            });
    }
};

exports.save = function (req, response, next) {
    var body = req.body;
    var htmlContent = body.htmlContent;
    var fileName = body.fileName;
    if (htmlContent) {
        var match = htmlContent.match(/<meta.*?charset=['"]?(.*?)['"].*?[\/]?>/);
        if (match) {
            var encoding = match[1];
            console.log('transfer encode -- ' + encoding);
            if (encoding.toLowerCase().indexOf('gb') !== -1) {
                encoding = 'gbk';
            }
            htmlContent = iconv.encode(htmlContent, encoding);
        } else {
            console.log('木找到charset 用default utf8--!');
        }
        var fs = require('fs');
        if (!fileName) {
            fileName = (+ new Date()).toString(16) + '.html';
        }
        fs.writeFile('./public/demo/' + fileName, htmlContent, function (err) {
            if (err) {
                throw err;
            }
            response.send(fileName);
            next();
        });
    } else {
        response.send('html空的');
    }
};
