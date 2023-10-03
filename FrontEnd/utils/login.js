const passwordToggle = document.querySelector(".show-password");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
let submitOk = false;

// -----------SHOW/HIDE PASSWORD------------
passwordToggle.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

password.addEventListener("input", buttonToggle);
email.addEventListener("input", buttonToggle);
//oninput event occurs immediately after the value of an element has changed
//while onchange occurs when the element loses focus, after the content has been changed

const signInBtn = document.querySelector(".sign-in");

// -----------REMOVE DISABLED FROM BUTTON------------
function buttonToggle() {
  if (email.value.trim() !== "" && password.value.trim() !== "") {
    signInBtn.removeAttribute("disabled");
    signInBtn.classList.remove("bg-[#6f7174]", "cursor-not-allowed");
    signInBtn.classList.add("bg-black", "cursor-pointer");
    submitOk = true;
  } else {
    signInBtn.setAttribute("disabled", "disabled");
    signInBtn.classList.remove("bg-black", "cursor-pointer");
    signInBtn.classList.add("bg-[#6f7174]", "cursor-not-allowed");
  }
}
// -----------BACK TO PREVIOUS PAGE------------
const backArrow = document.querySelector(".back-arrow");
backArrow.addEventListener(
  "click",
  () => (window.location.href = "../views/slideShow.html")
);

signInBtn.addEventListener("click", () => {
  if (submitOk) ValidateEmail();
});

// -----------EMAIL VALIDATION------------
function ValidateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    return true;
  }
  TODO: alert("You have entered an invalid email address!");
  //REPLACE TOAST
  return false;
}

// -----------CHECKBOX CHECKED?------------
const checkbox = document.querySelector("#rememberMe");
console.log(checkbox.checked); //true false
console.log(checkbox.value); //on off
if (checkbox.checked) {
  //fetch request
  TODO: console.log("hi");
}
