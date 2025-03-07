//Bowling Score Tracker API
const express=require("express");
const app = express();
const mysql = require("mysql2");
const { urlencoded, json } = require("body-parser")
const { PrismaClient } = require("@prisma/client");
app.use(urlencoded({ extended: true }));
app.use(json());
const dotenv = require("dotenv");
dotenv.config();
app.use(express.static("public"))
app.set("view engine", "ejs");
const prisma = new PrismaClient();

//Submit A Score
app.post("/scores",async(req,res)=>{
try{
    const {id,score}=req.body;
    if (!id || !score) return res.status(400).send({ message: "you should pass all the data (id,score)" })
        await prisma.user.create({ data: {id,score:Number(score) } });
    res.status(201).send("Player is created !")
} catch (err) {
    res.status(500).send({ error: { message: err.message } })
}
});

//Get Scores
app.get("/scores",async(req,res)=>{
    try{
        const data = await prisma.user.findMany({ select: { score: true }, orderBy: { score: "desc" } });
        if (data.length===0)return res.status(404).send({ message: "Player not found" });
        res.status(200).send(data);
      
    } catch (err) {
        res.status(500).send({ error: { message: err.message } });
    }
});

//Delete Specific Score
app.delete("/scores/:id",async(req,res)=>{
try{
const result=await prisma.user.delete({where:{id:req.params.id}});
if (!result) return res.status(404).send({ message: "Player id is not found" })
    res.status(200).send("Player is deleted")

}
catch(err){
    res.status(500).send({ error: { message: err.message } });
}
});

app.listen(3000,()=>{
console.log("Listening on port 3000");
});
