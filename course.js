// Load or initialize global variables
const courses = [
    {
        id: 1,
        title: "Tally",
        description: "Master accounting and inventory management with Tally.",
        price: 500,
        videos: [
            "Introduction to Tally",
            "Creating Company Profiles",
            "Managing Inventory in Tally",
            "Generating Financial Reports",
            "Advanced Accounting Features"
        ]
    },
    {
        id: 2,
        title: "Digital Marketing",
        description: "Grow your skills and master the digital marketing landscape.",
        price: 0,
        videos: [
            "Introduction to Digital Marketing",
            "SEO Basics",
            "Content Marketing Strategies",
            "Social Media Marketing Techniques",
            "Email Marketing and Automation"
        ]
    },
    {
        id: 3,
        title: "XERO",
        description: "Streamline your accounting processes with XERO.",
        price: 200,
        videos: [
            "Introduction to XERO",
            "Setting Up Your XERO Account",
            "Managing Invoices and Payments",
            "Tracking Expenses in XERO",
            "Financial Reporting with XERO"
        ]
    },
    {
        id: 4,
        title: "MYOB",
        description: "Simplify business accounting with MYOB.",
        price: 0,
        videos: [
            "Getting Started with MYOB",
            "Creating Invoices and Quotes",
            "Managing Expenses",
            "Generating Financial Reports",
            "Payroll and Employee Management"
        ]
    },
    {
        id: 5,
        title: "QBOOKS",
        description: "Learn how to manage finances with QuickBooks.",
        price: 100,
        videos: [
            "Introduction to QuickBooks",
            "Setting Up Your QuickBooks Account",
            "Tracking Income and Expenses",
            "Generating Financial Statements",
            "Budgeting with QuickBooks"
        ]
    },
    {
        id: 6,
        title: "SAGE",
        description: "Discover powerful tools for managing your business with SAGE.",
        price: 300,
        videos: [
            "Getting Started with SAGE",
            "Creating and Managing Transactions",
            "Inventory Management in SAGE",
            "Generating Financial Reports",
            "Advanced SAGE Features"
        ]
    }
];

const courseDetailsSection = document.getElementById("course-details-section");
courseDetailsSection.style.display='none';
let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
let progress = JSON.parse(localStorage.getItem("progress")) || {};
let coins = JSON.parse(localStorage.getItem("coins")) || 1000;

// Save initial coins if not already set
if (!localStorage.getItem("coins")) {
    localStorage.setItem("coins", JSON.stringify(coins));
}

