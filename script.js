$(window).on('scroll',function(){
    if($(window).scrollTop()){
        $('nav').addClass('black');
    }
    else{
        $('nav').removeClass('black');
    }
})
       $(document).ready(function(){
        $('.menu h4').click(function(){
            $("nav ul").toggleClass("active")
    })
    })

    const images = [
        "./assets/home4.png",
        "./assets/home1.png"
    ];
    let currentIndex=0;
     
    function changeImage(){
        currentIndex=(currentIndex+1)%images.length;
        document.getElementById("dynamicImage").src=images[currentIndex];
    }
    setInterval(changeImage, 5000);

    $(document).ready(function() {
        let progressValue = 1000; // Set the target value for students taught
        let currentValue = 0; // Start value
        let progressBar = $(".circle-progress .progress");
        let progressText = $(".progress-number");
    
        // Function to animate the progress
        function animateProgress() {
            let progressPercent = (currentValue / progressValue) * 100;
            let offset = 314 - (314 * progressPercent / 100); // Calculate stroke-dashoffset
    
            progressBar.css("stroke-dashoffset", offset);
            progressText.text(currentValue);
    
            if (currentValue < progressValue) {
                currentValue += 10; // Increase the value gradually
                setTimeout(animateProgress, 50); // Recursively call the function to keep updating the value
            }
        }
    
        animateProgress(); // Start the animation
    });

    // Example array of teacher objects
const teachers = [
    {
        name: "John Doe",
        subject: "Digital Marketing",
        experience: "5 years experience",
        photo: "./assets/teacher4.jpg"
    },
    {
        name: "Jane Smith",
        subject: "Indian accounting",
        experience: "8 years experience",
        photo: "./assets/teacher2.jpg"
    },
    {
        name: "Michael Johnson",
        subject: "Foreign accounting",
        experience: "10 years experience",
        photo: "./assets/image5.jpg"
    }
];

// Function to render teacher cards
function renderTeacherCards() {
    const container = document.getElementById("teacher-container");
    const template = document.getElementById("teacher-card-template");

    // Loop through the teacher array and create cards
    teachers.forEach(teacher => {
        const card = template.content.cloneNode(true); // Clone template content
        
        // Populate card data
        card.querySelector(".teacher-photo").src = teacher.photo;
        card.querySelector(".teacher-name").textContent = teacher.name;
        card.querySelector(".teacher-subject").textContent = teacher.subject;
        card.querySelector(".teacher-experience").textContent = teacher.experience;

        // Append card to the container
        container.appendChild(card);
    });
}

// Render the cards on page load
document.addEventListener("DOMContentLoaded", renderTeacherCards);

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
function opencourselist(){
    window.location.href = 'course.html';
}