import addFilledIcons from "./changeIcons.mjs";
import { redirectSearchPage } from "./redirect.mjs";

//------CHANGE ICONS-------
const navBar = document.querySelector("#nav-bar");
navBar.addEventListener("click", addFilledIcons);

//------REDIRECT TO SEARCH-------
redirectSearchPage();
