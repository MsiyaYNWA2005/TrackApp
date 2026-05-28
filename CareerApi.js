async function Get_fetch(){
    const student_name = document.getElementById("nameID").value;
    const student_surname=document.getElementById("surnameID").value;
    let response = await fetch(`http://localhost:3000/get-data-firebase?name=${student_name}&surname=${student_surname}`);
    let data  =  await response.json();
    return data;
}


async function Marks(){
    const data = await Get_fetch();

    if(data.length===0){
        alert("Student not found");
        return;
    }
    const marks= data[0].subject_marks;
    await getMarks(marks)
}

const sectic=document.getElementById("career_marks");

async function getMarks(marks) {
    let Markstring="";
    for(let i =0;i<marks.length;i++){
        const subject = Object.keys(marks[i])[0];
        const  mark = Object.values(marks[i])[0];

        Markstring += `${subject}:${mark}%,`;
    }

    console.log(Markstring);

const prompt = `
    ${Markstring}
    Based on these marks, suggest 3 career paths that suit 
    this student's strengths. For each career explain why 
    it suits them based on their best subjects.
`;

 sectic.innerHTML = "";
 const marsk_p=document.createElement("p");
 marsk_p.className="career_p";
 marsk_p.innerHTML=Markstring;
 sectic.appendChild(marsk_p);
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
   //Mzothando Msiya Portfolio check the project file
    "Authorization": "Bearer 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"
  },
  body: JSON.stringify({
    model: "llama-3.1-8b-instant",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt}]
  })
});

   const cloud = await response.json();
   console.log(cloud);
   console.log(cloud.choices[0].message.content);

  
    const suggest_cloud = document.createElement("p");
    suggest_cloud.className="career_p";
    suggest_cloud.innerHTML=cloud.choices[0].message.content;

 
    sectic.appendChild(suggest_cloud);

    console.log(marsk_p);
}

const ButtMarks = document.getElementById("Career_BtnID");
ButtMarks.addEventListener("click" , async function () {
    await Marks();
})
