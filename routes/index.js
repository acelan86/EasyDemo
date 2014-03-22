
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'EasyDemo' });
};

exports.monitor = function (req, res) {
    var filename = req.query.filename;
    res.render('monitor', {distFile: filename});
};