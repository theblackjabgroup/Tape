document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const navItems = document.querySelectorAll('.nav-item');
  const hamburger = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const mobileHeaderDrawer = document.querySelector('.mobile-header-drawer');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const closeIcon = document.querySelector('.close-icon');
  
  hamburger.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault(); 
      toggleMenu();
    }
    if (event.key === 'Escape') {
      if (hamburger.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    }
  });

  function toggleMenu() {
    header.classList.toggle('show');
    hamburger.classList.toggle('active');
    mobileHeaderDrawer.classList.toggle('open');
    
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-container.show, .nested-dropdown.show').forEach((dropdown) => {
      dropdown.classList.remove('show');
    });
  }

  function removeAllActive() {
    navLinks.forEach((link) => link.classList.remove('active'));
    dropdownItems.forEach((item) => item.classList.remove('active'));
  }

  function showDropdown(navItem) {
    const dropdownContainer = navItem.querySelector('.dropdown-container');
    if (dropdownContainer) {
      closeAllDropdowns();
      removeAllActive();
      dropdownContainer.classList.add('show');
      navItem.querySelector('.nav-link').classList.add('active');
    }
  }

  function hideDropdown(navItem) {
    const dropdownContainer = navItem.querySelector('.dropdown-container');
    if (dropdownContainer) {
      dropdownContainer.classList.remove('show');
      navItem.querySelector('.nav-link').classList.remove('active');
    }
  }

  navItems.forEach((navItem) => {
    let hoverTimeout;

    navItem.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      showDropdown(navItem);
    });

    navItem.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        hideDropdown(navItem);
      }, 200);
    });

    const navLink = navItem.querySelector('.nav-link');
    navLink.addEventListener('click', function (e) {
      const dropdownContainer = this.nextElementSibling;

      if (dropdownContainer && dropdownContainer.classList.contains('dropdown-container')) {
        e.preventDefault();
        e.stopPropagation();

        if (dropdownContainer.classList.contains('show')) {
          hideDropdown(navItem);
        } else {
          showDropdown(navItem);
        }
      } else {
        closeAllDropdowns();
        removeAllActive();
        this.classList.add('active');
      }
    });
  });

  dropdownItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      const nestedDropdown = this.nextElementSibling;

      if (nestedDropdown && nestedDropdown.classList.contains('nested-dropdown')) {
        e.preventDefault();
        e.stopPropagation();

        document.querySelectorAll('.nested-dropdown.show').forEach((dropdown) => {
          if (dropdown !== nestedDropdown) {
            dropdown.classList.remove('show');
          }
        });

        nestedDropdown.classList.toggle('show');
      } else {
        document.querySelectorAll('.nested-dropdown.show').forEach((dropdown) => {
          dropdown.classList.remove('show');
        });
      }

      removeAllActive();
      this.classList.add('active');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) {
      closeAllDropdowns();
      removeAllActive();
    }
  });

  hamburger.addEventListener('click', function () {
    header.classList.toggle('show');
    hamburger.classList.toggle('active');
    mobileHeaderDrawer.classList.toggle('open');
  });

  mobileNavItems.forEach((item) => {
    const link = item.querySelector('.mobile-nav-link');
    const dropdown = item.querySelector('.mobile-dropdown');
    
    if (link && dropdown) {
      const hasChildren = dropdown.children.length > 0;
      
      if (hasChildren) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          
          item.classList.toggle('open');
          dropdown.classList.toggle('show');
          
          mobileNavItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains('open')) {
              otherItem.classList.remove('open');
              const otherDropdown = otherItem.querySelector('.mobile-dropdown');
              if (otherDropdown) {
                otherDropdown.classList.remove('show');
              }
            }
          });
        });
        
        const caretIcon = link.querySelector('.svg-wrapper');
        if (caretIcon) {
          caretIcon.style.display = 'inline-flex';
        }
      } else {
        const caretIcon = link.querySelector('.svg-wrapper');
        if (caretIcon) {
          caretIcon.style.display = 'none';
        }
        
        if (dropdown.children.length === 0) {
          dropdown.remove();
        }
      }
    }
  });

  document.querySelectorAll('.mobile-dropdown-item-container').forEach((container) => {
    const item = container.querySelector('.mobile-dropdown-item');
    const nestedDropdown = container.querySelector('.mobile-nested-dropdown');
    
    if (item && nestedDropdown) {
      const hasChildren = nestedDropdown.children.length > 0;
      
      if (hasChildren) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          
          nestedDropdown.classList.toggle('show');
          container.classList.toggle('open');
          
          const parentDropdown = container.closest('.mobile-dropdown');
          if (parentDropdown) {
            parentDropdown.querySelectorAll('.mobile-dropdown-item-container').forEach((otherContainer) => {
              if (otherContainer !== container && otherContainer.classList.contains('open')) {
                otherContainer.classList.remove('open');
                const otherNestedDropdown = otherContainer.querySelector('.mobile-nested-dropdown');
                if (otherNestedDropdown) {
                  otherNestedDropdown.classList.remove('show');
                }
              }
            });
          }
        });
        
        const caretIcon = item.querySelector('.svg-wrapper');
        if (caretIcon) {
          caretIcon.style.display = 'inline-flex';
        }
      } else {
        const caretIcon = item.querySelector('.svg-wrapper');
        if (caretIcon) {
          caretIcon.style.display = 'none';
        }
        
        if (nestedDropdown.children.length === 0) {
          nestedDropdown.remove();
        }
      }
    }
  });
  
  document.addEventListener('click', function(e) {
    if (!mobileHeaderDrawer.contains(e.target) && !hamburger.contains(e.target)) {
      mobileHeaderDrawer.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  closeIcon.addEventListener('click', function() {
    mobileHeaderDrawer.classList.remove('open');
    hamburger.classList.remove('active');
  });

  let scrollDistance = parseFloat(localStorage.getItem('scrollDistance')) || 0;
  let prevScrollY = window.scrollY;

  const scrollDistanceElements = document.querySelectorAll('.scroll-distance');
  const updateScrollDisplays = () => {
    scrollDistanceElements.forEach(el => {
      el.textContent = scrollDistance.toFixed(2);
    });
  };

  updateScrollDisplays();

  let ticking = false;

  const updateScrollDistance = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - prevScrollY);

      scrollDistance += deltaY / 1000000;

      updateScrollDisplays();
      localStorage.setItem('scrollDistance', scrollDistance);

      prevScrollY = currentScrollY;
      ticking = false;
    });
  };

  window.addEventListener('scroll', updateScrollDistance, { passive: true });

  document.getElementById('scroll-to-bottom')?.addEventListener('click', () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });
});
