document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("username");
  const button = document.getElementById("submitBtn");

  if (input && button) { 
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => { 
      event.preventDefault();
      localStorage.setItem("username", input.value);
      console.log("hello")
      window.location.href = "dashboard.html";
    });

    input.addEventListener("input", () => {
      button.disabled = input.value.trim() === ""; 
    });
  }


  const greeting = document.getElementById("greeting");
  if (greeting) {
    let name = localStorage.getItem("username") || "Player";
    greeting.textContent = name; 
  } 
});