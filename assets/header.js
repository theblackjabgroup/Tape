
function createCircles() {
  const container = document.getElementById('header__semicircle__bottom_container');
  const screenWidth = window.innerWidth;
  const circleWidth = 82; // Circle width + margin (1rem = 16px)
  
  // Calculate how many circles can fit in the screen width
  const numCircles = Math.floor(screenWidth / circleWidth);

  // Create circles
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement('div');
    circle.classList.add('header_semicircles');
    container.appendChild(circle);
  }
}

// Create circles on load and resize
window.onload = createCircles;
window.onresize = function() {
  document.getElementById('header__semicircle__bottom_container').innerHTML = '';
  createCircles();
};
