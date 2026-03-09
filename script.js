const phrases = [
  "Рост заявок уже с первого месяца",
  "Сильный имидж для вашего бренда",
  "Сайт, который помогает продавать"
];

const typedEl = document.getElementById("typed");

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
  if (!typedEl) {
    return;
  }

  const current = phrases[phraseIndex];
  const speed = deleting ? 45 : 75;

  typedEl.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
  } else if (deleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(tick, 900);
    return;
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(tick, speed);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((node, index) => {
  node.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
  observer.observe(node);
});

tick();

const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (button) {
      const oldText = button.textContent;
      button.textContent = "Отправлено";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = oldText;
        button.disabled = false;
      }, 1600);
    }
    form.reset();
  });
}

const reviewForm = document.getElementById("review-form");
const reviewsList = document.getElementById("reviews-list");

if (reviewForm && reviewsList) {
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(reviewForm);
    const author = (formData.get("author") || "").toString().trim();
    const role = (formData.get("role") || "").toString().trim();
    const text = (formData.get("text") || "").toString().trim();

    if (!author || !role || !text) {
      return;
    }

    const card = document.createElement("blockquote");
    card.className = "glass quote";
    card.innerHTML = `«${text}»<cite>${author}, ${role}</cite>`;
    reviewsList.prepend(card);

    const button = reviewForm.querySelector("button");
    if (button) {
      const oldText = button.textContent;
      button.textContent = "Отзыв добавлен";
      button.disabled = true;
      setTimeout(() => {
        button.textContent = oldText;
        button.disabled = false;
      }, 1400);
    }

    reviewForm.reset();
  });
}

const logoImg = document.querySelector(".logo-img");
const logoText = document.querySelector(".logo-text");

if (logoImg && logoText) {
  logoImg.addEventListener("load", () => {
    logoText.style.display = "none";
  });

  logoImg.addEventListener("error", () => {
    logoImg.style.display = "none";
    logoText.style.display = "inline";
  });
}

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(max-width: 700px)").matches) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = (0.5 - (y / rect.height)) * 7;

    card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
