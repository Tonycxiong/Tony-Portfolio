let currentTheme = "default";

const skills = [
  "HTML basics",
  "CSS styling",
  "JavaScript basics",
  "Responsive design",
  "Debugging"
];

function generateGreeting(name) {
  const now = new Date();
  const hour = now.getHours();
  let timeOfDay = "Hello";

  if (hour < 12) {
    timeOfDay = "Good morning";
  } else if (hour < 18) {
    timeOfDay = "Good afternoon";
  } else {
    timeOfDay = "Good evening";
  }

  const safeName = (name || "friend").toUpperCase();
  return timeOfDay + ", " + safeName + "!";
}

function formatTodayDate() {
  const today = new Date();
  return today.toLocaleDateString("en-US");
}

document.addEventListener("DOMContentLoaded", function () {
  setupIndexPage();
  setupAboutPage();
  setupContactPage();
});

function setupIndexPage() {
  const container = document.querySelector(".intro");
  if (!container) return;

  const heading = container.querySelector("h1");
  const introParagraph = container.querySelector("p");

  const dateP = document.createElement("p");
  dateP.textContent = "Today is " + formatTodayDate();
  dateP.style.fontSize = "0.9rem";
  container.prepend(dateP);

  if (heading) {
    heading.textContent = generateGreeting("Tony");
  }

  const skillsTitle = document.createElement("h2");
  skillsTitle.textContent = "Skills";

  const skillsList = document.createElement("ul");

  skills.forEach(function (skill) {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  container.appendChild(skillsTitle);
  container.appendChild(skillsList);

  const button = document.createElement("button");
  button.textContent = "Change Greeting";
  button.type = "button";
  button.style.marginTop = "0.75rem";
  container.appendChild(button);

  button.addEventListener("click", function () {
    const localMessage = "Thanks for visiting my site.";
    currentTheme = currentTheme === "default" ? "alt" : "default";

    if (heading) {
      heading.textContent = generateGreeting("Tony");
    }
    if (introParagraph) {
      introParagraph.textContent = localMessage;
    }

    container.style.border =
      currentTheme === "alt" ? "2px solid white" : "none";
  });

  const randomIndex = Math.floor(Math.random() * skills.length);
  const randomSkill = skills[randomIndex];
  const randomP = document.createElement("p");
  randomP.textContent = "Random skill focus: " + randomSkill;
  randomP.style.marginTop = "0.5rem";
  container.appendChild(randomP);
}

function setupAboutPage() {
  const aboutMain = document.querySelector("main.content");
  if (!aboutMain) return;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Show more about me";
  toggleBtn.type = "button";
  toggleBtn.style.marginTop = "1rem";

  const extraDiv = document.createElement("div");
  extraDiv.style.display = "none";
  extraDiv.style.marginTop = "0.75rem";
  extraDiv.innerHTML = `
    <p>
      I like planning long-term goals, learning new things, and finding ways to
      build a stable future for my family.
    </p>
    <p>
      I enjoy roles where I can understand problems and help design better
      systems and experiences.
    </p>
  `;

  aboutMain.appendChild(toggleBtn);
  aboutMain.appendChild(extraDiv);

  toggleBtn.addEventListener("click", function () {
    if (extraDiv.style.display === "none") {
      extraDiv.style.display = "block";
      toggleBtn.textContent = "Hide extra details";
    } else {
      extraDiv.style.display = "none";
      toggleBtn.textContent = "Show more about me";
    }
  });
}

function setupContactPage() {
  const form = document.querySelector("form.contact-form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");

  const nameError = document.createElement("p");
  nameError.style.color = "#ffb3b3";
  nameError.style.fontSize = "0.8rem";

  const emailError = document.createElement("p");
  emailError.style.color = "#ffb3b3";
  emailError.style.fontSize = "0.8rem";

  const messageError = document.createElement("p");
  messageError.style.color = "#ffb3b3";
  messageError.style.fontSize = "0.8rem";

  const generalMessage = document.createElement("p");
  generalMessage.style.fontSize = "0.85rem";

  nameInput.insertAdjacentElement("afterend", nameError);
  emailInput.insertAdjacentElement("afterend", emailError);
  messageInput.insertAdjacentElement("afterend", messageError);
  form.appendChild(generalMessage);

  const helper = document.createElement("p");
  helper.style.fontSize = "0.8rem";
  helper.textContent = "0 characters typed";
  messageInput.insertAdjacentElement("afterend", helper);

  messageInput.addEventListener("input", function () {
    const text = messageInput.value;
    helper.textContent = text.length + " characters typed";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    generalMessage.textContent = "";

    const nameValue = (nameInput.value || "").trim();
    const emailValue = (emailInput.value || "").trim();
    const messageValue = (messageInput.value || "").trim();

    let isValid = true;

    if (!nameValue) {
      isValid = false;
      nameError.textContent = "Name must not be empty.";
    }

    if (!emailValue || emailValue.indexOf("@") === -1) {
      isValid = false;
      emailError.textContent = 'Email must include "@" and cannot be empty.';
    }

    if (!messageValue || messageValue.length < 10) {
      isValid = false;
      messageError.textContent = "Message must be at least 10 characters long.";
    }

    if (!isValid) {
      generalMessage.style.color = "#ffb3b3";
      generalMessage.textContent = "Please fix the errors above.";
      return;
    }

    generalMessage.style.color = "#bbf7d0";
    generalMessage.textContent = "Thank you! Your message has been sent.";
    form.reset();
    helper.textContent = "0 characters typed";
  });
}
