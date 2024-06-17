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
            /*document.getElementById("feedbackDiv").style.display = "none";
            if (feedback === "right") {
                document.getElementById("smileyDiv").style.visibility = "visible";
                document.getElementById("wrongFeedback").style.visibility = "hidden";
            } else {
                document.getElementById("smileyDiv").style.visibility = "hidden";
                document.getElementById("wrongFeedback").style.visibility = "visible";
            }*/

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
            /*document.getElementById("feedbackDiv").style.display = "none";
            if (feedback === "right") {
                document.getElementById("smileyDiv").style.visibility = "visible";
                document.getElementById("wrongFeedback").style.visibility = "hidden";
            } else {
                document.getElementById("smileyDiv").style.visibility = "hidden";
                document.getElementById("wrongFeedback").style.visibility = "visible";
            }*/

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
/*-----------------------Function to translate Text----------------------------------------*/


        // Function to translate text
    function translateText() 
    {
    var userText = document.getElementById('userText').value;
    var selectedLanguage = document.getElementById('languageDropdown').value;

    var formData = new FormData();
    formData.append('text', userText);
    formData.append('language', selectedLanguage);

    fetch('http://127.0.0.1:8000/translate/', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var translatedTextElement = document.getElementById('translatedText');
        //var feedbackButtonsElement = document.getElementById('feedbackDiv');
        if (translatedTextElement) 
        {
            translatedTextElement.innerText = data.translated_text;
            //if (feedbackButtonsElement) {
                //feedbackButtonsElement.style.visibility = 'visible';
            //} else {
              //  console.error('FeedbackButtons element not found');
            //}
        }
        else 
        {
            console.error('TranslatedText element not found');
        }

        
      /*
        const sentence = data.translated_text;;
        const sentenceElement = document.querySelector(".sentence");
        const rightBtn = document.getElementById("rightBtn");
        const wrongBtn = document.getElementById("wrongBtn");
        const wordButtonsContainer = document.querySelector(".word-buttons");
        //const messageElement = document.querySelector(".message");
        //const submitBtn = document.getElementById("submitBtn");
        //const correctionInput = document.getElementById("correctionInput");
        const words = sentence.split(" ");
        let selectedWords = [];

    rightBtn.addEventListener("click", () => {
      //messageElement.textContent = "";
      //wordButtonsContainer.innerHTML = "";
      //submitBtn.style.display = "none";
      //correctionInput.style.display = "none";
      ///const smileyElement = document.createElement("div");
      //smileyElement.classList.add("smiley");
      //smileyElement.textContent = "😊";
      //wordButtonsContainer.appendChild(smileyElement);

            document.getElementById("smileyDiv").style.visibility = "visible";
            document.getElementById("wrongFeedback").style.visibility = "hidden";
    });

    wrongBtn.addEventListener("click", () => {

     document.getElementById("smileyDiv").style.visibility = "hidden";
     document.getElementById("wrongFeedback").style.visibility = "visible";
     // messageElement.textContent = "Which part you find wrong?";
      wordButtonsContainer.innerHTML = "";
      //submitBtn.style.display = "block";
      //correctionInput.style.display = "block";
      selectedWords = [];
      words.forEach((word) => {
        const wordButton = document.createElement("button");
        wordButton.textContent = word;
        wordButton.addEventListener("click", () => {
          wordButton.classList.toggle("selected");
          if (wordButton.classList.contains("selected")) {
            selectedWords.push(word);
          } else {
            selectedWords = selectedWords.filter(w => w !== word);
          }
          console.log("Selected words:", selectedWords);
        });
        wordButtonsContainer.appendChild(wordButton);
      });
    });

   submitBtn.addEventListener("click", () => {
      const correctedSentence = correctionInput.value.trim();
      if (correctedSentence) {
        console.log("Submitted words:", selectedWords);
        console.log("Corrected sentence:", correctedSentence);
        // Add your code here to handle the submitted words and corrected sentence
      } else {
        alert("Please enter the correct sentence.");
      }
    });*/
        
    })
    .catch(error => {
        console.error('There was an error!', error);
        var translatedTextElement = document.getElementById('translatedText');
        if (translatedTextElement) {
            translatedTextElement.innerText = 'Translation Error: ' + error.message;
        } else {
            console.error('TranslatedText element not found');
        }
    });
}


        // Event listener to hide feedback options when refreshing the page
        window.addEventListener('beforeunload', function(event) {
            // Hide all feedback options
            document.getElementById('feedbackDiv').style.display = 'none';
            document.getElementById('smileyDiv').style.display = 'none';
            document.getElementById('wrongFeedback').style.display = 'none';
            document.getElementById('thankYouDiv').style.display = 'none';
        });

