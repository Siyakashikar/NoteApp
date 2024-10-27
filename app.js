const express = require('express')
const app = express()  //calling express
const fs = require('fs');

// // view engine ko set krre hai hamne ejs view engine use kiya hai
app.set('view engine', "ejs")


// //Home page banare hai jo ki / route pe dhikhega
app.get('/', (req, res) => {
    fs.readdir("./notes", (err, files) => {      //notes folder me kitni files hai ye pata karne ke liye fs use kiya hai
        //  console.log(files); //isse data milra hai array ke form me
        res.render("index", {    //files =notes
            notes: files         //notes naam se files ke ander jo bhi data aara hai vo bhej dere hai index page pe
        });
    })
})

// //yha hamne ek /new route create kiya hai jo ki render hora hai new page pe
app.get('/new', (req, res) => {  //new route pe hamko ek form dhikhega
    res.render('new')
})

// // new page ke form ka data server tak phochana hai to ham create karege ek route ->/new-note
app.get('/new-note', (req, res) => {  //submit hone pe data req.query me aayga
    // console.log(req.query)
    // const title =req.query.title 
    // const description =req.query.description

    //note create karne ke liye fs ka use krre hai
    fs.writeFile(`./notes/${req.query.title}`, req.query.description, (err) => {
        res.redirect("/")            //query me do chij hoti hai title & contained
    })

})

//:ke bad vala part dynamic hoga
app.get('/notes/:title', (req, res) => {
    const title = req.params.title
    fs.readFile(`./notes/${title}`, "utf-8", (err, data) => {
        res.send(data)
    })
})

app.get('/show-details/:title', (req, res) => {  //title is dynamic so params read the dynamic value
    const title = req.params.title    //params used to create a dynamic routes
    // res.render('details')
    // res.send(title)
    fs.readFile(`./notes/${title}`, "utf-8", (err, data) => {
        res.render('details', {
            title,
            description: data
        })
    })

})

app.get('/edit/:title', (req, res) => {
    const title = req.params.title

    fs.readFile(`./notes/${title}`, "utf-8", (err, data) => { //readfile ka cpntent hota hai data me
        // console.log(data)
        res.render('edit', {  //yha edit page ko render krre hai sath hi sath data or title bhrjre hai edit page pe
            title: title,
            description: data

        })
    })
})

app.get('/edit-note/:oldTitle', (req, res) => {
    const oldTitle = req.params.oldTitle
    const title = req.query.title
    const description = req.query.description

    fs.rename(`./notes/${oldTitle}`, `./notes/${title}`, (err) => {
  //curent file ka adress and sec parameter rename krke kya hona
        fs.writeFile(`./notes/${title}`,description,(err)=>{
            console.log(err)
            res.redirect('/')
        })

    })
})
app.listen(3000, () => {
    console.log('server is running on port 3000')
})




