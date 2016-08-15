    var express=require('express');
    var app = express();
    var bodyParser= require('body-parser');
		//app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({
  		extended: true
		}));
		app.use(bodyParser.json()); 




    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Expose-Headers","key1,key2,Content-Length ,Date, ETag, Connection");

        next();

});


    var quotes = [
    { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
    { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
    { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
    { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
    ];

	var setCustomHeaderFunc = function(req, res, next) {
    		res.set('key1', 'value key1');
		res.set('key2', 'value2 key2');
    	next();
	};

	app.all('*', setCustomHeaderFunc);

		app.get('/quote/all', function(req,res){

		res.json(quotes);

});

    app.get('/quote/random', function(req, res){
    var id = Math.floor(Math.random() * quotes.length);
    var q = quotes[id];
    //res.send(quotes);
    res.json(q);

    });

    app.get('/quote/:id', function(req, res) {
        if(quotes.length <= req.params.id || req.params.id < 0) {
          res.statusCode = 404;
          return res.send('Error 404: No quote found');
        }
        var q = quotes[req.params.id];
        res.json(q);
    });



    app.post('/quote', function(req, res){
			console.log("inside post method");
	console.log(req.headers);
      if(!req.body.hasOwnProperty('author') ||
        !req.body.hasOwnProperty('text')){
            console.log(req.header.author) ;
						res.statusCode =400;
            return res.send("Error 400: syntax incorrect" +   req.body.author);

        }

      var newQuote= {
        author : req.body.author,
        text : req.body.text
      };

      quotes.push(newQuote);
      res.json(true);
    });


    app.listen(3000);
