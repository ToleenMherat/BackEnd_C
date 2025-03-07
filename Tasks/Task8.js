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
//CREATE
app.post("/games",async(req,res)=>{
try{
const {id,title,releaseYear}=req.body;
if (!id || !title||!releaseYear) return res.status(400).send({ message: "you should pass all the data (id,title,releaseYear)" })
    await prisma.user.create({ data: {id,title,releaseYear:Number(releaseYear) } });
res.status(201).send("Player is created !")
}
catch (err) {
    res.status(500).send({ error: { message: err.message } })
}
});
//GET
app.get("/games",async(req,res)=>{
    try{

const data=await prisma.user.findMany();
if (!data)return res.status(404).send({ message: "game isnot found" });
    res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
    });

    app.get("/games/:id",async(req,res)=>{
        try{
    
    const data=await prisma.user.findUnique({where:{id:req.params.id}});
    if (!data)return res.status(404).send({ message: "game isnot found" });
        res.status(200).send(data);
        }
        catch (err) {
            res.status(500).send({ error: { message: err.message } })
        }
        });
 //UPDATE   
app.put("/games", async (req, res) => {
    try {
        const { id, title,releaseYear } = req.body
        if (!id || !title || !releaseYear ) return res.status(400).send({ message: "you should pass all the data (id,title,releaseYear)" });
        const result=await prisma.user.update({where:{id},data:{title,releaseYear:Number(releaseYear)}});
        if (!result) return res.status(404).send({ message: "game's id is not found" });
        res.status(200).send({ message: "game is updated !" })
    } catch (err) {
        res.status(500).send({ error: { message: err.message } })
    }
});
//DELETE
app.delete("/games/:id",async(req,res)=>{
    try{
    const result=await prisma.user.delete({where:{id:req.params.id}});
    if (!result) return res.status(404).send({ message: "game's id is not found" })
        res.status(200).send("game is deleted !")
    }
    catch(err){
        res.status(500).send({ error: { message: err.message } });
    }
    });
    

app.listen(3001,()=>{
    console.log("listening on port 3001");
})