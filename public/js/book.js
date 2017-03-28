;(function() {
  "use strict";

  let commentForm = document.querySelector("#new-comment");

  commentForm.addEventListener("submit", ev => {
    ev.preventDefault();

    let content = commentForm.querySelector("#new-comment-content").value;
    let author = commentForm.querySelector("#new-comment-author").value;
    let bookId = commentForm.querySelector("#book-id").value;

    fetch("/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        content,
        author,
        bookId
      })
    }).
    then(res => res.json()).
    then(res => {
      console.log(res);
      let parentNode = document.querySelector(".comments-container");
      renderComment(res.comment, parentNode);
    }).
    catch(e => {
      console.error(e);
    });
  });

  function renderComment(comment, parentNode) {
    let fragment = document.createDocumentFragment();

    let commentContent = document.createElement("p");
    let commentAuthor = document.createElement("p");
    let hr = document.createElement("hr");

    commentContent.className = "comment-content";
    commentAuthor.className = "comment-author";

    commentContent.textContent = comment.content;
    commentAuthor.textContent = comment.author;

    fragment.appendChild(hr);
    fragment.appendChild(commentContent);
    fragment.appendChild(commentAuthor);

    parentNode.insertBefore(fragment, parentNode.firstChild);
  }
})();












