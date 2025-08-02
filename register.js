document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Store user info in localStorage
    const user = {
      username,
      email,
      mobile,
      password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(user));
    alert("Registration successful!");
    window.location.href = "question.html";
  });
});