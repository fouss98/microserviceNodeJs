var express = require("express");

var app = express();

var data = [
    {id : 1, language: "javascript"},
    {id : 2, language: "java"},
    {id : 3, language: "PHP"},
]

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

app.get("/", function(request, response)  {
   
    response.status(200).json(data);
});

app.get("/:id", function(request, response)  {
   
    const { id }= request.params
    const one = data.find(el =>el.id===+id)
    if(!one) return response.json({message: "not found"})
    response.status(200).json(one);
});

app.use(express.json())
app.post('/', (req, res) => {
    const { body }= req
    const newData = {
        id: data.length + 1,
        language:req.body.language
        
    }
    data.push(newData)
    res.status(201).json(newData)
})


app.put('/id', (req, res) => {
    const { id }= req.params
    const one = data.find(el =>el.id===+id)
    
    if (!one) {
        return res.status(404).send('data not found')
    }
    const updatedData = {
        id: products[index].id,
        language: req.body.language,
       
    }
    data[one] = updatedData
    res.status(200).json('data updated')
})

app.delete('/:id', (req, res) => {
    const { id }= req.params
    const one = data.find(el =>el.id===+id)
    
    if (!one) {
        return res.status(404).send('data not found')
    }
    data.splice(one,1)
    res.status(200).json('data deleted')
})