document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "https://admin.tonydesignconstruction.com";
  const allProjectsContainer = document.getElementById("all-projects-list");

  fetch(`${API_BASE_URL}/api/projects`)
    .then(response => response.json())
    .then(projectsData => {
      console.log("Proyectos cargados:", projectsData);

      projectsData.forEach(project => {
        const images = project.image_paths ? project.image_paths.split(",") : [];

        const card = document.createElement("div");
        card.className = "project-card fade-in";

        card.innerHTML = `
          <img src="${API_BASE_URL}${images[0]}" alt="${project.title}">
          <div class="project-card-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.video_url ? `<a href="${project.video_url}" target="_blank" class="video-link" onclick="event.stopPropagation();">🎥 Ver Video</a>` : ""}
          </div>
        `;

        // ✅ Evento para abrir modal con todas las imágenes
        card.addEventListener("click", () => {
          const modal = document.getElementById("project-modal");
          const modalImages = document.getElementById("modal-images");
          const modalDescription = document.getElementById("modal-description");

          modalImages.innerHTML = images
            .map(img => `<img src="${API_BASE_URL}${img}" alt="${project.title}">`)
            .join("");

          modalDescription.textContent = project.description;
          modal.style.display = "block";
        });

        allProjectsContainer.appendChild(card);
      });

      // ✅ Cierre del modal
      const modal = document.getElementById("project-modal");
      const closeBtn = document.querySelector(".close-btn");

      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      window.addEventListener("click", e => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });

      // ✅ Activar animación
      setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('show'));
      }, 100);
    })
    .catch(err => {
      console.error("Error al cargar proyectos:", err);
      allProjectsContainer.innerHTML = "<p style='color: red;'>Error al cargar los proyectos.</p>";
    });
});
