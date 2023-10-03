let currentSlide = 0;
const nextButton = document.querySelector(".next-btn");
const carouselIndicators = document.querySelectorAll(
  ".carousel-indicators li"
);
let redirectTimeout; // Declare a variable to store the timeout ID

$("#myCarousel").carousel({
  interval: false, // Disable automatic sliding
});

// Changing with the next button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("next-btn")) {
    if (currentSlide === 2) {
      // If on the last slide, redirect
      window.location.href = "../views/Login.html";
    } else {
      currentSlide = (currentSlide + 1) % 3; // Assuming 3 slides in total
      $("#myCarousel").carousel(currentSlide); // Move the Bootstrap carousel to the next slide
      updateBtnText();
    }
  }
});

// Changing with the indicators
carouselIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    updateBtnText();
  });
});

function updateBtnText() {
  $("#myCarousel").carousel(currentSlide); // Move the Bootstrap carousel to the next slide
  if (currentSlide === 2) {
    nextButton.textContent = "Get Started";
  } else {
    nextButton.textContent = "Next";
  }
}
