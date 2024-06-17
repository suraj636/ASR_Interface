const subscriptionKey = '06799f56b5cf4b13bf82bc9d71e5c67e';
const serviceRegion = 'eastus'; // e.g., 'westus'
let recognizer;
let recognitionTimeout;
let isRecognizing = false;

/*----------------------------------------------------------------------------------------------*/
// Function to toggle visibility of an element
function toggleVisibility(elementId) 
{
    var element = document.getElementById(elementId);
    if (element.style.display === 'none') 
    {
        element.style.display = 'block';
    } 
    else 
    {
        element.style.display = 'none';
    }
}

// Function to hide an element
function hideElement(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = 'none';
}
/*----------------------------------------------------------------------------------------------*/ 
 
//Function to handle translation feedback
        function handleFeedbackSpeechToText(feedback) 
        {
            if (feedback === 'right') {
            toggleVisibility('thankYouDiv');
            hideElement('wrongFeedbackDiv');
            hideElement('AskingAboutAccuracy');
            hideElement('feedbackDiv');
            document.getElementById('thankYouDiv').style.display = 'block';

            var textfield= document.getElementById("userText");
            var accuracyFeedback_ = document.getElementById("AskingAboutAccuracy_")
            var Buttons_ = document.getElementById("feedbackDiv_");

            textfield.style.display="block";
            accuracyFeedback_.style.display="block";
            Buttons_.style.display="flex";
            }
            else if(feedback=='wrong_')
            {

            }
            else if (feedback === 'wrong') {
            toggleVisibility('wrongFeedbackDiv');
            hideElement('thankYouDiv');
            document.getElementById('userTextSpeechToText').style.color='red';
            var textarea = document.getElementById('userTextSpeechToText');
            document.getElementById('correctedTextTranscribe').value=textarea.value;
            }
        

        // Function to submit correction
        function submitCorrection() {
            var correctedSentence = document.getElementById('correctionInput').value.trim();
            if (correctedSentence) {
                // Log the corrected sentence
                console.log('Corrected Sentence:', correctedSentence);
                // Display thank you message
                document.getElementById('wrongFeedback').style.display = 'none';
                document.getElementById('thankYouDiv').style.display = 'block';
            } else {
                alert('Please enter corrections.');
            }
        }
    }

    function handleFeedbackTranslatedText(feedback) 
        {
            if (feedback === 'right') 
            {
               toggleVisibility('thankYouDiv_');
            //console.log("Right Button is clicked");
                hideElement('feedbackDiv_');
                hideElement('AskingAboutAccuracy_');
                document.getElementById('thankYouDiv_').style.display = 'block';
                hideElement('wrongFeedbackDiv_');
                document.getElementById('feedbackForTranslation').style.display='block';

                setTimeout(function() {
                location.reload(); // Reload the page
                }, 5000);
            }

            else if (feedback === 'wrong') {
            toggleVisibility('wrongFeedbackDiv_');
            hideElement('thankYouDiv_');
            document.getElementById('userText').style.color='red';
            var textarea = document.getElementById('userText');
            document.getElementById('correctedTextTranslation').value=textarea.value;
            }
        

        // Function to submit correction
        function submitCorrection() {
            var correctedSentence = document.getElementById('correctionInput').value.trim();
            if (correctedSentence) {
                // Log the corrected sentence
                console.log('Corrected Sentence:', correctedSentence);
                // Display thank you message
                document.getElementById('wrongFeedback').style.display = 'none';
                document.getElementById('thankYouDiv').style.display = 'block';
            } else {
                alert('Please enter corrections.');
            }
        }
    }

/*--------------------------------------------------------------------------------------------------*/

/*----------------------------Function to translate any language sentence into English Sentence---------------------------------------*/
    
