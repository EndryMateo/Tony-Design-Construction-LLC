// ==== Menú hamburguesa con íconos alternables ====
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {
  navbar.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// ==== Sombra en navbar al hacer scroll ====
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ==== Animación fade-in con IntersectionObserver ====
const faders = document.querySelectorAll(".fade-in");

const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// ==== Cerrar menú móvil al hacer clic en un enlace ====
document.querySelectorAll("#navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// ==== Modal de proyectos (para tarjetas con dataset estático) ====
const modal = document.getElementById("project-modal");
const modalImages = document.getElementById("modal-images");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".project-item").forEach((card) => {
  card.addEventListener("click", () => {
    const images = card.dataset.images ? JSON.parse(card.dataset.images) : [];
    const description = card.dataset.description || "";

    if (images.length > 0) {
      modalImages.innerHTML = images.map((src) => `<img src="${src}" alt="">`).join("");
      modalDescription.textContent = description;
      modal.style.display = "block";
    }
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// ==== Envío de formulario de contacto (usa API_BASE_URL del config.js) ====
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = {
        name: contactForm.elements["name"].value,
        email: contactForm.elements["email"].value,
        message: contactForm.elements["message"].value,
      };

      fetch(`${API_BASE_URL}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to send email");
          return response.json();
        })
        .then(() => {
          document.querySelector(".confirmation-message").style.display = "block";
          contactForm.reset();
          setTimeout(() => {
            document.querySelector(".confirmation-message").style.display = "none";
          }, 4000);
        })
        .catch((error) => {
          console.error("Email error:", error);
          alert("Oops! Something went wrong. Please try again later.");
        });
    });
  }
});
