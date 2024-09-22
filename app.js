// Fetch posts from the backend
async function fetchPosts() {
  const response = await fetch('php/fetch_posts.php');
  const posts = await response.json();
  displayPosts(posts);
}

// Display posts
function displayPosts(posts) {
  const postWall = document.getElementById('post-wall');
  postWall.innerHTML = '';
  posts.forEach(post => {
      postWall.innerHTML += `
          <div class="post">
              <p>${post.content}</p>
              <button class="like-btn" onclick="likePost(${post.id})">Like (${post.likes})</button>
              <button onclick="deletePost(${post.id})">Delete</button>
          </div>
      `;
  });
}

// Create a new post
async function createPost() {
  const content = document.getElementById('post-content').value;
  const formData = new FormData();
  formData.append('content', content);

  const response = await fetch('php/create_post.php', {
      method: 'POST',
      body: formData
  });

  const result = await response.json();
  if (result.status === 'success') {
      fetchPosts();
  }
}

// Like a post
async function likePost(postId) {
  const formData = new FormData();
  formData.append('post_id', postId);

  const response = await fetch('php/like_post.php', {
      method: 'POST',
      body: formData
  });

  const result = await response.json();
  if (result.status === 'success') {
      fetchPosts();
  }
}

// Delete a post
async function deletePost(postId) {
  const formData = new FormData();
  formData.append('post_id', postId);

  const response = await fetch('php/delete_post.php', {
      method: 'POST',
      body: formData
  });

  const result = await response.json();
  if (result.status === 'success') {
      fetchPosts();
  }
}

// Fetch posts on page load
fetchPosts();
