document.querySelectorAll(".card__container").forEach((card) => {
    const box = card.querySelector(".description__container");
    const openbutton = card.querySelector(".description__button__container");
    const closeButton = card.querySelector(".description__close__button");
    const icon = card.querySelector(".description__button__inner_container");

    openbutton.addEventListener("click", () => {
      box.classList.add("active");
      icon.classList.add("active");
    });

    closeButton.addEventListener("click", () => {
      box.classList.remove("active");
      icon.classList.remove("active");
    });
  });