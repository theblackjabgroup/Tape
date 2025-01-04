document.addEventListener("DOMContentLoaded", function() {
          const spanTextElements = document.querySelectorAll('.scrollable-text');
          const scrollingContainers = document.querySelectorAll('.scrolling-text-container');
        
          // Check if text length is greater than 20 characters
           spanTextElements.forEach((spanTextElement, index) => {
            const scrollingContainer = scrollingContainers[index];
        
            // Check if text length is greater than 20 characters
            if (spanTextElement && spanTextElement.textContent.length > 27) {
              scrollingContainer.classList.add('scroll-enabled'); // Enable scrolling
            }
          });
          const div = document.querySelector('.bb-max-width');
    
          const height = div.offsetHeight;
          
          document.documentElement.style.setProperty('--announcement-bar-height', `${(height / 5) + 1}px`);
          });
      