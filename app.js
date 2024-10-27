const express = require('express')
const app = express()  
    const fs = require('fs');

app.set('view engine', "ejs")



app.get('/', (req, res) => {
    fs.readdir("./notes", (err, files) => {      
        //  console.log(files);        
        res.render("index", {   
        notes: files         
        });
    })
})

app.get('/new', (req, res) => {  
    res.render('new')
})

app.get('/new-note', (req, res) => {  
    // console.log(req.query)
    // const title =req.query.title 
    // const description =req.query.description

    fs.writeFile(`./notes/${req.query.title}`, req.query.description, (err) => {
        res.redirect("/")            
    })

})

app.get('/notes/:title', (req, res) => {
    const title = req.params.title
    fs.readFile(`./notes/${title}`, "utf-8", (err, data) => {
        res.send(data)
    })
})

app.get('/show-details/:title', (req, res) => {  
    const title = req.params.title    
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

    fs.readFile(`./notes/${title}`, "utf-8", (err, data) => { 
        // console.log(data)
        res.render('edit', {  
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
        fs.writeFile(`./notes/${title}`,description,(err)=>{
            console.log(err)
            res.redirect('/')
        })

    })
})
app.listen(3000, () => {
    console.log('server is running on port 3000')
})