/*--------------------------End of function's logic to translate Text---------------------------------*/


/*----------------------------Function to translate any language sentence into English Sentence---------------------------------------*/
    
// Function to translate text using Microsoft Translator Text API
    async function translateToEnglish(sentence) 
    {  
        /*
        //console.log("Microsoft Translator is called for translating purpose");
        const subscriptionKey = '00357ab6e2214c489423004818d93e44'; // Replace with your subscription key
        const endpoint = 'https://api.cognitive.microsofttranslator.com/';
        const path = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en'; // Translate to English
        const region= 'eastus'
        

    try {
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Ocp-Apim-Subscription-Region': region
            },
            body: JSON.stringify([{ 'text': sentence }])
        });

        if (response.ok) {
            const result = await response.json();
            return result[0].translations[0].text;
        } else {
            console.error('Translation failed:', response.statusText);
            return 'Translation failed';
        }
    } catch (error) {
        console.error('Translation error:', error);
        return 'Translation failed';
    }

     */
    

       console.log('Request is going to be sent to api now')
       const url = 'https://projectaavaaztranslate.azurewebsites.net/webhooks/rest/webhook/generate_response/';
       const headers = { 'Content-Type': 'application/json' };
       const data = {
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

    console.log("Everything is good now")

    }

    // Function to handle input event in the first textbox
    function handleInput() {

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
        //console.log("Process started for Translating any sentence into English");
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


    setTimeout(function() {location.reload();}, 5000);//Reload the Page
    
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

document.addEventListener("DOMContentLoaded", function() 
{
    const languageDropdown = document.getElementById("language-dropdown-speech");
    const voiceIconBtn = document.getElementById("voice-icon-btn");

    voiceIconBtn.addEventListener("click", function() 
    {
        const selectedLanguage = languageDropdown.value ;
         document.getElementById('microphone-icon').classList.add('fa-beat');
         document.getElementById('microphone-icon').style.color="black";
         voiceIconBtn.style.backgroundColor='white';
         document.getElementById('microphone-icon').style.fontSize = '2vw';
         startRecording(selectedLanguage);

        // Deactivate the animation after 5 seconds
        setTimeout(function() {
            document.getElementById('microphone-icon').classList.remove('fa-beat');
            document.getElementById('microphone-icon').style.fontSize = '1.4vw';
            voiceIconBtn.style.backgroundColor='#333333';
            document.getElementById('microphone-icon').style.color="white";
        }, 7000);
    });

    //handleInput();
    // Attach input event listener to the first textbox
    //document.getElementById('userTextSpeechToText').addEventListener('input', handleInput);


    //Calling the function to create Buttons out of the words present in the text-area
    //splitText();
    //document.getElementById('userText').addEventListener('input', splitText);

    
});

/*------------------------------------------These are for functionality purpose----------------*/
function startRecording(selectedLanguage) 
{
    //console.log("StartRecordingFunction is called..");
    //Same variable printed the one we have selected
    console.log("Selected Language : "+ selectedLanguage);


    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        console.log("Audio Recording is started");
        const audioContext = new AudioContext();
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const reader = new FileReader();
            reader.readAsArrayBuffer(audioBlob);

            reader.onloadend = () => {
                const audioBuffer = reader.result;
                audioContext.decodeAudioData(audioBuffer, (decodedData) => {
                    //console.log("Recorded Audio is now sent for proper wav encoding..");
                    const wavData = encodeWav(decodedData);
                    //console.log("WAV encoded audio is now received....");
                    const wavBlob = new Blob([wavData], { type: 'audio/wav' });

                    /*
                    const audioUrl = URL.createObjectURL(wavBlob);

                    const audio = document.getElementById("audioPlayer");
                    audio.src = audioUrl;
                    audio.controls = true;

                    const downloadLink = document.createElement("a");
                    downloadLink.href = URL.createObjectURL(wavBlob);
                    downloadLink.download = 'recorded_audio.wav';
                    downloadLink.textContent = 'Download Audio';
                    document.body.appendChild(downloadLink);

                    console.log("You can now download and play the audio....");

                    //Same variable is printing different language code
                    console.log("Selected Language : "+ selectedLanguage);
                    */

                    //console.log(type(selectedLanguage));

                    processAudio(wavBlob, selectedLanguage);

                });
            };
        });

        mediaRecorder.start();

        setTimeout(() => {
            console.log("Audio Recording is stopped");
            mediaRecorder.stop();
        }, 7000); // Change recording duration here (in milliseconds)
    })
    .catch(err => {
        console.error("Error: " + err);
    });
}


