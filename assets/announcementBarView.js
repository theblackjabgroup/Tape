document.addEventListener("DOMContentLoaded", function() {
        // Select the node that will be observed for mutations
        /*
        const div = document.querySelector('.bb-max-width');      
        const height = div.offsetHeight;
        console.log("Height of the div:", height, "px");
          document.documentElement.style.setProperty('--announcement-bar-height', `${height / 5}px`);

        const div2 = document.querySelector('.vertical-bar-second-top-desktop');
        div2.style.height = `${height + 10}px`

        const div3 = document.querySelector('.vertical-bar-second-top');
        div3.style.height = `${height}px`

        const span = document.querySelector(".scrollable-text");

        function updateData() {
          console.log("in updateData");
        }

        const resizeObserver = new ResizeObserver((entries) => {
          requestAnimationFrame(updateData);
        });
        
        if (span) {
          resizeObserver.observe(span);
          updateData(); // Initial update
        }
        
        window.addEventListener('resize', () => {
          requestAnimationFrame(updateData);
        });

        window.addEventListener('unload', () => {
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
        });

        document.addEventListener('DOMContentLoaded', function() {
          const div = document.querySelector('.scrollable-text');
          console.log("inner ", div.innerText)
          div.innerText = div.innerText.replace(/\n/g, ' ');
    
          // Optionally, add a CSS style to the div to handle overflow
          div.style.overflow = 'hidden';
          div.style.textOverflow = 'ellipsis'; // Optional: Adds ellipsis (...) for truncated text
          div.style.display = 'inline-block';  // Ensures the content behaves like inline text
          div.style.whiteSpace = 'nowrap';     // Forces the content to remain on one line
          */
     
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
          
          document.documentElement.style.setProperty('--announcement-bar-height', `${height / 5}px`);
          });
      