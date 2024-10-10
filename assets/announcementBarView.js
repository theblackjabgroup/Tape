function b_start()
{
  /*
    console.log("in bar announcement view");
    const elems = document.getElementsByClassName("bb_view");

    if (elems.length > 0) {
        const arr = [];
        Array.from(elems).forEach((elem) => {
            arr.push(elem.getAttribute("data-display-view"));
            arr.push(elem.getAttribute("data-display-view2"));
            console.log("arr", arr);
    })
    const viewportWidth = window.innerWidth;
   // var storeNode = new Map();
    arr.forEach(str => {
        const [type, sectionId] = str.split('--', 2);
        console.log(`Type: ${type}`);
        console.log(`Section ID: ${sectionId}`);

        if(type == "hide-desktop-sections" && viewportWidth > 768)
        {
            const y = `Slide-sections--${sectionId}`;
            var nodeToHide = document.getElementById(y);
            console.log("nodeToHide in desktop ",nodeToHide);
          //  storeNode.set(y,nodeToHide);
            nodeToHide.parentElement.removeChild(nodeToHide);
           // console.log("s ",storeNode);
        }
        if(type == "hide-mobile-sections" && viewportWidth < 768)
        {
            const y = `Slide-sections--${sectionId}`;
            var nodeToHide = document.getElementById(y);
            console.log("nodeToHide in mobile",nodeToHide);
            nodeToHide.parentElement.removeChild(nodeToHide);
        }
      });   
      /*
      var x = document.getElementById("bb-test");
      var nodeStr = "";
      storeNode.forEach((sId,node) => {
        console.log("sId ",sId, node)

        nodeStr = nodeStr + node + ",";
      });
      console.log("nodeStr ",nodeStr)
      x.setAttribute('data-hide', nodeStr)
    }
    
    const elems = document.querySelectorAll(".announcement-icon-sub-slider img");
    const dest = document.getElementById("announcement-icon-sub-id");
    console.log("dest ", dest);
    console.log("elems ", elems)
    elems.forEach((elem) => {
      const dup = elem.cloneNode(false)
    dest.appendChild(dup);
    })
    */
   const elem = document.getElementById("announcement-icon-sub-id");
   const dests = document.getElementsByClassName("announcement-icon-wrapper");

   Array.from(dests).forEach(dest => {
      if(elem.getAttribute("aria-index") != dest.getAttribute("aria-count"))
      {
        dest.setAttribute('aria-hidden', 'true')
      }
      else
      {
        dest.setAttribute('aria-hidden', 'false')
      }
    });

}

b_start();