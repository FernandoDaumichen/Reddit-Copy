const users = {
  1: {
    id: 1,
    uname: 'Alice',
    password: 'alpha',
  },
  2: {
    id: 2,
    uname: 'Bob5weet',
    password: 'bravo',
  },
  3: {
    id: 3,
    uname: 'CarolNine9',
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
    description: "I actually really do not like fish sticks.",
    creator: 1,
    subgroup: "Food",
    timestamp: 1643648446955,
  },
  102: {
    id: 102,
    title: "Homemade Pizza Tips",
    link: "https://www.pizzamaking.com/",
    description: "Master the art of making pizza at home.",
    creator: 1,
    subgroup: "Food",
    timestamp: 1643655446955,
  },
  103: {
    id: 103,
    title: "Charlie the Unicorn",
    link: "https://www.youtube.com/watch?v=CsGYh8AacgY",
    description: "A classic and absurd internet gem!",
    creator: 2,
    subgroup: "Entertainment",
    timestamp: 1642611742010,
  },
  104: {
    id: 104,
    title: "Understanding Quantum Computing",
    link: "https://www.ibm.com/quantum-computing/",
    description: "Learn the basics of quantum computing.",
    creator: 2,
    subgroup: "Technology",
    timestamp: 1642618742010,
  },
  105: {
    id: 105,
    title: "The Best of Bach",
    link: "https://www.youtube.com/watch?v=6JQm5aSjX6g",
    description: "I love classical music; it helps me focus.",
    creator: 3,
    subgroup: "Music",
    timestamp: 1642691742010,
  },
  106: {
    id: 106,
    title: "Mozart's Greatest Hits",
    link: "https://www.youtube.com/watch?v=tdOCrgGRNBM",
    description: "My go-to playlist for relaxation.",
    creator: 3,
    subgroup: "Music",
    timestamp: 1642781742010,
  },
  107: {
    id: 107,
    title: "Top 10 JavaScript Frameworks",
    link: "https://www.freecodecamp.org/news/10-best-javascript-frameworks/",
    description: "Choosing the right framework for your next project.",
    creator: 4,
    subgroup: "Programming",
    timestamp: 1642871742010,
  },
  108: {
    id: 108,
    title: "React vs. Angular",
    link: "https://blog.logrocket.com/react-vs-angular/",
    description: "A detailed comparison for modern web developers.",
    creator: 4,
    subgroup: "Programming",
    timestamp: 1642961742010,
  },
  109: {
    id: 109,
    title: "Best Sci-Fi Movies of 2024",
    link: "https://www.imdb.com/list/ls023456789/",
    description: "A roundup of the must-watch sci-fi films this year.",
    creator: 1,
    subgroup: "Movies",
    timestamp: 1643051742010,
  },
  110: {
    id: 110,
    title: "Why Cats Rule the Internet",
    link: "https://www.history.com/why-cats-rule-the-internet",
    description: "A deep dive into humanity's obsession with cats.",
    creator: 5,
    subgroup: "Pets",
    timestamp: 1643141742010,
  },
  111: {
    id: 111,
    title: "Exploring the Rockies",
    link: "https://www.rockies.com/",
    description: "Top trails and tips for your next adventure.",
    creator: 5,
    subgroup: "Outdoors",
    timestamp: 1643231742010,
  },
  112: {
    id: 112,
    title: "The History of Jazz",
    link: "https://www.jazzhistoryonline.com/",
    description: "Tracing the roots of one of the greatest music genres.",
    creator: 3,
    subgroup: "Music",
    timestamp: 1643501742010,
  },
  113: {
    id: 113,
    title: "The Future of AI",
    link: "https://www.ted.com/talks/future-of-ai",
    description: "Exploring the possibilities and ethical implications of AI.",
    creator: 2,
    subgroup: "Technology",
    timestamp: 1643681742010,
  },
  114: {
    id: 114,
    title: "Beginner's Guide to Yoga",
    link: "https://www.yogajournal.com/",
    description: "Simple tips to start your yoga journey today.",
    creator: 6,
    subgroup: "Health & Wellness",
    timestamp: 1643591742010,
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
  const creator = users[post.creator]; // Fetch the creator by ID

  return {
    ...post,
    creator: creator || { uname: "Unknown User", id: null }, // Include a fallback for creator
    votes: getVotesForPost(post.id),
    comments: getCommentsPost(post.id),
    linkPreview: {
      url: post.link,
      previewText: getPreviewText(post.link),
    },
  };
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
  const subs = Array.from(new Set(Object.values(posts).map(post => post.subgroup || ""))).filter(Boolean);
  return subs;
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