var express	=	require("express");
var multer	=	require('multer');
var app	=	express();
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({storage: multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const filename = file.originalname.split('.');
    cb(null, filename[0].replace(' ', '-') + '-' + Date.now() + '.' + filename[1]);
  }
})}).single('file');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo', upload, function(req,res){
  console.log(req.file);
  res.status(201).json({file: 'upload complete'});
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
