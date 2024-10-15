 // Select all dots and image containers
 const dotItems = document.querySelectorAll('.dot-item');
 const cards = document.querySelectorAll('.image__with__text__card');
 const container = document.querySelector('.image__with__text__outer__container');
 
 let ticking = false; // To prevent multiple events from being processed at once

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
 })