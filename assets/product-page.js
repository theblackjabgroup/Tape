
window.addEventListener('DOMContentLoaded', () => {
    if(!document.getElementById("bb_product__media_first"))
    {
        document.getElementById("product-upper-bg").style.display = "none";
        const soldOuts = document.querySelectorAll("[class*='sold-out-tag']");
        soldOuts.forEach((s) => {
            s.style.display = "none";
        });
    }
  });