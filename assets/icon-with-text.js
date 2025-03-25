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

        openButton.setAttribute('role', 'button');
        openButton.setAttribute('tabindex', '0');
        openButton.setAttribute('aria-label', 'Open description');

        closeButton.setAttribute('role', 'button');
        closeButton.setAttribute('tabindex', '0');
        closeButton.setAttribute('aria-label', 'Close description');

        const toggleDescription = (isOpen) => {
          box.classList.toggle("active", isOpen);
          icon.classList.toggle("active", isOpen);
          openButton.setAttribute('aria-expanded', isOpen);
        };

        openButton.addEventListener("click", () => toggleDescription(true));
        closeButton.addEventListener("click", () => toggleDescription(false));

        openButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDescription(true);
          }
        });

        closeButton.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDescription(false);
          }
        });
      });

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

      scrollButton?.setAttribute('role', 'button');
      scrollButton?.setAttribute('tabindex', '0');
      scrollButton?.setAttribute('aria-label', 'Scroll to next card');

      scrollButton?.addEventListener('click', () => this.scrollCards());
      scrollButton?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.scrollCards();
        }
      });

      this.container.querySelectorAll('.card-action-button')
        .forEach(button => {
          button.setAttribute('role', 'button');
          button.setAttribute('tabindex', '0');
          button.setAttribute('aria-label', 'Toggle card description');
          
          button.addEventListener('click', () => this.toggleDescription(button));
          button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.toggleDescription(button);
            }
          });
        });

      this.dots.forEach((dot, index) => {
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('aria-label', `Go to card ${index + 1}`);

        dot.addEventListener('click', () => this.scrollToCard(index));
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.scrollToCard(index);
          }
        });
      });

      this.container.addEventListener('scroll', () => {
        const cardWidth = this.container.querySelector('.primary-card-container').offsetWidth + 20;
        this.currentCard = Math.round(this.container.scrollLeft / cardWidth);
      });

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
      const descriptionText = card.querySelector('.card-description-text');
      const backgroundDecoration = card.querySelector('.background-decoration');
      
      button.classList.toggle('active');
      button.setAttribute('aria-expanded', button.classList.contains('active'));
      
      descriptionText.classList.toggle('show');
      backgroundDecoration.classList.toggle('show');

      const descriptionHeight = descriptionText ? descriptionText.scrollHeight : 0;
      card.style.height = button.classList.contains('active') 
        ? `${descriptionHeight + 300}px` 
        : '200px';
    }

    scrollCards() {
      const cardWidth = this.container.querySelector('.primary-card-container').offsetWidth + 20;
      const totalCards = this.container.querySelectorAll('.primary-card-container').length;
      this.currentCard = (this.currentCard + 1) % totalCards;
      this.container.scrollTo({
        left: this.currentCard * cardWidth,
        behavior: 'smooth'
      });
      this.updateDots(this.currentCard);
    }

    scrollToCard(index) {
      const cardWidth = this.container.querySelector('.primary-card-container').offsetWidth + 20;
      this.container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      this.updateDots(index);
    }

    updateDots(activeIndex) {
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
        dot.setAttribute('aria-selected', index === activeIndex);
      });
    }
  }

  document.addEventListener('shopify:section:load', function(event) {
    new IconWithText(event.target);
  });

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

        if (window.innerWidth > 768 && cards && cards.length < 6) {
            arrows.forEach(arrow => arrow.style.display = "none");
            if (pagination) pagination.style.display = "none";
            if (mainContainer) mainContainer.style.textAlign = "center";
           if (random) {
              random.style.display = "flex";
              random.style.justifyContent = "center";
            }
        } else {
            arrows.forEach(arrow => arrow.style.display = "flex");
            if (pagination) pagination.style.display = "flex";
            if (mainContainer) mainContainer.style.textAlign = "center";
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
