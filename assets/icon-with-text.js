document.addEventListener('shopify:section:load', function(event) {
  initializeSection(event.target);
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.featured-icon-with-text-section').forEach(function(section) {
    initializeSection(section);
  });
});

function initializeSection(section) {
  const cards = section.querySelectorAll(".card__container");
  const items = section.querySelectorAll('.card__container');
  const dots = section.querySelectorAll('.dot');

  cards.forEach((card) => {
    const box = card.querySelector(".description__container");
    const openbutton = card.querySelector(".description__button__container");
    const closeButton = card.querySelector(".description__close__button");
    const icon = card.querySelector(".description__button__inner_container");

    openbutton.addEventListener("click", () => {
      box.classList.add("active");
      icon.classList.add("active");
    });

    closeButton.addEventListener("click", () => {
      box.classList.remove("active");
      icon.classList.remove("active");
    });
  });

  // Create an intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find the index of the currently active card
        const index = Array.from(items).indexOf(entry.target);
        
        // Set the active class on the corresponding dot
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
    });
  }, {
    root: null,
    threshold: 0.75
  });

  // Observe each item
  items.forEach(item => {
    observer.observe(item);
  });
}