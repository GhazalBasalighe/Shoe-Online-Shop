const navBar = document.querySelector("#nav-bar");
const navItems = navBar.querySelectorAll(".nav-item");
export default function addFilledIcons(e) {
  const targetNavItem = e.target.closest(".nav-item");

  if (targetNavItem) {
    // Loop through all navigation items and reset their icons to normal state
    navItems.forEach((navItem) => {
      const icon = navItem.querySelector("i");
      if (icon) {
        const behavior = navItem.getAttribute("data-behavior");
        switch (behavior) {
          case "home":
            $(icon)
              .removeClass("bi-house-door-fill")
              .addClass("bi-house-door");
            break;
          case "cart":
            $(icon).removeClass("bi-bag-fill").addClass("bi-bag");
            break;
          case "orders":
            $(icon).removeClass("bi-cart-fill").addClass("bi-cart");
            break;
          case "wallet":
            $(icon).removeClass("bi-wallet-fill").addClass("bi-wallet");
            break;
          case "profile":
            $(icon).removeClass("bi-person-fill").addClass("bi-person");
            break;
        }
      }
    });

    const behavior = targetNavItem.getAttribute("data-behavior");
    const icon = targetNavItem.querySelector("i");
    if (icon) {
      switch (behavior) {
        case "home":
          $(icon).toggleClass("bi-house-door-fill bi-house-door");
          window.location.href = "../views/homePage.html";
          break;
        case "cart":
          $(icon).toggleClass("bi-bag-fill bi-bag");
          window.location.href = "../views/myCart.html";
          break;
        case "orders":
          $(icon).toggleClass("bi-cart-fill bi-cart");
          break;
        case "wallet":
          $(icon).toggleClass("bi-wallet-fill bi-wallet");
          break;
        case "profile":
          $(icon).toggleClass("bi-person-fill bi-person");
          break;
      }
    }
  }
}
