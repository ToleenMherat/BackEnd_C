//Student Grading System
let students=[];
//--------------------------------------------
function createStudent( name, age, mark){
return {stdname:name,stdage:age,stdmark:mark};
}
//--------------------------------------------
students.push(createStudent("Toleen",19,98));
students.push(createStudent("leen",19,45));
students.push(createStudent("Talia",19,97));
students.push(createStudent("Ain",19,99));
students.push(createStudent("Mina",19,49));
//------------------------------------------
let success=[];
let failed=[];
//----------------------------------------
for(let i=0;i<students.length;i++){
    if(students[i].stdmark>=50){
        success.push(students[i]);
   
    }
    else{
        failed.push(students[i]);
      
     
    }
}
//-------------------------------------
console.log("Success Students: ",success);

console.log("Failed Students: ",failed);

//------------------------------------