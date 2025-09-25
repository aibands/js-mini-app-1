document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("username");
  const button = document.getElementById("submitBtn");

  if (input && button) { 
    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => { 
      event.preventDefault();
      localStorage.setItem("username", input.value);
      console.log("hello");
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

  // Only set background if we're on dashboard.html
  const page = window.location.pathname.split("/").pop();
  if (page === "dashboard.html") {
    updateView('home');
  }
});

const locationButtons = document.querySelectorAll('.function-button');
const body = document.body;
const actionButtons = document.querySelectorAll('#action-btn-section > div');

function updateView(location) {
  // Remove previous background
  body.classList.remove('bedroom-background', 'bathroom-background', 'kitchen-background', 'home-background');

  // Add new background
  body.classList.add(`${location}-background`);

  // Hide action buttons
  actionButtons.forEach(actionDiv => {
    actionDiv.style.display = 'none';
  });

  // Show only button for the image
  const currentActionDiv = document.querySelector(`[data-action="${location}"]`);
  if (currentActionDiv) {
    currentActionDiv.style.display = 'block';
  }
}

locationButtons.forEach(button => {
  button.addEventListener('click', () => {
    const location = button.dataset.location;
    updateView(location);
  });
});

// for avatar
const avatar = document.querySelector(".avatar");

const states = {
  idle: [
    "./asstes_tiana/character_default1.png",
    "./asstes_tiana/character_default2.png"
  ],
  hungry: [
    "./asstes_tiana/character_hungry1.png",
    "./asstes_tiana/character_hungry2.png"
  ],
  sleepy: [
    "./asstes_tiana/character_sleepy1.png",
    "./asstes_tiana/character_sleepy2.png"
  ],
  toilet: [
    "./asstes_tiana/character_toilet1.png",
    "./asstes_tiana/character_toilet2.png"
  ]
};

let currentState = "idle"; 
let animationInterval;

// default
function startAnimation(state) {
  clearInterval(animationInterval); 
  currentState = state;

  let frame = 0;
  avatar.style.backgroundImage = `url(${states[state][frame]})`;

  animationInterval = setInterval(() => {
    frame = (frame + 1) % states[state].length;
    avatar.style.backgroundImage = `url(${states[state][frame]})`;
  }, 500); // switch every 0.5s
}

// chang to action
const actionStates = ["hungry", "sleepy", "toilet"];
let actionIndex = 0;

function changeState() {
  startAnimation(actionStates[actionIndex]);
  actionIndex = (actionIndex + 1) % actionStates.length;
}

// click button
function handleAction(action) {
  if (
    (currentState === "hungry" && action === "kitchen") ||
    (currentState === "sleepy" && action === "bedroom") ||
    (currentState === "toilet" && action === "bathroom")
  ) {
    startAnimation("idle");
  }
}

// make it action
document.querySelectorAll("[data-action]").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    handleAction(action);
  });
});

// make it repeat
startAnimation("idle");
setInterval(changeState, 10000);
