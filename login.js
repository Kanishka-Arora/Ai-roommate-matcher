document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password.");
    }
  });
});
