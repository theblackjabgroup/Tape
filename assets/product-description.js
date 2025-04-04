// Function to open the clicked tab and hide others
function openTab(evt, tabName) {
    // Get all elements with class="tabcontent" and hide them
    var tabcontents = document.getElementsByClassName("product-description-grid-container");
    for (var i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the "active" class
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the clicked tab's content and add the "active" class to the clicked button
    document.getElementById(tabName).style.display = "grid";
    evt.currentTarget.className += " active";
}

// By default, open the first tab
/*
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementsByClassName("tablinks")[0].click();
});
*/

let click = 0;
// Get the bb_product__media div element
const mediaDivs = document.getElementsByClassName('bb_product__media');
console.log("mediaDivs ", mediaDivs)
// Add click event listener
Array.from(mediaDivs).forEach((mediaDiv) => {
    const imgTag = mediaDiv.querySelector('img'); // Find the img tag inside the div

    if (imgTag && !imgTag.hasAttribute('data-click')) {
      // Apply CSS to the div if img doesn't have data-click attribute
      mediaDiv.style.marginLeft = '0rem';  // Example of custom CSS
    }
})
