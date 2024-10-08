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
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementsByClassName("tablinks")[0].click();
});