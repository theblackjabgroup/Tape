document.addEventListener("DOMContentLoaded", function() {
  const wrap = document.getElementsByClassName('bb-announcement-bar-wrapper');
        if (wrap.length > 0)
        {
          const color = wrap[0].getAttribute('data-color-scheme');
          const bar = document.getElementsByClassName('announcement-bar-section');
        if(bar.length > 0){
        bar[0].classList.add(`color-${color}`);
        }
        }

          });
      