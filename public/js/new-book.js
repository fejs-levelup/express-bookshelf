;(function() {
  "use strict";

  const form = document.querySelector("#new-book");

  form.addEventListener("submit", saveNewBook);

  function saveNewBook(ev) {
    ev.preventDefault();

    const data = new FormData(this);

    fetch("/new-book", {
      method: "POST",
      body: data
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.error(e);
    })
  }
})();