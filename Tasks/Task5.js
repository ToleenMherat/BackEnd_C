
const express = require("express");
const app = express();
app.get("/movie", async (req, res) => {
   
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    res.send(data.results);
  
  });

app.get("/movie/:movieName", async (req, res) => {
    const movie= req.params.movieName;


        const response = await fetch(`https://swapi.dev/api/films/?search=${movie}`);
      
   
        const data = await response.json();
        console.log(data);

   

        const movieData = {
            id:data.results[0].episode_id,
            title: data.results[0].title,
            rated: data.results[0].director,
            date: data.results[0].release_date,
        
        };
        res.send(movieData);
  
    
});
app.get("/movie/:movieName/best", async (req, res) => {
    const movie= req.params.movieName;


    const response = await fetch(`https://swapi.dev/api/films/?search=${movie}`);
   
        const data = await response.json();
        console.log(data);


        const movieData = {
            id:data.results[0].episode_id,
            title: data.results[0].title,
            rated: data.results[0].director,
            date: data.results[0].release_date,
            best:true,}
       
        res.send(movieData);
    
 

    
});
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
