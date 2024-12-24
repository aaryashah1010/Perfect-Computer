document.addEventListener('DOMContentLoaded', () => {
    // Array to hold reviews
    const reviews = [
        {
            name: "Sheetal Thakkar",
            review: "I have recently completed a tally course in this classes.Their teaching method is super",
            rating: 5,
            image: "./assets/home4.png"
        },
        {
            name: "Shivam Sagar",
            review: "All the faculties are really nice ...My all doubts are cleared",
            rating: 5,
            image: "./assets/home4.png"
        }
    ];

    const carouselContent = document.getElementById('carousel-content');
    const reviewForm = document.getElementById('review-form');
    const addReviewBtn = document.getElementById('add-review-btn');
    const closebtn=document.getElementById('close-btn');

    // Render reviews dynamically
    function renderReviews() {
        carouselContent.innerHTML = reviews.map((review, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <div class="testimonial4_slide">
                    <img src="${review.image}" class="img-circle img-responsive" alt="User Image">
                    <p>${review.review}</p>
                    <div class="rating text-warning">
                        ${'<i class="fa fa-star"></i>'.repeat(review.rating)}
                    </div>
                    <h4>${review.name}</h4>
                </div>
            </div>
        `).join('');
    }

    // Toggle review form visibility
    addReviewBtn.addEventListener('click', () => {
        reviewForm.style.display = reviewForm.style.display === 'none' ? 'block' : 'none';
        reviewForm.style.position='relative';
        reviewForm.style.marginTop='-100px';
        reviewForm.style.zIndex='2';
    });
    closebtn.addEventListener('click',() =>{
        reviewForm.style.display = reviewForm.style.display === 'block'?'none': 'block';
    })
    // Add a new review
    document.getElementById('new-review-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const review = document.getElementById('review').value.trim();
        const rating = parseInt(document.getElementById('rating').value);

        reviews.push({ name, review, rating, image: "./assets/home4.png" });

        
        renderReviews();
        reviewForm.style.display = 'none';
        e.target.reset();
        alert('Your review has been added!');
    });

    renderReviews();  
});
