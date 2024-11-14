// Select all dots, image containers, and banner elements
const dotItems = document.querySelectorAll('.dot-item');
const cards = document.querySelectorAll('.image__with__text__card');
const container = document.querySelector('.image__with__text__outer__container');

// Select elements for updating the banner content
const bannerHeading = document.querySelector('.info__banner__heading');
const bannerDescription = document.querySelector('.info__banner__description');
const bannerLink = document.querySelector('.info__banner__shopnow__button');

let ticking = false; // Prevent multiple events from being processed at once

// Function to update the banner content based on the current slide
const updateBannerContent = (currentIndex) => {
  console.log("Current Index:", currentIndex);
  const currentCard = cards[currentIndex];
  if (currentCard) {
    const heading = currentCard.getAttribute('data-heading');
    const description = currentCard.getAttribute('data-description');
    const link = currentCard.getAttribute('data-link');
    console.log("Banner Content:", heading, description, link);

    // Update the banner content
    bannerHeading.textContent = heading || "Default Heading";
    bannerDescription.textContent = description || "Default Description";
    bannerLink.setAttribute('href', link || "#");
  }
};

// Function to update dot scaling based on scroll position
const updateDotScaling = () => {
  const scrollPosition = container.scrollLeft;
  const galleryWidth = cards[0].offsetWidth;

   // Calculate which two items are involved in the transition
  const currentIndex = Math.floor(scrollPosition / galleryWidth);
  const percentageScrolled = (scrollPosition % galleryWidth) / galleryWidth;
  
  // Reset all dots to the default size
  dotItems.forEach(dot => {
    dot.style.width = '8px';
    dot.style.height = '8px';
  });

  // Scale the current dot and next dot based on scroll position
  if (dotItems[currentIndex]) {
    dotItems[currentIndex].style.width = `${48 - (percentageScrolled * 40)}px`;
  }

  if (dotItems[currentIndex + 1]) {
    dotItems[currentIndex + 1].style.width = `${8 + (percentageScrolled * 40)}px`;
  }

  // Update the banner content based on the exact current index
  updateBannerContent(Math.round(scrollPosition / galleryWidth));
};

// Throttled scroll handler using requestAnimationFrame
const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateDotScaling();
      ticking = false;
    });
    ticking = true;
  }
};

// Listen to scroll events on the container
container.addEventListener('scroll', onScroll);

// Set up initial state
document.addEventListener('DOMContentLoaded', () => {
  dotItems[0].style.width = '48px';  // The first dot starts as the active one
  updateBannerContent(0); // Initialize banner content with the first card
});

// Expand button functionality for showing/hiding banner details
const infoBannerExpandButton = document.getElementById('info__banner__expand__button');
const infoBannerDetails = document.querySelector('.info__banner__details');

// Add click event listener to toggle the "show" class
infoBannerExpandButton.addEventListener('click', () => {
  infoBannerDetails.classList.toggle('show');
  infoBannerExpandButton.classList.toggle('show');
});