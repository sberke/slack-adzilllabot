'use strict'; 
var adzilla = require('./adzilla.js');
const express = require('express'); 
const bodyParser = require('body-parser'); 
const request = require('request'); 

const app = express(); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const server = app.listen(3000, () => 
	{ console.log('Express server   listening on port %d in %s mode', server.address().port,   app.settings.env);
	});

// Auth
app.get('/slack', function(req, res){ 
  if (!req.query.code) { // access denied
    res.redirect('http://www.chickenbit.com/');
    return;
  }

  let data = {form: { 
    client_id: process.env.SLACK_CLIENT_ID, 
    client_secret: process.env.SLACK_CLIENT_SECRET, 
    code: req.query.code 
  }}; 
  request.post('https://slack.com/api/oauth.access', data, function (error, response, body) { 
    if (!error && response.statusCode == 200) { 
    	// get an auth token
	    let token = JSON.parse(body).access_token; // Auth token 

	    // Get the team domain name to redirect to the team URL after auth
		request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				if(JSON.parse(body).error == 'missing_scope') {
				    res.send('AdzillaBot is in the house!');
				} else {
				    let team = JSON.parse(body).team.domain;
				    res.redirect('http://' +team+ '.slack.com');
				}
			}
		});
    } ///...
  });
});
/* *******************************
/* Slash-AdzillaBot Mack Command
/* ***************************** */

app.get('/', (req, res) => {
  handleQueries(req.query, res);
});

app.post('/', (req, res) => {
  handleQueries(req.body, res);
});
/*
app.post('/', (req, res) => { 
  let text = req.body.text; 
  // bot at work
  if(! /^mack$/.test(text)) {  
	let data = { 
	  response_type: 'in_channel', // public to the channel 
	  text: adzilla.getBars()
	}
	res.json(data);
    return; 
  }else{
    res.send('That\'s not it.');  
    return; 
  }
});
*/
/*
handle that!!
*/
function handleQueries(q, res){
	if(q.token !== process.env.SLACK_VERIFICATION_TOKEN) {
		// the request is NOT coming from Slack!
		return;
	}
	if(! /^mack$/.test(text)) {  
		let data = { 
		  	response_type: 'in_channel', // public to the channel 
		  	text: adzilla.getBars()
		}
		  	/*
		  	attachments:[ { 
		    	image_url: 'https://http.cat/302.jpg' 
		  	} ]}; 
		  	*/
		res.json(data);
	    return; 
	}else{
	    res.send('That\'s not it.');  
	    return; 

		let data = {
      		response_type: 'ephemeral', // private message
      		text: 'Just send /mack\nNo parameters needed.',
      		attachments:[
      			{
        			text: 'use the /mack command.',
      			}
    	]};
    	res.json(data);
	}
}
