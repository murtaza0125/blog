import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
var blogs = {};


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        blogPosts: blogs,
    })
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    blogs[(req.body['blogTitle'])] = req.body['blog'];
    res.redirect("/");
    console.log(blogs);
});

app.get("/check/:title", async (req, res) => {
    const title = req.params.title;
    res.render("read.ejs", {
        heading: title,
        body: blogs[title]
    });
});

app.listen(port, ()=> {
    console.log(`Listening to port ${port}`);
});