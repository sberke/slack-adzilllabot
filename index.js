'use strict'; 
var adzilla = require('./adzilla.js');
const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express(); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
const server = app.listen(3000, () => 
	{ console.log('Express server   listening on port %d in %s mode', server.address().port,   app.settings.env);
	});


app.post('/', (req, res) => { 
  let text = req.body.text; 
  // implement your bot here ... 
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
  }
});

