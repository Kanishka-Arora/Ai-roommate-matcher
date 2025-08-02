
  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const profile = {
      sleep: document.querySelector('input[name="q1"]').value,
      noise: document.querySelector('input[name="q2"]').value,
      food: document.querySelector('input[name="q3"]').value,
      cleanliness: document.querySelector('input[name="q4"]').value,
      social: document.querySelector('input[name="q5"]').value
    };

    localStorage.setItem("guestProfile", JSON.stringify(profile));
    alert("Survey submitted successfully!");
    window.location.href = "dashboard.html";
  });

