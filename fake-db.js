const users = {
  1: {
    id: 1,
    uname: 'alice',
    password: 'alpha',
  },
  2: {
    id: 2,
    uname: 'bob',
    password: 'bravo',
  },
  3: {
    id: 3,
    uname: 'carol',
    password: 'charlie',
  },
  4: {
    id: 4,
    uname: 'dave',
    password: 'delta',
  },
};

const posts = {
  101: {
    id: 101,
    title: "Fishsticks",
    link: "https://www.smithsonianmag.com/innovation/surprising-success-story-fish-sticks-180977578/",
    description: "I actually really do not like fish sticks",
    creator: 1,
    subgroup: 'food',
    timestamp: 1643648446955,
  },
  102: {
    id: 102,
    title: "Charlie the Unicorn",
    link: "https://www.youtube.com/watch?v=CsGYh8AacgY",
    description: "",
    creator: 2,
    subgroup: 'documentaries',
    timestamp: 1642611742010,
  },
  103: {
    id: 103,
    title: "The Best of Bach",
    link: "https://www.youtube.com/watch?v=6JQm5aSjX6g",
    description: "I love classical music",
    creator: 3,
    subgroup: 'music',
    timestamp: 1642691742010,
  },
  104: {
    id: 104,
    title: "The Best of Bach",
    link: "https://www.youtube.com/watch?v=6JQm5aSjX6g",
    description: "I love classical music",
    creator: 3,
    subgroup: 'music',
    timestamp: 1642691742010,
  },
  105: {
    id: 105,
    title: "The Best of Bach",
    link: "https://www.youtube.com/watch?v=6JQm5aSjX6g",
    description: "I love classical music",
    creator: 3,
    subgroup: 'music',
    timestamp: 1642691742010,
  },
  106: {
    id: 106,
    title: "The Best of Bach",
    link: "https://www.youtube.com/watch?v=6JQm5aSjX6g",
    description: "I love classical music",
    creator: 3,
    subgroup: 'music',
    timestamp: 1642691742010,
  },
  107: {
    id: 107,
    title: "The Best of Bach",
    link: "https://www.youtube.com/watch?v=6JQm5aSjX6g",
    description: "I love classical music",
    creator: 3,
    subgroup: 'music',
    timestamp: 1642691742010,
  },


};

const comments = {
  9001: {
    id: 9001,
    post_id: 102,
    creator: 1,
    description: "Actually I learned a lot :pepega:",
    timestamp: 1642691742010,
  }
}

const votes = [
  { user_id: 2, post_id: 101, value: +1 },
  { user_id: 3, post_id: 101, value: +1 },
  { user_id: 4, post_id: 101, value: +1 },
  { user_id: 3, post_id: 102, value: -1 },
]

function debug() {
  console.log("==== DB DEBUGING ====")
  console.log("users", users)
  console.log("posts", posts)
  console.log("comments", comments)
  console.log("votes", votes)
  console.log("==== DB DEBUGING ====")
}

function getUser(id) {
  return users[id];
}

function getUserByUsername(uname) {
  return Object.values(users).filter(user => user.uname === uname)[0]; 
}

function getVotesForPost(post_id) {
  return votes.filter(vote => vote.post_id === post_id);
}

function decoratePost(post) {
  // Get votes for the post, default to an empty array if no votes are found
  const votes = getVotesForPost(post.id) || [];

  // Add basic preview for the link
  const linkPreview = {
    url: post.link,
    previewText: getPreviewText(post.link), // This fetches a basic preview text
  };

  // Ensure linkPreview is always available
  post = {
    ...post,
    creator: users[post.creator],
    votes: votes,  // Assigning the fetched votes (guaranteed to be an array)
    comments: Object.values(comments).filter(comment => comment.post_id === post.id).map(comment => ({ ...comment, creator: users[comment.creator] })),
    linkPreview: linkPreview,  // Always include the linkPreview object
  };

  return post;
}


function getPreviewText(url) {
  // A simple placeholder function to display the URL or add a preview text
  // You can replace this with actual logic to fetch metadata from the link
  if (url.includes('youtube.com')) {
    return "Watch the video on YouTube";
  }
  if (url.includes('smithsonianmag.com')) {
    return "Explore the surprising success story of fish sticks.";
  }
  return "Click to view the post";
}


/**
 * @param {*} n how many posts to get, defaults to 5
 * @param {*} sub which sub to fetch, defaults to all subs
 */
function getPosts(n = 5, sub = undefined) {
  let allPosts = Object.values(posts);
  if (sub) {
    allPosts = allPosts.filter(post => post.subgroup === sub);
  }
  allPosts.sort((a, b) => b.timestamp - a.timestamp);
  return allPosts.slice(0, n);
}

function getPost(id) {
  return decoratePost(posts[id]);
}

function addPost(title, link, creator, description, subgroup) {
  let id = Math.max(...Object.keys(posts).map(Number)) + 1;
  let post = {
    id,
    title,
    link,
    description,
    creator: Number(creator),
    subgroup,
    timestamp: Date.now(),
  }
  posts[id] = post;
  return post;
}

function editPost(post_id, changes = {}) {
  let post = posts[post_id];
  if (changes.title) {
    post.title = changes.title;
  }
  if (changes.link) {
    post.link = changes.link;
  }
  if (changes.description) {
    post.description = changes.description;
  }
  if (changes.subgroup) {
    post.subgroup = changes.subgroup;
  }
}

function deletePost(post_id) {
  delete posts[post_id];
}

function getSubs() {
  return Array.from(new Set(Object.values(posts).map(post => post.subgroup)))
}

function addComment(post_id, creator, description) {
  let id = Math.max(...Object.keys(comments).map(Number)) + 1;
  let comment = {
    id,
    post_id: Number(post_id),
    creator: Number(creator),
    description,
    timestamp: Date.now(),
  }
  comments[id] = comment;
  console.log(comments);
  return comment;
}
function getCommentsPost(post_id) {
  return Object.values(comments)
    .filter(comment => comment.post_id == post_id)
    .map(comment => ({ 
      ...comment ,  
      creator: getUser(comment.creator) ,
    }))
}


function addUser(uname, password) {
  let id = Math.max(...Object.keys(users).map(Number)) + 1;
  let user = {
    id,
    uname,
    password,
  }
  users[id] = user;
  return user;
}

module.exports = {  
  addUser,
  getCommentsPost,
  debug,
  getUser,
  getUserByUsername,
  getPosts,
  getPost,
  addPost,
  editPost,
  deletePost,
  getSubs,
  decoratePost,
  addComment,
  getVotesForPost,
};