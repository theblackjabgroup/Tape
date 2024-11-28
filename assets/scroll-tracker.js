// Initialize scroll tracking variables
let scrollDistance = parseFloat(localStorage.getItem('scrollDistance')) || 0;
let prevScrollY = window.scrollY;

// Update scroll distance display on page load
document.addEventListener('DOMContentLoaded', () => {
  const scrollDistanceEl = document.getElementById('scrollDistance');
  if (scrollDistanceEl) {
    scrollDistanceEl.textContent = scrollDistance.toFixed(2);
  }
});

// Throttle scroll handler for better performance
let ticking = false;

// Calculate and update scroll distance
const updateScrollDistance = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - prevScrollY);
      
      // Convert pixels to kilometers
      const incrementalDistance = deltaY / 1000000;
      scrollDistance += incrementalDistance;
      
      // Update display and save to localStorage
      const scrollDistanceEl = document.getElementById('scrollDistance');
      if (scrollDistanceEl) {
        scrollDistanceEl.textContent = scrollDistance.toFixed(2);
        localStorage.setItem('scrollDistance', scrollDistance);
      }

      prevScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
};

// Add scroll event listener
window.addEventListener('scroll', updateScrollDistance, { passive: true });

// Smooth scroll to bottom functionality
const scrollToBottomBtn = document.getElementById('scroll-to-bottom');
if (scrollToBottomBtn) {
  scrollToBottomBtn.addEventListener('click', () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });
}
