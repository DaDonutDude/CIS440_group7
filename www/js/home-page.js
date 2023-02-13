"use strict;"



const logoutBtn = document.getElementById("logoutButton");

  logoutBtn.addEventListener("click", function() {
    // Add your logout logic here.
    // For example, you can redirect the user to the login page:
    window.location.href = "./login-page.html";
  });