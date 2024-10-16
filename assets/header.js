document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const navItems = document.querySelectorAll('.nav-item');
  const hamburger = document.querySelector('.hamburger');
  const header = document.querySelector('.header');

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
      }, 200); // Small delay to prevent accidental closing
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

        // Close all nested dropdowns except the current one
        document.querySelectorAll('.nested-dropdown.show').forEach((dropdown) => {
          if (dropdown !== nestedDropdown) {
            dropdown.classList.remove('show');
          }
        });

        // Toggle the clicked nested dropdown
        nestedDropdown.classList.toggle('show');
      } else {
        // Close all nested dropdowns when clicking on a non-parent menu item
        document.querySelectorAll('.nested-dropdown.show').forEach((dropdown) => {
          dropdown.classList.remove('show');
        });
      }

      removeAllActive();
      this.classList.add('active');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) {
      closeAllDropdowns();
      removeAllActive();
    }
  });

  // Toggle header visibility on hamburger click
  hamburger.addEventListener('click', function () {
    header.classList.toggle('show');
  });
});