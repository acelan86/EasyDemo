(function (window) {

    var tpl = tpl || {};

    var map = {
          tl: '通栏',
          hzh: '画中画',
          kl: '跨栏',
          bp: '背投',
          sc: '视窗',
          qp: '全屏',
          lmt: '流媒体',
          wzl: '文字链',
          fp: '翻牌',
          dl: '对联',
          kzdl: '扩展对联'
    };
    //done
    tpl.tl =  ['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "1000*90",',
               '            type : "embed",',
               '            content : [{',
               '                src: ["http://d1.sina.com.cn/201403/10/540470_news-tl02_1000x90_0310-hongda.swf"],',
               '                monitor : [""],',
               '                link : [""],',
               '                type:["flash"]',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');

     tpl.lmt =['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "1600*600",',
               '            type : "stream",',
               '            content : [{',
               '                src: "http://d1.sina.com.cn/201312/11/527511.jpg",',
               '                monitor : [""],',
               '                link : [""],',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');
     //done
     tpl.sc = ['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "300*250",',
               '            type : "vedioWindow",',
               '            content : [{',
               '                src: ["http://rm.sina.com.cn/bj_chuanyang/adq320140313/3869.js"],',
               '                monitor : [""],',
               '                link : [""],',
               '                type : ["js"]',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');
     //done
     tpl.kl = ['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "1000*90",',
               '            type : "couplet",',
               '            content : [{',
               '                src: ["http://d1.sina.com.cn/201403/12/540886_GOME-KL-1000-90.swf", "http://d1.sina.com.cn/201403/12/540884_GOME-KL-120-270.swf", "http://d1.sina.com.cn/201403/12/540885_GOME-KL-120-270.swf"],',
               '                monitor : [""],',
               '                link : [""],',
               '                type : ["flash", "flash", "flash"]',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');

     tpl.qp = ['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "1000*90",',
               '            type : "fullscreen",',
               '            content : [{',
               '                src: ["http://d1.sina.com.cn/201403/12/540886_GOME-KL-1000-90.swf", "http://d1.sina.com.cn/201403/12/540884_GOME-KL-120-270.swf", "http://d1.sina.com.cn/201403/12/540885_GOME-KL-120-270.swf"],',
               '                monitor : [""],',
               '                link : [""],',
               '                type : ["flash", "flash", "flash"]',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');
     //done
     tpl.bt = ['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "940*450",',
               '            type : "bp",',
               '            content : [{',
               '                src: ["http://d1.sina.com.cn/201403/12/540838_sina-BT-950-450-JD-20140313.swf"],',
               '                monitor : [""],',
               '                link : [""],',
               '                type : ["flash"]',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');

     tpl.dl = ['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "940*450",',
               '            type : "bp",',
               '            content : [{',
               '                src: ["http://d1.sina.com.cn/201403/12/540838_sina-BT-950-450-JD-20140313.swf"],',
               '                monitor : [""],',
               '                link : [""],',
               '                type : ["flash"]',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');

     tpl.kzdl = ['    <script>',
               '        _sinaadsCacheData = window._sinaadsCacheData || {};',
               '        _sinaadsCacheData["#{pdps}"] = {',
               '            size : "940*450",',
               '            type : "bp",',
               '            content : [{',
               '                src: ["http://d1.sina.com.cn/201403/12/540838_sina-BT-950-450-JD-20140313.swf"],',
               '                monitor : [""],',
               '                link : [""],',
               '                type : ["flash"]',
               '            }],',
               '            id : "#{pdps}"',
               '        };',
               '    </script>\n'].join('\n');



     window._mediaMap = map;
     window._mediaTpl = tpl;

})(window);