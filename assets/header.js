document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const navItems = document.querySelectorAll('.nav-item');
  const hamburger = document.querySelector('.hamburger');
  const header = document.querySelector('.header');
  const mobileHeaderDrawer = document.querySelector('.mobile-header-drawer');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const closeIcon = document.querySelector('.close-icon');

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
    mobileHeaderDrawer.classList.toggle('open');
  });

  // Mobile dropdown functionality
  mobileNavItems.forEach((item) => {
    const link = item.querySelector('.mobile-nav-link');
    const dropdown = item.querySelector('.mobile-dropdown');

    link.addEventListener('click', function (e) {
      e.preventDefault();

      if (dropdown) {
        item.classList.toggle('open');
        dropdown.classList.toggle('show');

        // Close other open dropdowns
        mobileNavItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            const otherDropdown = otherItem.querySelector('.mobile-dropdown');
            if (otherDropdown) {
              otherDropdown.classList.remove('show');
            }
          }
        });
      }
    });
  });

  // Mobile nested dropdown functionality
  const mobileDropdownItems = document.querySelectorAll('.mobile-dropdown-item');
  mobileDropdownItems.forEach((item) => {
    const nestedDropdown = item.nextElementSibling;
    if (nestedDropdown && nestedDropdown.classList.contains('mobile-nested-dropdown')) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        nestedDropdown.classList.toggle('show');
        // Add 'open' class to mobile-dropdown-item-container
        const container = this.closest('.mobile-dropdown-item-container');
        if (container) {
          container.classList.toggle('open');
        }
      });
    }
  });

  // Close mobile drawer when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileHeaderDrawer.contains(e.target) && !hamburger.contains(e.target)) {
      mobileHeaderDrawer.classList.remove('open');
    }
  });

  // Close mobile drawer when clicking the close icon
  closeIcon.addEventListener('click', function() {
    mobileHeaderDrawer.classList.remove('open');
  });
});