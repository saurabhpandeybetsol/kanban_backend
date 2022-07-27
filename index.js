const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');



dotenv.config();

mongoose.connect(process.env.MONGO_URL
    ).then(()=>console.log("DBconnection suceess")).catch((err)=>{
        console.log(err);
});

const taskSchema=new mongoose.Schema({
    title:String,
    desc:String,
    status:String,
    priority:String,
    storypoint:Number
});


const Task=mongoose.model("Task",taskSchema);

const app=express();

app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.get("/api/getTasks",async (req,res)=>{
   const data= await Task.find();

    res.send(data);
});

app.get("/api/getTasks/Inprogress",async (req,res,err)=>{
    try{
        var query= await Task.find({status:'InProgress'});
        res.send(query);
    }catch(err){
       console.log(err);
    }
});

app.get("/api/getTasks/completed",async (req,res,err)=>{
    try{
        var query= await Task.find({status:'completed'});
         res.send(query);
    }catch(err){
       console.log(err);
    }
});
app.get("/api/getTasks/NotCompleted",async (req,res,err)=>{
    try{
        var query= await Task.find({status:'NotCompleted'});
        res.send(query);
    }catch(err){
           console.log(err);
    }
   
});
app.post("/api/tasks",async (req,res)=>{
   const TaskData=new Task({
    title:req.body.Title,
    desc:req.body.Desc,
    status:req.body.Status,
    priority:req.body.Priority,
    storypoint:req.body.StoryPoint,
     
   });

   const savedData=await TaskData.save();
   res.send(savedData);
   console.log(savedData);
   
});

app.put("/api/update/tasks", async (req,res)=>{

   const Data={
    title:req.body.Title,
    desc:req.body.Desc,
    status:req.body.Status,
    priority:req.body.Priority,
    storypoint:req.body.StoryPoint
   }
   console.log(Data);
   console.log(req.body.id);
    Task.findByIdAndUpdate(req.body.id,{
    title:req.body.Title,
    desc:req.body.Desc,
    status:req.body.Status,
    priority:req.body.Priority,
    storypoint:req.body.StoryPoint,
   },(err,doc)=>{
     if(err){
        console.log(err);
     }
     else{
        res.send(doc);
        console.log(doc);
     }
   });

   
});

app.listen(process.env.PORT || 3005,()=>{
     console.log("backend server is running on port 3005");
});

