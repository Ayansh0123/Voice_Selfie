var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
function start(){
	document.getElementById('output').innerHTML = "";
	recognition.start();
}
function speak(){
	var synth = window.speechSynthesis; //This interface allows the web page to use the browser's text-to-speech capabilities
	speakData = "Taking selfie in 5 seconds"; //The string speakData is set to "Taking Selfie in 5 Seconds...", which will be the message spoken by the text-to-speech engine
	var utterThis = new SpeechSynthesisUtterance(speakData); //This object represents the speech that will be spoken
	camera=document.getElementById('webcam');
	synth.speak(utterThis); //The speak() method of the synth object is called, which makes the browser's text-to-speech engine speak the text provided by the utterThis object
	Webcam.attach(camera); //This will initialize the webcam and display the feed inside the specified camera element
	setTimeout(function(){
		takeSnapshot();
		save();
	}, 5000);
}
Webcam.set({
	width: 500,
	height: 500,
	image_format:'png',
	png_quality: 50
});
function takeSnapshot(){
	Webcam.snap(function(data){
		document.getElementById('selfie').innerHTML = '<img id= "image" src= "'+data+'"/>';
		console.log("Selfie Taken")
	});
}
recognition.onresult = function(event){
	var content = event.results[0][0].transcript;
	console.log("Event occurred");
	document.getElementById('output').innerHTML = content;
	if (content == 'take my selfie') {
		console.log("Taking selfie")
		speak();
	}
}

function save(){
	var link = document.createElement('a');
	link.href = document.getElementById('image').src;
	link.download = 'selfie.png';
	link.click();
}