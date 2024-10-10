document.querySelectorAll(".card__container").forEach((card) => {
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


const items = document.querySelectorAll('.card__container');
const dots = document.querySelectorAll('.dot');

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

      console.log(`Currently active card: ${entry}`);
    }
  });
}, {
  root: null, // Use the viewport as the root
  threshold: 0.75 // Trigger when 50% of the item is visible
});

// Observe each item
items.forEach(item => {
  observer.observe(item);
});