import { db } from "./Authentic.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";


async function Get_students(){
     try{
        const snapshots=await getDocs(collection(db,'Student'));
       
        const student_info=[];
        for(let i=0;i<snapshots.size;i++){
           const students = snapshots.docs[i].data();
           student_info.push({
            name:students.name,
            surname:students.surname,
            subject_marks:students.subject_marks,
            average:students.average
           })
        }
        student_info.sort((a, b) => b.average - a.average);
        return student_info;
    }
     catch(error) {
        console.log(error);
        console.log("Student Data not found")
    }
}

const sect_leader= document.getElementById("List_table");
const butt_lead=document.getElementById("butt_leader");

butt_lead.addEventListener("click" , async function(){
    const data = await Get_students();
   
    sect_leader.innerHTML="";
     for(let i=0;i<10 && i<data.length;i++){
        const row = document.createElement("tr");
        row.innerHTML=`
        <td>${data[i].name}</td>
        <td>${data[i].surname}</td>
        <td>${data[i].average}</td>
        `
     sect_leader.appendChild(row);
     }
   
})

const Butt_Top = document.getElementById("Top_But");
const sect_Top=document.getElementById("Top_Table");
Butt_Top.addEventListener("click" , async function(){
    const data = await Get_students();
    
    document.getElementById("top-name").textContent=`${data[0].name}   ${data[0].surname}`;
    document.getElementById("top-average").textContent=`With an average of  ${data[0].average}%`;
    sect_Top.innerHTML="";
})
