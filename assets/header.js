
function createCircles() {
    const container = document.getElementById('circle__container');
    const screenWidth = window.innerWidth;
    const circleWidth = 82; // Circle width + margin (1rem = 16px)
    
    // Calculate how many circles can fit in the screen width
    const numCircles = Math.floor(screenWidth / circleWidth);

    // Create circles
    for (let i = 0; i < numCircles; i++) {
      const circle = document.createElement('div');
      circle.classList.add('header_circles');
      container.appendChild(circle);
    }
  }

  // Create circles on load and resize
  window.onload = createCircles;
  window.onresize = function() {
    document.getElementById('circle__container').innerHTML = '';
    createCircles();
  };
