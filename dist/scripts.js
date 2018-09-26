// Initialize Synthesis API
const speechSynth = window.speechSynthesis;

// Get DOM Elements
const form = document.querySelector('#form-text');
const textInput = document.querySelector('textarea');
const pitch = document.querySelector('#pitch');
const curPitch = document.querySelector('#current-pitch');
const rate = document.querySelector('#rate');
const curRate = document.querySelector('#current-rate');
const select = document.querySelector('#voice-select');
const btnSubmit = document.querySelector('button');
const speakingText = document.querySelector('#speaking');

// Get Voices
let voices = [];

function getVoices() {
	voices = speechSynth.getVoices();
	voices.forEach(voice => {
		const option = document.createElement('option');
		option.textContent = voice.name + ' ' + voice.lang;
		// Set option attributes
		option.setAttribute('data-name', voice.name);
		option.setAttribute('data-lang', voice.lang);
		select.appendChild(option);
	});
}

getVoices();
if(typeof speechSynth !== undefined && speechSynth.onvoiceschanged !== undefined) {
	speechSynth.onvoiceschanged = getVoices;
}

// Speak functio
const speak = () => {
	// if speaking
	if(speechSynth.speaking) {
		console.error('Currently speaking..');
		return;
	}

	if(textInput.value !== '') {
		// if submitted with text
		speakingText.textContent = 'Speaking..';

		const textToSpeak = new SpeechSynthesisUtterance(textInput.value);

		// On speak end
		textToSpeak.onend = e => {
			console.log('Done speaking..', speakingText.textContent = '');
		}
		// On speak error
		textToSpeak.onerror = e => {
			console.error('An error occurred');
		}

		// Selected Voice
		const selectedVoice = select.selectedOptions[0].getAttribute('data-name');

		// Check if selectedVoice matches voiceList
		voices.forEach(voice => {
			if(voice.name === selectedVoice) {
				textToSpeak.voice = voice
			}			
		});

		// Set Rate and Pitch
		textToSpeak.rate = rate.value;
		textToSpeak.pitch = pitch.value;

		// Speak
		speechSynth.speak(textToSpeak);
	}
}

// EVENT LISTENERS

// Form Submit
form.addEventListener('submit', e => {
	e.preventDefault();
	speak();
	textInput.blur();
})

// On Pitch/Rate slider change
rate.addEventListener('change', e => curRate.textContent = rate.value);
pitch.addEventListener('change', e => curPitch.textContent = pitch.value);

// On Select Language change
select.addEventListener('change', e => speak());