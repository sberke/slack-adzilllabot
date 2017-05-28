exports.getBars = function (){
	// create array
	var bars = [
		'Let\'s change keys dow to the baritone,\n"Excuse me, hold on, I\'m on the phone."',
		'Rather touchy, hammerhead gaze, side sippin his beer\nDamn it, the Zombie Mack, its the one we all fear'
	];
	// return random text
	var bar = bars[Math.floor(Math.random()*bars.length)];
	return bar;
}
exports.getPic = function(){
	//create array
	// return random pic
}