// Function to translate text using Microsoft Translator Text API
    async function translateToEnglish(sentence) 
    {  
       
       sentence=sentence.replace("'","''")
       console.log('Request is going to be sent to api now: ',sentence)
       const url = 'https://projectaavaaztranslate.azurewebsites.net/webhooks/rest/webhook/generate_response/';
       const headers = { 'Content-Type': 'application/json' };
       const data = {
        "user_id":"cricket",
        "input_string": sentence,
        "target_lang": "en",
        "source_lang": "auto"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            const jsonString= JSON.stringify(result);
            const jsonObject = JSON.parse(jsonString);
            const responseText = jsonObject.response;
            return responseText;
            //return result.response;
        } else {
            console.error('Translation failed:', response.statusText);
            return 'Translation failed';
        }
    } catch (error) {
        console.error('Translation error:', error);
        return 'Translation failed';
    }

    }

    // Function to handle input event in the first textbox
    function handleInput() {

        console.log("Handle Input is called")

        //console.log("Function for translation into english is called...");
        const inputSentence = document.getElementById('userTextSpeechToText').value.trim();
        if (inputSentence === '') {
            document.getElementById('userText').value = '';
            return;
        }

        // Check if the input contains only English words
        if (/^[a-zA-Z\s]+$/.test(inputSentence)) {
        document.getElementById('userText').value = inputSentence;
        return;
        }
        console.log("Process started for Translating any sentence into English");
        translateToEnglish(inputSentence)
            .then(translatedSentence => {
                document.getElementById('userText').value = translatedSentence;
                splitText_();
                //console.log("You should check the second textbox for quality of translation");
            })
            .catch(error => {
                console.error('Translation error:', error);
                document.getElementById('userText').value = 'Translation failed';
            });
    }
/*----------------------------End of the above Function----------------------------------------------*/

/*-----------------------------Function to Converted the transcribed text into Buttons---------------------------------------------------------------------------*/
    // Array to store selected words
    var selectedWordsTranslation = [];
    var selectedWordsTranscript = [];

    // Function to select a word
    function selectWordTranslation(word) {
    selectedWordsTranslation.push(word);
    console.log("Selected Word : "+word);
}

function selectWordTranscribe(word) {
    selectedWordsTranscript.push(word);
    console.log("Selected Word : "+word);
}

function deselectWordTranscribe(word) {
    var index = selectedWordsTranscript.indexOf(word);
    if (index !== -1) {
        selectedWordsTranscript.splice(index, 1);
        console.log("Deselected Word : " + word);
    } else {
        console.log("Word not found in selectedWordsTranscript:", word);
    }
}

    function splitText() 
    {
        console.log("SplitText function is called to Create button out of the words inside the first text field");
        var textarea = document.getElementById('userTextSpeechToText');
        //document.getElementById('correctedTextTranscribe').value=textarea.value;
        var words = textarea.value.split(' ');
        var wordSplitDiv = document.getElementById('word-buttons');
        wordSplitDiv.innerHTML = ''; // Clear previous content

        for (var i = 0; i < words.length; i++) {
            var button = document.createElement('button');
            button.className = 'word-buttons';
            button.textContent = words[i];
            button.addEventListener('click', function() {
                 if (this.classList.contains('selected')) {
                // Button is already selected, so remove it from selectedwords
                deselectWordTranscribe(this.textContent);
                this.classList.remove('selected');
                } else {
                // Button is not selected, so add it to selectedwords
                selectWordTranscribe(this.textContent);
                this.classList.add('selected');
    }
});
            wordSplitDiv.appendChild(button);
        }
    }


    function splitText_() 
    {
        console.log("SplitText function is called to Create button out of the words inside the first text field");
        var textarea = document.getElementById('userText');
        var words = textarea.value.split(' ');
        var wordSplitDiv = document.getElementById('word-buttons_');
        wordSplitDiv.innerHTML = ''; // Clear previous content

        for (var i = 0; i < words.length; i++) {
            var button = document.createElement('button');
            button.className = 'word-buttons';
            button.textContent = words[i];
            button.addEventListener('click', function() {
                 if (this.classList.contains('selected')) {
                // Button is already selected, so remove it from selectedwords
                deselectWordTranscribe(this.textContent);
                this.classList.remove('selected');
                } else {
                // Button is not selected, so add it to selectedwords
                selectWordTranscribe(this.textContent);
                this.classList.add('selected');
    }
});
            wordSplitDiv.appendChild(button);
        }
    }

    // Function to submit correction
