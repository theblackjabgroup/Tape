    document.addEventListener('DOMContentLoaded', function() {
      /*
      const div = document.querySelector('.scrollable-text');
      console.log("inner ", div.innerText)
      div.innerText = div.innerText.replace(/\n/g, ' ');

      // Optionally, add a CSS style to the div to handle overflow
      div.style.overflow = 'hidden';
      div.style.textOverflow = 'ellipsis'; // Optional: Adds ellipsis (...) for truncated text
      div.style.display = 'inline-block';  // Ensures the content behaves like inline text
      div.style.whiteSpace = 'nowrap';     // Forces the content to remain on one line
      */
     const div = document.querySelector('.bb-max-width');

     const height = div.offsetHeight;
     
     console.log("Height of the div:", height, "px");
     document.documentElement.style.setProperty('--announcement-bar-height', `${height / 5}px`);

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