/* BlocksEstate — progressive enhancement, no analytics or external requests. */
(() => {
  "use strict";

  const lenses = {
    space: {
      title: "PHYSICAL SPACE",
      description: "Land, buildings and the urban block."
    },
    modular: {
      title: "MODULAR SYSTEMS",
      description: "The repeatable building blocks of development."
    },
    digital: {
      title: "DIGITAL STRUCTURES",
      description: "Connected data and property infrastructure."
    },
    ownership: {
      title: "OWNERSHIP",
      description: "Rights, participation and enduring assets."
    }
  };

  const choices = Array.from(document.querySelectorAll(".semantic-choice[data-lens]"));
  const title = document.getElementById("lens-title");
  const description = document.getElementById("lens-description");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (!choices.length || !title || !description) return;

  function selectLens(lens) {
    const next = lenses[lens];
    if (!next) return;
    document.documentElement.dataset.lens = lens;
    title.textContent = next.title;
    description.textContent = next.description;
    for (const button of choices) {
      button.setAttribute("aria-pressed", String(button.dataset.lens === lens));
    }
  }

  choices.forEach((button, index) => {
    button.addEventListener("click", () => selectLens(button.dataset.lens));

    // Arrow keys let keyboard users inspect the four conceptual dimensions quickly.
    button.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % choices.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + choices.length) % choices.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = choices.length - 1;
      const next = choices[nextIndex];
      next.focus();
      selectLens(next.dataset.lens);
    });
  });

  selectLens("space");
})();