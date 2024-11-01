import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 4000;
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut augue diam, finibus in tristique non, faucibus at nibh. Integer quis sem iaculis, lobortis nisi sed, elementum purus. Mauris condimentum mi non elit volutpat pretium. Nulla eu tristique elit. Proin vulputate fringilla aliquet. Nulla tristique varius ipsum non tempus. Etiam dapibus elit id libero consectetur, id aliquam ligula euismod. Aenean iaculis quis mauris blandit mattis. Fusce at scelerisque sapien. Duis aliquet a urna ut dignissim. Sed mollis a diam quis faucibus. Vivamus et placerat tellus. Quisque auctor imperdiet sodales. Donec pretium suscipit purus, in mollis est tristique sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fringilla ornare nisl, et rutrum mi tincidunt ac.";
let post = [];


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create-blog", (req, res) => {
    const today = new Date().toISOString().split("T")[0];
    res.render("create.ejs", { currentDate: today });
});

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

app.get("/view", (req, res) => {
    res.render("view.ejs", { post });
});

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

app.get("/contact", (req, res) => {
    res.render("contact.ejs", { contactContent: contactContent });
});
app.get("/about", (req, res) => {
    res.render("about.ejs", { contactContent: contactContent });
});


app.listen(port, () => {
    console.log("Server started at port " + port);
});
