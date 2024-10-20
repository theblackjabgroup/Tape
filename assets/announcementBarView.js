    document.addEventListener('DOMContentLoaded', function() {
      const spanTextElements = document.querySelectorAll('.scrollable-text');
      const scrollingContainers = document.querySelectorAll('.scrolling-text-container');
    
      // Check if text length is greater than 20 characters
       spanTextElements.forEach((spanTextElement, index) => {
        console.log("FIRST", spanTextElement, spanTextElement.textContent.length)
        const scrollingContainer = scrollingContainers[index];
    
        // Check if text length is greater than 20 characters
        if (spanTextElement && spanTextElement.textContent.length > 27) {
          console.log("HEREEEE", spanTextElement, spanTextElement.textContent.length);
          scrollingContainer.classList.add('scroll-enabled'); // Enable scrolling
        }
      });
      })