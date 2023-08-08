const express = require('express');
const app = express();
//const ejs = require('ejs');
app.use(express.urlencoded({extended:true}))
const mongoDb=require('./todo.js');
const { default: mongoose } = require('mongoose');

app.use(express.json());
app.set('view engine','ejs');
app.use('/static',express.static('public'));
//mongoose.set('use',false)
app.get('/',async(req,res)=>{
    const todoData= await mongoDb.find({})
        res.render('todo.ejs',{todoTasks:todoData});
    
   // console.log(todoData);
    
})
app.get('/',(req,res)=>{
    res.render('todo.ejs')
})

app.post('/',async (req,res)=>{
    const data ={
        content:req.body.content
        

    }
   // console.log(req.body);
    await mongoDb.insertMany([data]);
    console.log('data added in database')
    res.redirect('/');
});

app.route('/edit/:id').get(async(req,res)=>{
    const id=req.params.id;

   const todoData= await mongoDb.find({});
   console.log(todoData)
   res.render('todoEdit.ejs',{todoTasks:todoData,idTask:id});
}).post(async(req,res)=>{
    const id=req.params.id;
  const updateData= await  mongoDb.findByIdAndUpdate(id,{content:req.body.content});
    res.redirect('/');
    
});
app.route('/remove/:id').get(async(req,res)=>{
    const id = req.params.id;
   const removedata=await mongoDb.findByIdAndRemove(id);
    res.redirect('/')
})






app.listen(4000,()=>{
    console.log('server has started ');
})