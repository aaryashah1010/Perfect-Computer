const formid = document.getElementById('form-id');
const thankid = document.getElementById('thank-id');
const submitButton = document.getElementById('submit-button'); // Submit button
const inputs = document.querySelectorAll('#form-id input, #form-id textarea'); // All inputs and textareas in the form

// Function to validate the form fields
function validateForm() {
    let isValid = true;
    
    // Check each input field
    inputs.forEach(input => {
        if (input.required && input.value.trim() === '') {
            isValid = false;
        }
    });
    
    // Enable or disable the submit button based on validation
    submitButton.disabled = !isValid;
}

// Attach event listeners to validate inputs dynamically
inputs.forEach(input => {
    input.addEventListener('input', validateForm);
});

// Function to handle form submission
function handleSubmit() {
    if (!submitButton.disabled) {
        formid.style.display = 'none'; // Hide the form
        thankid.style.display = 'block'; // Show the thank you message
    } else {
        alert('Please fill out all required fields before submitting.');
    }
}

// Attach the function to the submit button
submitButton.addEventListener('click', handleSubmit);


document.addEventListener("DOMContentLoaded", function () {
    const courses = {
        "Tally": { coins: "500", duration: "3 months" },
        "Digital Marketing": { coins: "400", duration: "2 months" },
        "Xero": { coins: "600", duration: "6 months" },
        "Sage": { coins: "0", duration: "2 months" },
        "Qbook": { coins: "200", duration: "2 months" },
        "Myob": { coins: "400", duration: "2 months" },
    };

    let currentStep = null;

    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const closebtn = document.getElementById('close-btn');

    chatbotIcon.addEventListener('click', () => {
        chatbotContainer.style.display =
            chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '' ? 'block' : 'none';
        if (chatbotContainer.style.display === 'block' && currentStep === null) {
            currentStep = "greet";  // Proceed to course selection step
            processBotResponse('hi');
        }
    });

    closebtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const userMessage = chatbotInput.value.trim().toLowerCase();
        if (!userMessage) return;

        const userMessageElem = document.createElement('div');
        userMessageElem.textContent = userMessage;
        userMessageElem.className = 'user-message';
        chatbotMessages.appendChild(userMessageElem);
        chatbotInput.value = '';

        processBotResponse(userMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function processBotResponse(userMessage) {
        let botMessage = "";

        if (currentStep === "greet") {
            botMessage = `<i class="fa-solid fa-robot"></i>Hello! I can help you with course information. Which course are you interested in? Here are the available courses:<br>` +
                Object.keys(courses).map(course => `- ${course}`).join("<br>");
            currentStep = "courseSelection";
        } else if (currentStep === "courseSelection") {
            const matchingCourse = Object.keys(courses).find(course => course.toLowerCase() === userMessage);

            if (matchingCourse) {
                const course = courses[matchingCourse];
                botMessage = `<i class="fa-solid fa-robot"></i> The ${matchingCourse} course costs ${course.coins} and takes ${course.duration}.<br> Do you want to continue the conversation?`;
                currentStep = "continueConversation";
                setTimeout(() => {
                    createYesNoButtons();
                }, 1000);
            } else {
                botMessage = `<i class="fa-solid fa-robot"></i>Sorry, I couldn't find that course. Please choose from the available courses:<br>` +
                    Object.keys(courses).map(course => `- ${course}`).join("<br>");
            }
        } else if (currentStep === "continueConversation") {
            botMessage = "Invalid response. Please click 'Yes' or 'No'.";
        }

        displayBotMessage(botMessage);
    }

    function createYesNoButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px'; 
        buttonContainer.style.padding = '30px';

        const yesButton = document.createElement('button');
        yesButton.textContent = "Yes";
        yesButton.style.background = 'yellow';
        yesButton.addEventListener('click', () => {
            displayBotMessage(`<i class="fa-solid fa-robot"></i>You can contact us at +91 9434783930. Thank you!`);
            
            currentStep = null;
            setTimeout(() => {
                chatbotContainer.style.display = 'none';
                chatbotMessages.innerHTML = "";
            }, 3000);
        });

        const noButton = document.createElement('button');
        noButton.textContent = "No";
        noButton.style.background = 'green';
        noButton.addEventListener('click', () => {
            displayBotMessage(`<i class="fa-solid fa-robot"></i>Thank you for chatting with us. Have a great day!`);
            currentStep = null;

            setTimeout(() => {
                chatbotContainer.style.display = 'none';
                chatbotMessages.innerHTML = "";
            }, 2000);
        });

        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);

        chatbotMessages.appendChild(buttonContainer);
    }

    function displayBotMessage(message) {
        const botMessageElem = document.createElement('div');
        botMessageElem.innerHTML = message;
        botMessageElem.className = 'bot-message';
        chatbotMessages.appendChild(botMessageElem);
    }
});


function logout(){
    window.location.href = 'login.html';
}