// Render courses dynamically
function renderCourses(coursesToRender) {
    const container = document.getElementById("course-container");
    container.innerHTML = ""; // Clear container before rendering

    if (coursesToRender.length === 0) {
        container.innerHTML = `<p>No courses available. Try adjusting your filters or search.</p>`;
        return;
    }

    coursesToRender.forEach((course) => {
        const card = document.createElement("div");
        card.className = "course-card";
        const isEnrolled = enrolledCourses.includes(course.id);

        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>${course.price === 0 ? "Free" : `Coins: ${course.price}`}</strong></p>
            <button id="enroll-btn-${course.id}" onclick="handleEnroll(${course.id}, ${course.price})" 
                ${isEnrolled ? 'disabled style="background-color:green;"' : ""}>
                ${isEnrolled ? "Enrolled" : (course.price === 0 ? "Enroll" : "Buy with Coins")}
            </button>
            <button id="open-btn-${course.id}" onclick="openCourse(${course.id})" 
                style="display: ${isEnrolled ? "inline-block" : "none"}">Open Course</button>
        `;
        container.appendChild(card);
    });

    updateCoinsDisplay(); // Update coins display
}

// Handle enrollment or purchase
function handleEnroll(id, price) {
    if (enrolledCourses.includes(id)) {
        alert("You are already enrolled in this course!");
        return;
    }

    if (price === 0) {
        alert("You have successfully enrolled in the course!");
        enrolledCourses.push(id);
        saveToLocalStorage("enrolledCourses", enrolledCourses);
        updateEnrollButton(id);
    } else if (coins >= price) {
        const confirmPurchase = confirm(`This course costs ${price} coins. Do you want to purchase it?`);
        if (confirmPurchase) {
            coins -= price;
            saveToLocalStorage("coins", coins);
            enrolledCourses.push(id);
            saveToLocalStorage("enrolledCourses", enrolledCourses);
            updateEnrollButton(id);
            updateCoinsDisplay();
            alert("You have successfully purchased the course!");
        }
    } else {
        alert("You don't have enough coins to purchase this course.");
    }
}

// Update the "Enroll" button to "Enrolled" and show "Open Course" button
function updateEnrollButton(id) {
    document.getElementById(`enroll-btn-${id}`).disabled = true;
    document.getElementById(`enroll-btn-${id}`).style.backgroundColor = "green";
    document.getElementById(`enroll-btn-${id}`).innerText = "Enrolled";
    document.getElementById(`open-btn-${id}`).style.display = "inline-block";
}

// Update the coins display
function updateCoinsDisplay() {
    document.getElementById("coins-button").innerText = coins;
}

// Open course content
function openCourse(courseId) {
    const course = courses.find(c => c.id === courseId);

    if (!enrolledCourses.includes(courseId)) {
        alert("You need to enroll in this course to access it!");
        return;
    }

    const courseContainer = document.getElementById("course-container");
  
    const detailsContainer = document.getElementById("course-details-content");

    const completed = progress[courseId] || 0;
    const total = course.videos.length;

    detailsContainer.innerHTML = `
        <button id="back-btn" class="btn" onclick="goBack()">Back to Courses</button>
        <h2>${course.title}</h2>
        <ul class="video-list">
            ${course.videos.map((video, index) => {
                const isCompleted = index < completed;
                const isNext = index === completed;

                return `
                    <li ${isNext ? 'style="background-color:yellow;"' : ''}>
                        <input 
                            type="checkbox" 
                            ${isCompleted ? "checked disabled" : ""}
                            onchange="markCompleted(${courseId}, ${index})"
                            ${isNext ? 'style="border:2px solid orange;"' : ''}
                        />
                        <label>${video}</label>
                    </li>
                `;
            }).join("")}
        </ul>
        <progress value="${completed}" max="${total}"></progress>
        <p>${completed}/${total} Videos Completed</p>
        ${completed === total ? "<p>🎉 Course Completed! 🎉</p>" : ""}
        <button id="reset-btn" class="btn" onclick="resetProgress(${courseId})">Reset Progress</button>
    `;

    courseContainer.style.display = "none";
    courseDetailsSection.style.display = "block";
}

// Function to return to the course list view
function goBack() {
    document.getElementById("course-details-section").style.display = "none";
    document.getElementById("course-container").style.display = "flex";
}

// Function to track progress in order
// Function to track progress in order
function markCompleted(courseId, index) {
    if (!enrolledCourses.includes(courseId)) {
        alert("You need to enroll in this course to track progress!");
        return;
    }

    const course = courses.find(c => c.id === courseId);
    const completed = progress[courseId] || 0;

    // Allow ticking the current video only if previous videos are completed
    if (index > completed) {
        alert("You must complete previous videos before marking this one as completed.");
        return;
    }

    // Allow ticking the current video if the previous videos are completed
    if (index === completed) {
        progress[courseId] = Math.max(progress[courseId] || 0, index + 1);
        saveToLocalStorage("progress", progress);
        openCourse(courseId);
    }
}


// Function to reset progress
function resetProgress(courseId) {
    if (!enrolledCourses.includes(courseId)) {
        alert("You need to enroll in this course to reset progress!");
        return;
    }

    progress[courseId] = 0;
    saveToLocalStorage("progress", progress);
    openCourse(courseId);
}

// Search courses dynamically
function searchCourses() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchQuery));
    renderCourses(filteredCourses);
}

// Sort courses based on selected option
function sortCourses() {
    const sortOption = document.getElementById("sort-select").value;
    let sortedCourses = [...courses];

    if (sortOption === "title-asc") {
        sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "title-desc") {
        sortedCourses.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "price-asc") {
        sortedCourses.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
        sortedCourses.sort((a, b) => b.price - a.price);
    }
    renderCourses(sortedCourses);
}

// Filter courses by free or paid
function filterCourses() {
    const filterOption = document.getElementById("filter-select").value;
    let filteredCourses = courses;

    if (filterOption === "free") {
        filteredCourses = courses.filter(course => course.price === 0);
    } else if (filterOption === "paid") {
        filteredCourses = courses.filter(course => course.price > 0);
    }

    renderCourses(filteredCourses);
}

// Save to localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to reset localStorage and revert all courses to initial state
function resetAllData() {
    // Reset enrolled courses: Empty the enrolled courses list
    enrolledCourses = [];
    saveToLocalStorage("enrolledCourses", enrolledCourses);

    // Reset progress: Clear all progress data
    progress = {};
    saveToLocalStorage("progress", progress);

    // Reset coins (optional, you can set a specific amount or leave as is)
    coins = 1000; // Set to initial amount or any value you like
    saveToLocalStorage("coins", coins);

    // Re-render the courses and update the UI
    renderCourses(courses);

    // Notify the user
    alert("All data has been reset. You need to enroll in courses again.");
}

// Initial render
renderCourses(courses);


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