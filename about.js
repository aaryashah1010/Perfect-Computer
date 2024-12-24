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

    chatbotIcon.addEventListener('click', () => {
        chatbotContainer.style.display =
            chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '' ? 'block' : 'none';
            if (chatbotContainer.style.display === 'block' && currentStep === null) {
               
                currentStep = "greet";  // Proceed to course selection step
                processBotResponse('hi');
            }
    });

    function sendMessage() {
        
        const userMessage = chatbotInput.value.trim().toLowerCase();
        if (!userMessage) return;

        const userMessageElem = document.createElement('div');
        userMessageElem.textContent = userMessage;
        userMessageElem.style.textAlign = 'right';
        chatbotMessages.appendChild(userMessageElem);

        chatbotInput.value = '';

        processBotResponse(userMessage);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function processBotResponse(userMessage) {
        let botMessage = "";

        if (currentStep==="greet") {
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
                botMessage = ` <i class="fa-solid fa-robot"></i>Sorry, I couldn't find that course. Please choose from the available courses:<br>` +
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
        buttonContainer.style.gap = '10px'; // Space between buttons
        buttonContainer.style.padding = '30px';
    
        const yesButton = document.createElement('button');
        yesButton.textContent = "Yes";
        yesButton.style.background = 'yellow';
        yesButton.addEventListener('click', () => {
            displayBotMessage(`<i class="fa-solid fa-robot"></i>You can contact us at +91 9434783930. Thank you!`);
            
            // Reset the chatbot process
            currentStep = null;
        
            // Close the chatbot container after a short delay
            setTimeout(() => {
                chatbotContainer.style.display = 'none';
                chatbotMessages.innerHTML = "";
            }, 3000);
        });
        
     
    
        const noButton = document.createElement('button');
        noButton.textContent = "No";
        noButton.style.background='green';
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
        botMessageElem.style.textAlign = 'left';
        chatbotMessages.appendChild(botMessageElem);
    }

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    const closebtn=document.getElementById('close-btn');
closebtn.addEventListener('click' , () =>{
    chatbotContainer.style.display = 'none';
});
});
function logout(){
    window.location.href = 'login.html';
}
function opencourselist(){
    window.location.href='contact.html';
}
