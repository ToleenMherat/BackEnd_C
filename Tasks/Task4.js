const express=require("express");
const app=express();
//------------------------------------------------------------
let missions=[];
//------------------------------------------------------------
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/space",(req,res)=>{
console.log(req.body);
missions.push(req.body);
res.send("New Mission Is Added !");
});
//-----------------------------------------------------------
app.get("/space",(req,res)=>{
res.send(missions);
});
//-----------------------------------------------------------
app.get("/space/:id",(req,res)=>{
  let idnum=req.params.id;
  for(let i=0;i<missions.length;i++){
    if(missions[i].id===idnum){
        res.send(missions[i]);
    }
  }
  res.send("Mission Not Found !");
    }); 
 //----------------------------------------------------------
 app.put("/space",(req,res)=>{
let idnum=req.body.id;
for(let i=0;i<missions.length;i++){
    if(missions[i].id===idnum){
        missions[i]=req.body;
        res.send("Mission Is Updated ! ");
    }
}
res.send("Mission Not Found !");
 });
 //-------------------------------------------------------------
 app.delete("/space/:id",(req,res)=>{
let idinfo=req.params.id;
for(let i=0;i<missions.length;i++){
    if(missions[i].id===idinfo){
        missions.splice(i,1);
        res.send("Mission Is Cancelled");
    }
}
res.send("Mission Is not Found !");
 });
app.listen(3000,()=>{
console.log("listening on port 3000");
});

