const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const reveals = document.querySelectorAll(".reveal");
const backToTop = document.getElementById("backToTop");
const progressBar = document.getElementById("progressBar");
const counters = document.querySelectorAll(".counter");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const form = document.getElementById("form-contato");
const toast = document.getElementById("toast");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;

  backToTop.classList.toggle("show", scrollTop > 500);

  updateActiveMenu();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(item => observer.observe(item));

function updateActiveMenu() {
  const sections = document.querySelectorAll("main section[id]");

  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-menu a[href="#${id}"]`);

    if (link && top >= offset && top < offset + height) {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  let current = 0;
  const increment = Math.ceil(target / 60);

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    counter.textContent = `${current}%`;
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.started) {
      entry.target.dataset.started = "true";
      animateCounter(entry.target);
    }
  });
}, {
  threshold: 0.6
});

counters.forEach(counter => counterObserver.observe(counter));

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

function showError(input, message) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error-message");
  input.classList.add("input-error");
  error.textContent = message;
}

function clearError(input) {
  const formGroup = input.parentElement;
  const error = formGroup.querySelector(".error-message");
  input.classList.remove("input-error");
  error.textContent = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  let isValid = true;

  if (name.value.trim().length < 3) {
    showError(name, "Digite um nome com pelo menos 3 caracteres.");
    isValid = false;
  } else {
    clearError(name);
  }

  if (!validateEmail(email.value.trim())) {
    showError(email, "Digite um e-mail válido.");
    isValid = false;
  } else {
    clearError(email);
  }

  if (message.value.trim().length < 10) {
    showError(message, "A mensagem deve ter pelo menos 10 caracteres.");
    isValid = false;
  } else {
    clearError(message);
  }

  if (isValid) {
    toast.classList.add("show");
    form.reset();

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});

document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});