function submitSttCorrection() {
    // Get the corrected sentence
    var wrongFeedbackDiv = document.getElementById("wrongFeedbackDiv");
    var feedbackDiv = document.getElementById("feedbackForTranscript");
    var accuracyFeedback = document.getElementById("AskingAboutAccuracy");
    var Buttons = document.getElementById("feedbackDiv");
    var textfield= document.getElementById("userText");
    var accuracyFeedback_ = document.getElementById("AskingAboutAccuracy_")
    var Buttons_ = document.getElementById("feedbackDiv_");
    
    Buttons.style.display="none";
    accuracyFeedback.style.display="none";
    wrongFeedbackDiv.style.display = "none";
    feedbackDiv.style.display = "block";

    textfield.style.display="block";
    accuracyFeedback_.style.display="block";
    Buttons_.style.display="flex";



    var correctedSentence = document.getElementById('correctedTextTranscribe').value;
    console.log("Corrected Sentence According to user : "+correctedSentence);
    document.getElementById('userTextSpeechToText').value=correctedSentence;
    document.getElementById('userTextSpeechToText').style.color='white';
    
     var url = "https://correction-api-1.onrender.com/submit_correction";
    //var azureUrl = "https://feedbackcollection342.azurewebsites.net/submit_correction";
    console.log("URL is initialized");

    // Define the data to be sent in the request body
    var data = {
        "selected_words": selectedWordsTranscript,
        "corrected_sentence": correctedSentence
    };
    console.log("Data is initialized");

    // Send a POST request to the API endpoint with the data
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Check the response status code
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error ' + response.status);
        }
    })
    .then(data => {
        console.log("Correction submitted successfully!");
        console.log("Inserted ID:", data.inserted_id);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


    // Function to submit correction
function submitTECorrection() {
    // Get the corrected sentence
    var feedbackDiv = document.getElementById("feedbackForTranslation");
    var wrongFeedbackDiv = document.getElementById("wrongFeedbackDiv_");
    var accuracyFeedback_ = document.getElementById("AskingAboutAccuracy_")
    var Buttons_ = document.getElementById("feedbackDiv_");
    
    wrongFeedbackDiv.style.display = "none";
    feedbackDiv.style.display = "block";
    accuracyFeedback_.style.display="none";
    Buttons_.style.display="none";

    var correctedSentence = document.getElementById('correctedTextTranslation').value;
    console.log("Corrected Sentence According to user : "+correctedSentence);

    document.getElementById('userText').value=correctedSentence;
    document.getElementById('userText').style.color='white';


    setTimeout(function() {location.reload();}, 2000);//Reload the Page
    
     var url = "https://correction-api-1.onrender.com/submit_correction";
    //var azureUrl = "https://feedbackcollection342.azurewebsites.net/submit_correction";
    console.log("URL is initialized");

    // Define the data to be sent in the request body
    var data = {
        "selected_words": selectedWordsTranslation,
        "corrected_sentence": correctedSentence
    };
    console.log("Data is initialized");

    // Send a POST request to the API endpoint with the data
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Check the response status code
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error ' + response.status);
        }
    })
    .then(data => {
        console.log("Correction submitted successfully!");
        console.log("Inserted ID:", data.inserted_id);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
/*-----------------------------End of Function to Converted the transcribed text into Buttons-------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------------------------------*/


document.addEventListener("DOMContentLoaded", function() {
    const languageDropdown = document.getElementById("language-dropdown-speech");
    const voiceIconBtn = document.getElementById("voice-icon-btn");
    let isRecognizing = false;
    let recognizer;
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    let transcribeText = '';

    voiceIconBtn.addEventListener("click", function() {
        if (!isRecognizing) {
            const selectedLanguage = languageDropdown.value;
            document.getElementById('microphone-icon').classList.add('fa-beat');
            document.getElementById('microphone-icon').style.color = "black";
            voiceIconBtn.style.backgroundColor = 'white';
            voiceIconBtn.style.border = "0.3vw solid black";
            document.getElementById('microphone-icon').style.fontSize = '2vw';
        
            startRecognition();
        } else {
            stopRecognition();
            voiceIconBtn.style.border = "none"; 
        }
    });

    function startRecognition() {
        //console.log("StartRecognition is called");
        //console.log("Azure Speech SDK is called");

        const language = document.getElementById('language-dropdown-speech').value;
        document.getElementById('userTextSpeechToText').style.color = 'white';
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        speechConfig.speechRecognitionLanguage = language;
        
        startRecording();


        //Refer the documentation for automatic detection of more than two languages
        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizing = (s, e) => {
            document.getElementById('userTextSpeechToText').innerText = `${e.result.text}`;
        };

        recognizer.recognized = (s, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                const currentText = document.getElementById('userTextSpeechToText').innerText;
                transcribeText = `${e.result.text}`;
                document.getElementById('userTextSpeechToText').innerText = `${currentText}\n${e.result.text}`;
            } else {
                document.getElementById('userTextSpeechToText').innerText = transcribeText;
            }
        };

        recognizer.startContinuousRecognitionAsync();
        isRecognizing = true;
    }

    function stopRecognition() {
        if (recognizer) {
            recognizer.stopContinuousRecognitionAsync(
                () => {
                    console.log("Recognition stopped.");
                    stopRecording();
                    resetUI();
                },
                (err) => {
                    console.error("Error stopping recognition: " + err);
                    stopRecording();
                    resetUI();
                }
            );
        }
    }

    function resetUI() {
        document.getElementById('microphone-icon').classList.remove('fa-beat');
        document.getElementById('microphone-icon').style.fontSize = '1.4vw';
        voiceIconBtn.style.backgroundColor = '#333333';
        document.getElementById('microphone-icon').style.color = "white";
        isRecognizing = false;

        const accuracyFeedback = document.getElementById("AskingAboutAccuracy");
        const feedbackButtons = document.getElementById("feedbackDiv");
        accuracyFeedback.style.display = 'block';
        feedbackButtons.style.display = 'flex';
        splitText();
        handleInput();
    }

    // Function to start recording audio
    function startRecording() {
        console.log("Audio Recording is started");
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };
                mediaRecorder.onstop = handleAudioData;
                mediaRecorder.start();
            })
            .catch(error => console.error('Error accessing microphone: ', error));
    }

    // Function to handle audio data after recording is stopped
    function handleAudioData() {
        audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioChunks = []; // Clear the chunks for the next recording

        // Create a temporary anchor element for downloading
        //const url = window.URL.createObjectURL(audioBlob);
        //const a = document.createElement('a');
        //a.style.display = 'none';
        //a.href = url;
        //a.download = 'recorded_audio.wav'; // Set the file name for download
        //document.body.appendChild(a);

        // Trigger the download
        //a.click();

        // Clean up
        //window.URL.revokeObjectURL(url);
        //document.body.removeChild(a);

        // Call the function to send audio data to the API
        //sendAudioToAPI(audioBlob, transcribeText);

        sendAudioToAPI_(audioBlob, transcribeText)
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    }

    // Function to stop recording audio
    function stopRecording() {
        console.log("Recording is stopped");
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    }
    

    function sendAudioToAPI(audioBlob, transcript) {
        console.log('Audio and Transcribed text will now be sent to API');
    
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recorded_audio.wav'); // Ensure the audio file has the correct filename
        formData.append('transcript', transcript); // Correct field name

        //azure_url=https://audiotranscriptiontxtinterface.azurewebsites.net/upload
        //url=http://127.0.0.1:8000/upload
        
        fetch('https://audiotranscriptiontxtinterface.azurewebsites.net/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to upload: ' + response.statusText);
            }
        })
        .then(data => {
            console.log('Audio and transcript sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending audio and transcript:', error);
        });
    }
});


async function sendAudioToAPI_(audioBlob, transcript) {
    console.log('Latest Function for Audio Blob Storage is called')
    const url = "http://127.0.0.1:8000/upload_";
    const azure_url="https://audiotranscriptiontxtinterface.azurewebsites.net/upload";
    
    // Create a FormData object to hold the audio file and the transcript
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'audiofile.mp3'); // 'audiofile.mp3' is the name you want to give the file
    formData.append('sentence', transcript);

    try {
        const response = await fetch(azure_url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //console.log('Success:', data);
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

