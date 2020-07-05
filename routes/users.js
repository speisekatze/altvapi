var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query('SELECT username, email, socialid, hwid, online, whitelisted, ban, banreason, adminlevel from accounts', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

router.put('/:id', (req, res) => {
  res.send(JSON.stringify({"given": req.params.id}));
});

router.get('/:id', (req, res, next) => {
  connection.query('SELECT username, email, socialid, hwid, online, whitelisted, ban, banreason, adminlevel from accounts WHERE id = ' + parseInt(req.params.id), function(error, results, fields) {
    if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  } else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  }
  });
});
router.post('/test', (req, res, next) => {
res.send(JSON.stringify({"pw": req.body.password, "got": req.body}));
});
router.post('/create', (req, res) => {
  var values = [
  [req.body.username, req.body.password, req.body.email, req.body.socialid, req.body.hwid, 0, 0, 0, '']
  ];
  
  connection.query('INSERT INTO accounts (username, password, email, socialid, hwid, whitelisted, ban, adminlevel, banReason) VALUES ?', [values], function(error, results, fields) {
  if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  } else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  }
  });
});
module.exports = router;