/*-----------------------------------------Newly Added Code-------------------------------------------------------------------------*/

async function processAudio(audioFile, languageCode) 
{
    console.log("Process Audio is called");
    //const render_url ="https://speechtotext-api.onrender.com/process_audio_/";
    const azure_url = "https://speechtotext321.azurewebsites.net/process_audio_/";
    const r_url="https://audio-text-api.onrender.com/process_audio_/";

    //console.log("API Url is initialized");
    //console.log("Audio is initialized and the details are:");
    //console.log("Language-Code: " + languageCode);

    const url = "http://127.0.0.1:8000/process_audio_/";
    const render_url ="https://speech-to-text-azure.onrender.com/process_audio_/"

    try 
    {
        const formData = new FormData();
        formData.append('input_file', audioFile);

        const params = new URLSearchParams();
        params.append('target_sr', 8000);
        params.append('language_code', languageCode);

        console.log(languageCode);

        const response = await fetch(render_url + "?" + params.toString(), {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            var text = await response.text();
            var accuracyFeedback = document.getElementById("AskingAboutAccuracy");
            var feedbackButtons = document.getElementById("feedbackDiv");
            text = text.replace(/"/g, '');
            document.getElementById('userTextSpeechToText').value = text;
            accuracyFeedback.style.display='block';
            feedbackButtons.style.display='flex';
            console.log("Transcription:", text);
            splitText();
            handleInput();
        } else {
            console.log("Error:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

/*-----------Function for encoding the recorded audio into wav format -----------*/

function encodeWav(audioBuffer) {
    //console.log("Wav Encoding function is called....");
    const numOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChannels * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    // RIFF identifier
    writeString(view, 0, 'RIFF');
    // file length
    view.setUint32(4, 36 + audioBuffer.length * 2, true);
    // RIFF type
    writeString(view, 8, 'WAVE');
    // format chunk identifier
    writeString(view, 12, 'fmt ');
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // channel count
    view.setUint16(22, numOfChannels, true);
    // sample rate
    view.setUint32(24, audioBuffer.sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, audioBuffer.sampleRate * 4, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, numOfChannels * 2, true);
    // bits per sample
    view.setUint16(34, 16, true);
    // data chunk identifier
    writeString(view, 36, 'data');
    // data chunk length
    view.setUint32(40, audioBuffer.length * 2, true);

    // write the PCM samples
    floatTo16BitPCM(view, 44, audioBuffer.getChannelData(0));
    console.log("WAV Encoding is completed...");

    return view;
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function floatTo16BitPCM(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}

/*-----------------------------End of Function-----------------------------*/











        /*


    const sentence = "मुझे आपका खून पीना है";
    const sentenceElement = document.querySelector(".sentence");
    const rightBtn = document.getElementById("rightBtn");
    const wrongBtn = document.getElementById("wrongBtn");
    const wordButtonsContainer = document.querySelector(".word-buttons");
    const messageElement = document.querySelector(".message");
    const submitBtn = document.getElementById("submitBtn");
    const correctionInput = document.getElementById("correctionInput");
    const words = sentence.split(" ");
    let selectedWords = [];

    rightBtn.addEventListener("click", () => {
      messageElement.textContent = "";
      wordButtonsContainer.innerHTML = "";
      submitBtn.style.display = "none";
      correctionInput.style.display = "none";
      const smileyElement = document.createElement("div");
      smileyElement.classList.add("smiley");
      smileyElement.textContent = "😊";
      wordButtonsContainer.appendChild(smileyElement);
    });

    wrongBtn.addEventListener("click", () => {
      messageElement.textContent = "Which part you find wrong?";
      wordButtonsContainer.innerHTML = "";
      submitBtn.style.display = "block";
      correctionInput.style.display = "block";
      selectedWords = [];
      words.forEach((word) => {
        const wordButton = document.createElement("button");
        wordButton.textContent = word;
        wordButton.addEventListener("click", () => {
          wordButton.classList.toggle("selected");
          if (wordButton.classList.contains("selected")) {
            selectedWords.push(word);
          } else {
            selectedWords = selectedWords.filter(w => w !== word);
          }
          console.log("Selected words:", selectedWords);
        });
        wordButtonsContainer.appendChild(wordButton);
      });
    });

    submitBtn.addEventListener("click", () => {
      const correctedSentence = correctionInput.value.trim();
      if (correctedSentence) {
        console.log("Submitted words:", selectedWords);
        console.log("Corrected sentence:", correctedSentence);
        // Add your code here to handle the submitted words and corrected sentence
      } else {
        alert("Please enter the correct sentence.");
      }
    });
  </script>



        */