Here's an explanation of the code in detail:
You can view this live on render: https://beer-blog-xu7h.onrender.com/

---

### Overview

This code sets up a simple blog application using **Node.js**, **Express**, and **EJS** as the templating engine. The app allows users to create blog posts, view all posts, and read individual posts via unique URLs.

---

### Code Breakdown

#### 1. Importing Modules

```javascript
import express from "express";
import bodyParser from "body-parser";
```

The application uses:
- `express`: for creating the server and managing routing.
- `bodyParser`: to parse incoming request bodies, but in this code, it isn’t actively used because `express.urlencoded()` is used instead.

#### 2. Setting Up Express App

```javascript
const app = express();
const port = 3030;
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
let post = [];
```

- **app**: Initializes the Express application.
- **port**: The port the server will run on.
- **contactContent**: A sample text to display on the contact page.
- **post**: An array to store blog posts temporarily.

#### 3. Configuring Middleware and Templating Engine

```javascript
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
```

- `app.set("view engine", "ejs")`: Sets **EJS** as the templating engine to render views.
- `express.urlencoded({ extended: true })`: Parses form data from POST requests.
- `express.static("public")`: Serves static files (like CSS) from the `public` directory.

#### 4. Utility Function: `generateSlug`

```javascript
function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
```

This function converts a post title to a URL-friendly "slug":
- Converts the title to lowercase.
- Removes any leading or trailing spaces.
- Replaces non-alphanumeric characters with hyphens.
- Trims hyphens from the beginning and end.

#### 5. Routes

##### `GET /` - Home Page

```javascript
app.get("/", (req, res) => {
    res.render("index.ejs");
});
```

Renders the homepage (`index.ejs`).

##### `GET /create-blog` - Blog Creation Page

```javascript
app.get("/create-blog", (req, res) => {
    const today = new Date().toISOString().split("T")[0];
    res.render("create.ejs", { currentDate: today });
});
```

Renders `create.ejs` with the current date for use in the form. The date is formatted as `"YYYY-MM-DD"`.

##### `POST /create-blog` - Creating a Blog Post

```javascript
app.post("/create-blog", (req, res) => {
    const title = req.body.posttitle;
    const slug = generateSlug(title);

    const allpost = {
        id: (post.length + 1).toString(),
        slug: slug,
        title: title,
        content: req.body.blogContent,
        username: req.body.username,
        date: req.body.date,
        category: req.body.category,
    };

    post.push(allpost);
    res.redirect("/view");
});
```

- Receives form data (title, content, username, date, category) from the blog creation page.
- Generates a unique `slug` from the title.
- Constructs an `allpost` object with a unique ID, title, content, and other details.
- Pushes this `allpost` object to the `post` array and redirects to `/view` to display all posts.

##### `GET /view` - View All Posts

```javascript
app.get("/view", (req, res) => {
    res.render("view.ejs", { post });
});
```

Renders `view.ejs` to display all posts from the `post` array.

##### `GET /post/:slug` - Read a Single Post

```javascript
app.get("/post/:slug", (req, res) => {
    const postSlug = req.params.slug;
    console.log('Post Slug from URL:', postSlug);

    const postToRender = post.find(allpost => allpost.slug === postSlug);

    if (postToRender) {
        res.render("read", { post: postToRender });
    } else {
        res.status(404).send("Post not found");
    }
});
```

- Extracts the `slug` from the URL.
- Finds the post with the matching `slug` in the `post` array.
- If found, renders `read.ejs` with the post’s details; otherwise, returns a 404 error if not found.

##### `GET /contact` - Contact Page

```javascript
app.get("/contact", (req, res) => {
    res.render("contact.ejs", { contactContent: contactContent });
});
```

Renders a contact page (`contact.ejs`) with the text stored in `contactContent`.

##### `GET /about` - About Page

```javascript
app.get("/about", (req, res) => {
    res.render("about.ejs", { contactContent: contactContent });
});
```

Renders an about page (`about.ejs`) using the same `contactContent`.

#### 6. Starting the Server

```javascript
app.listen(port, () => {
    console.log("Server started at port " + port);
});
```

This line starts the server on the specified port (3030) and logs a message indicating the server is running.

---

### Summary

This code provides a basic blog platform with routes for creating, viewing, and reading posts. Each post has a unique URL based on its title, thanks to the `generateSlug` function. The app also includes static "Contact" and "About" pages with sample text. The structure is modular, making it easy to extend or modify in the future.
