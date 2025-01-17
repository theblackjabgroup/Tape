class IconWithText {
    constructor(section) {
      this.section = section;
      this.isLayout1 = section.classList.contains('featured-icon-with-text-section');

      if (this.isLayout1) {
        this.initLayout1();
      } else {
        this.initLayout2();
      }
    }

    initLayout1() {
      const cards = this.section.querySelectorAll(".card__container");
      const items = this.section.querySelectorAll('.card__container');
      const dots = this.section.querySelectorAll('.dot');

      cards.forEach((card) => {
        const box = card.querySelector(".description__container");
        const openButton = card.querySelector(".description__button__container");
        const closeButton = card.querySelector(".description__close__button");
        const icon = card.querySelector(".description__button__inner_container");

        if (openButton && box && closeButton && icon) {
          openButton.addEventListener("click", () => {
            box.classList.add("active");
            icon.classList.add("active");
          });

          closeButton.addEventListener("click", () => {
            box.classList.remove("active");
            icon.classList.remove("active");
          });
        }
      });

      // Create an intersection observer for layout 1
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(items).indexOf(entry.target);
            dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === index);
            });
          }
        });
      }, {
        root: null,
        threshold: 0.75
      });

      items.forEach(item => observer.observe(item));
    }

    initLayout2() {
      const sectionId = this.section.id.replace('section-', '');
      this.container = document.querySelector(`#section-${sectionId} .card-container`);
      this.dots = document.querySelectorAll(`#section-${sectionId} ~ .icon-with-text-2-dots .icon-with-text-2-dot`);
      this.currentCard = 0;

      if (!this.container) return;

      const scrollButton = this.container.querySelector('.scroll-button');
      scrollButton?.addEventListener('click', () => this.scrollCards());

      this.container.querySelectorAll('.card-action-button')
        .forEach(button => button.addEventListener('click', () => this.toggleDescription(button)));

      this.container.addEventListener('scroll', () => {
        const cardWidth = this.container.querySelector('.primary-card-container').offsetWidth + 20;
        this.currentCard = Math.round(this.container.scrollLeft / cardWidth);
      });

      // Add intersection observer for layout 2
      const cards = this.container.querySelectorAll('.primary-card-container');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target);
            this.updateDots(index);
          }
        });
      }, {
        root: null,
        threshold: 0.75
      });

      cards.forEach(card => observer.observe(card));
    }

    toggleDescription(button) {
      const card = button.closest('.primary-card-container');
      button.classList.toggle('active');
      card.querySelector('.card-description-text').classList.toggle('show');
      card.querySelector('.background-decoration').classList.toggle('show');
    }

    scrollCards() {
      const cardWidth = this.container.querySelector('.primary-card-container').offsetWidth + 20;
      const totalCards = this.container.querySelectorAll('.primary-card-container').length;
      this.currentCard = (this.currentCard + 1) % totalCards;
      this.container.scrollTo({
        left: this.currentCard * cardWidth,
        behavior: 'smooth'
      });
    }

    updateDots(activeIndex) {
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }
  }

  // Initialize on section load
  document.addEventListener('shopify:section:load', function(event) {
    new IconWithText(event.target);
  });

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.featured-icon-with-text-section, [id^="section-"]').forEach(section => {
      new IconWithText(section);
    });
  });

document.addEventListener("DOMContentLoaded", () => {
    function updateNavigationVisibility() {
        const cardContainer = document.querySelector(".scroll-container");
        const cards = cardContainer?.querySelectorAll(".primary-card-container");
        const arrows = document.querySelectorAll(".scroll-button.next");
        const pagination = document.querySelector(".icon-with-text-2-dots");
        const mainContainer = document.querySelector(".icon-with-text-2");
        const random = cardContainer?.querySelector("#cardContainer");

        console.log("Number of cards found:", cards?.length);

        if (window.innerWidth > 768 && cards && cards.length < 4) {
            console.log("Hiding navigation elements");
            arrows.forEach(arrow => arrow.style.display = "none");
            if (pagination) pagination.style.display = "none";
            if (mainContainer) mainContainer.style.textAlign = "center";
           if (random) {
          random.style.display = "flex";
          random.style.justifyContent = "center";
        }
        } else {
            console.log("Showing navigation elements");
            arrows.forEach(arrow => arrow.style.display = "flex");
            if (pagination) pagination.style.display = "flex";
            if (mainContainer) mainContainer.style.textAlign = "start";
        }
    }

    updateNavigationVisibility();
    window.addEventListener('resize', updateNavigationVisibility);
    document.addEventListener('shopify:section:load', () => {
        requestAnimationFrame(updateNavigationVisibility);
    });
    document.addEventListener('shopify:section:select', () => {
        requestAnimationFrame(updateNavigationVisibility);
    });
    document.addEventListener('shopify:section:render', () => {
        requestAnimationFrame(updateNavigationVisibility);
    });
});
  document.addEventListener("DOMContentLoaded", () => {
    const components = document.querySelectorAll(".primary-card-container");

    components.forEach(component => {
      const toggleButton = component.querySelector(".card-action-button");
      const descriptionText = component.querySelector(".card-description-text");

      toggleButton.addEventListener("click", () => {
        const descriptionHeight = descriptionText ? descriptionText.scrollHeight : 0;

        if (toggleButton.classList.contains("active")) {
          component.style.height = `${descriptionHeight + 300}px`;
        } else {
          component.style.height = "200px";
        }
      });
    });
  });
