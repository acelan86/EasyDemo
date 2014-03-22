$(document).ready(function () {
    var cm = window.cm = CodeMirror(document.getElementById('srcCode'), {
        value: '<html></html>',
        mode: 'htmlmixed',
        theme: "solarized dark",
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true,
        lineWrapping: true,
        viewportMargin: 50,
        extraKeys: {
            'Esc': function (cm) {
                if (cm.getOption('fullScreen')) {
                    cm.setOption('fullScreen', false);
                }
            }
        }
    });

    (function () {
        $('#tplSel').select2();
        bindLocationURL();
        bindFetchHanlder();
        bindTypeSelHandler();
        // bindToolBarHandler();
        bindInsertCodeHandler();
        bindSaveBtnHandler();
        bindInsInsertHandler();
        bindExtraKey();
        window.onbeforeunload = function () {
            return '离开页面会丢失当前编辑内容';
        };
    })();
    /**
     * [bindLocationURL 绑定页面选择框，获取常见页面的URL]
     */
    function bindLocationURL () {
        var sel = $('#selLocation');
        sel.bind('change', function () {
            $('#url').val(sel.val());
        });
    }
    function bindFetchHanlder () {
        $('#fetchBtn').bind('click', function () {
            var request = $.ajax({
                url: "/api/fetchURL",
                type: "POST",
                data: { url : $('#url').val() }
            });
            request.done(function (msg) {
                fileName = '';
                cm.setValue(msg);
                cm.setOption('fullScreen', !cm.getOption('fullScreen'));
            });
        });
    }
    
    function bindTypeSelHandler() {
        $('#type').bind('change', function () {
            var type = $('#type').val();
            type = _mediaMap[type];
            if (type) {
                pdps = searchPdps(type);
                if (pdps) {
                    $('#pdpsInput').val(pdps);
                }
            }
        });
    }

    function searchPdps(type) {
        var regex = new RegExp('^\\s*<!--.*?' + type + '.*?-->\\s*$');
        var cusor = cm.getSearchCursor(regex);
        var line;
        while(cusor.find()) {
            line = cusor.to().line;
            content = cm.getLine(line + 1);
            var match = content.match(/data-ad-pdps=['"](.*?)['"]/);
            if (match) {
                return match[1];
            }
            content = cm.getLine(line + 2);//可能在下下一行
            var match = content.match(/data-ad-pdps=['"](.*?)['"]/);
            if (match) {
                return match[1];
            }
        }
    }

    var scriptTpl = ['   <script>',
                    '        _sinaadsCacheData = window._sinaadsCacheData || {};',
                    '        _sinaadsCacheData["#{pdps}"] = {',
                    '           size : "1600*600",',
                    '           type : "#{type}",',
                    '           content : [{',
                    '               src: ["http://d1.sina.com.cn/201312/11/527511.jpg"],',
                    '               monitor : [""],',
                    '               link : [""],',
                    '               type: [""]',
                    '           }],',
                    '           id : "#{pdps}"',
                    '       };',
                    '   </script>\n'].join('\n');

    function format(tpl, data) {
        return tpl.replace(/#\{(.+?)\}/g, function (match, key) {
            return data[key] || '';
        });
    }
    function bindInsertCodeHandler () {
        $('#topInsertBtn').bind('click', function () {
            var pdps = $('#pdpsInput').val();
            var codeSnippet = format(_mediaTpl[$('#type').val()] || scriptTpl, {pdps: pdps, type: $('#type').val()});
            var cusor = cm.getSearchCursor('</head>');
            if (cusor.find()) {
                cm.replaceRange(codeSnippet, {line: cusor.from().line, ch: 0});
                cm.scrollIntoView({line: cusor.from().line + 7, ch: 0});
            }
        });

        $('#fpInsertBtn').bind('click', function () {
            var pdps = $('#pdpsInput').val();
            if (!pdps) {
                console.log('require pdps');
                // return;
            }
            var codeSnippet = format(_mediaTpl[$('#type').val()] || scriptTpl, {pdps: pdps, type: $('#type').val()});
            var cusor = cm.getCursor();
            if (cusor) {
                cm.replaceRange(codeSnippet, {line: cusor.line, ch: 0});
                cm.scrollIntoView({line: cusor.line + 7, ch: 0});
            }
        });
    }

    /**
     * [bindToolBarHandler 面板收起展开处理]
     * @return {[type]} [description]
     */
    function bindToolBarHandler () {
        var timer;
        $('#fix-tools').hover(function () {
            timer && clearTimeout(timer);
            $('#fix-tools').css('right', 0);
        }, function (event) {
            if ($.contains($('#fix-tools')[0], event.target)) {
                return false;
            }
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                $('#fix-tools').css('right', -170);
            }, 50);
        });
    }
    var fileName = '';
    function bindSaveBtnHandler () {
        $('#saveBtn').bind('click', function () {
            var htmlContent = cm.getValue('\n');
            $.ajax({
                url: "/api/save",
                type: 'POST',
                data: {
                    'fileName' : fileName,
                    'htmlContent': htmlContent
                }
            }).done( function (msg) {
                fileName = msg;
                console.log('name --' + msg);
                $('#downloadBtn').attr('href', '/download/demo/' + fileName);
                $('#downloadBtn').show();
                $('#fileLink').attr('href', '/monitor?filename=' + fileName);
                $('#fileLink').show();
            });
        });
    }

    var insTpl = ['<script async charset="utf-8" src="http://d3.sina.com.cn/litong/zhitou/sinaads/release/sinaads.js"></script>',
                '<ins class="sinaads" data-ad-pdps="#{pdps}"></ins>',
                '<script>(sinaads = window.sinaads || []).push({});</script>',
                ''].join('\n');
    function bindInsInsertHandler () {
        $('#insInsertBtn').bind('click', function () {
            var pdps = $('#pdpsInput').val();
            if (!pdps) {
                console.log('require pdps');
            }
            var tpl = format(insTpl, {pdps: pdps});
            var cusor = cm.getCursor();
            if (cusor) {
                cm.replaceRange(tpl, {line: cusor.line, ch: 0});
                cm.scrollIntoView({line: cusor.line + 7, ch: 0});
            }
        });
    }

    function bindExtraKey () {
        $(document).bind('keydown', function (e) {
            if (e.altKey && e.keyCode === 18) {
                $('#saveBtn').trigger('click');
            }
        });
    }
});