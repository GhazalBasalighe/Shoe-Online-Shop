let currentSlide = 0;
const nextButton = document.querySelector(".next-btn");
const carouselIndicators = document.querySelectorAll(
  ".carousel-indicators li"
);
let redirectTimeout; // Declare a variable to store the timeout ID

//changing with the next button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("next-btn")) {
    currentSlide = (currentSlide + 1) % 3; // Assuming 3 slides in total
    $("#myCarousel").carousel(currentSlide); // Move the Bootstrap carousel to the next slide
    goToNextSlide();
  }
});

//changing with the indicators
carouselIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index;
    goToNextSlide();
  });
});

function goToNextSlide() {
  $("#myCarousel").carousel(currentSlide); // Move the Bootstrap carousel to the next slide
  if (currentSlide === 2) {
    nextButton.textContent = "Get Started";

    // Set a new timeout for redirection after 4 seconds
    setTimeout(function () {
      window.location.href = "../views/Login.html";
    }, 500);
  } else {
    nextButton.textContent = "Next";
  }
}
