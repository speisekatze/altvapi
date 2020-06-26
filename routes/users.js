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
  connection.query('SELECT username, email, socialid, hwid, online, whitelisted, ban, banreason, adminlevel from accounts WHERE id = ' + req.params.id, function(error, results, fields) {
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
