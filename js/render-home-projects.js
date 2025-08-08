document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "https://admin.tonydesignconstruction.com";
  const homeProjectsContainer = document.getElementById("home-projects-gallery");

  const loader = document.createElement("div");
  loader.id = "projects-loader";
  loader.textContent = "Cargando proyectos...";
  loader.style.textAlign = "center";
  loader.style.color = "#ff3300";
  loader.style.fontSize = "1.1rem";
  loader.style.margin = "2rem 0";
  homeProjectsContainer.before(loader);

  fetch(`${API_BASE_URL}/api/projects`)
    .then(response => response.json())
    .then(projectsData => {
      loader.remove();

      const shuffledProjects = [...projectsData].sort(() => 0.5 - Math.random());
      const selectedProjects = shuffledProjects.slice(0, 3);

      selectedProjects.forEach(project => {
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

        homeProjectsContainer.appendChild(card);
      });

      const modal = document.getElementById("project-modal");
      const modalImages = document.getElementById("modal-images");
      const modalDescription = document.getElementById("modal-description");
      const closeBtn = document.querySelector(".close-btn");

      document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("click", () => {
          const title = card.querySelector("h3").textContent;
          const project = projectsData.find(p => p.title === title);

          if (project) {
            const images = project.image_paths ? project.image_paths.split(",") : [];
            modalImages.innerHTML = images
              .map(img => `<img src="${API_BASE_URL}${img}" alt="${project.title}">`)
              .join("");
            modalDescription.textContent = project.description;
            modal.style.display = "block";
          }
        });
      });

      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      window.addEventListener("click", e => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });

      setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('show'));
      }, 100);
    })
    .catch(err => {
      console.error("Error al cargar proyectos:", err);
      loader.textContent = "Error al cargar los proyectos. Intenta más tarde.";
    });
});
