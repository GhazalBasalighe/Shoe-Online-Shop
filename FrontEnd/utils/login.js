const passwordToggle = document.querySelector(".show-password");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formElem = document.querySelector("#login-form");

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
email.addEventListener("input", autoFill);
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
// -----------AUTOFILL------------
async function autoFill() {
  // Get the entered email from the email input field
  const enteredEmail = email.value.trim();

  if (enteredEmail !== "") {
    try {
      // Make a GET request to fetch user data by email
      const request = await fetch(
        `http://localhost:3000/users?email=${enteredEmail}`
      );
      const userData = await request.json();

      // Check if a user with the entered email was found
      if (Array.isArray(userData) && userData.length > 0) {
        // Autofill the password field with the retrieved password
        password.value = userData[0].password;
      } else {
        // Clear the password field if no user was found
        password.value = "";
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    // Clear the password field if the email is empty
    password.value = "";
  }
  buttonToggle();
}

// -----------AUTOFILL USING COOKIES------------
// async function autoFill() {
//   const enteredEmail = email.value.trim();

//   if (enteredEmail !== "") {
//     // Check if a password cookie exists for the entered email
//     const passwordCookie = getCookie(enteredEmail);

//     if (passwordCookie !== "") {
//       // Autofill the password field with the cookie value
//       password.value = passwordCookie;
//     } else {
//       // Clear the password field if no cookie is found
//       password.value = "";
//     }
//   } else {
//     // Clear the password field if the email is empty
//     password.value = "";
//   }
// }
// // Function to set a cookie with a specified name, value, and expiration date
// function setCookie(name, value, days) {
//   const date = new Date();
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + date.toUTCString();
//   document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// // Function to get a cookie value by name
// function getCookie(name) {
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const cookies = decodedCookie.split(";");

//   for (let i = 0; i < cookies.length; i++) {
//     let cookie = cookies[i].trim();
//     if (cookie.indexOf(name + "=") === 0) {
//       return cookie.substring(name.length + 1);
//     }
//   }
//   return "";
// }

// -----------BACK TO PREVIOUS PAGE------------
const backArrow = document.querySelector(".back-arrow");
backArrow.addEventListener(
  "click",
  () => (window.location.href = "../views/slideShow.html")
);

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (submitOk) ValidateEmail();
});

// -----------EMAIL VALIDATION------------
function ValidateEmail() {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    window.location.href = "../views/homePage.html";
    sendData();
    return true;
  }
  TODO: alert("You have entered an invalid email address!");
  //REPLACE TOAST
  return false;
}

// -----------POST REQUEST NEW USER------------
async function sendData() {
  const newUser = Object.fromEntries(new FormData(formElem).entries());
  newUser.profile = "../assets/images/profilePic.png";
  newUser.name = await randomNameGenerator();
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    // Check if the user data was successfully added to the server
    if (response.ok) {
      // If the "Remember Me" checkbox is checked, set the email and password cookies
      // if (checkbox.checked) {
      //   setCookie(email.value, password.value, 30); // 30 days expiration
      // }
      window.location.href = "../views/homePage.html";
    } else {
      console.error("Failed to add user data to the server.");
    }
  } catch (error) {
    console.error("Error sending user data:", error);
  }
}

// -----------CHOOSE USERNAME(USED BY SEND DATA FUNCTION ONLY)------------
async function randomNameGenerator() {
  let { default: randomNames } = await import("./randomNames.js");
  let finalName =
    randomNames[Math.floor(Math.random() * randomNames.length)];
  return finalName;
}

//after refresh the fields are empty again
document.addEventListener("DOMContentLoaded", () => {
  email.value = "";
});
