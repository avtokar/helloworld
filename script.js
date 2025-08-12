const commentsList = document.getElementById('comments');
const commentForm = document.getElementById('comment-form');
const usernameInput = document.getElementById('username-input');
const commentInput = document.getElementById('comment-input');
const submit = document.getElementById('submit');
const likeButt = document.getElementById('likeButt');
const likesCount = document.getElementById('likesCount');

commentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newComment = document.createElement('li');
    newComment.classList.add('comment');

    const innerComment = document.createElement('div');
    innerComment.classList.add('comment-body');

    const commentHeader = document.createElement('div');
    commentHeader.classList.add('comment-header');

    const commentText = document.createElement('div');
    commentText.classList.add('comment-text');

    const commentFooter = document.createElement('div')
    commentFooter.classList.add('comment-footer');

    const likeEl = document.createElement('div')
    likeEl.classList.add('likes');
    likeEl.innerHTML = `<span id="likesCount" class="likes-counter">0</span>
    <button id=likeButt class="like-button -active-like"></button>`;

   /*  let currentCount = 0;
    likeButt.addEventListener('click', () => {
        likesCount.textContent = ++currentCount;
        console.log(likesCount);
    }); */

    commentHeader.innerHTML = `
<p><strong>${usernameInput.value}</strong></p>`;

    const dateTime = document.createElement('div');



    const now = new Date();
    const formattedDate = now.toLocaleString();

    dateTime.textContent = formattedDate;

    commentText.innerHTML = `
<p><strong>${commentInput.value}</strong></p>`;

    commentHeader.appendChild(dateTime)
    innerComment.appendChild(commentText);
    commentFooter.appendChild(likeEl);
    newComment.appendChild(commentHeader);
    newComment.appendChild(innerComment);
    newComment.appendChild(commentFooter);
    commentsList.appendChild(newComment);

    commentForm.reset();
});




