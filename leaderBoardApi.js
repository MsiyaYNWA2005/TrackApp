async function Get_students(){
    let response = await fetch("http://localhost:3000/get-data_students-firebase");
    let data = response.json()
    return data;
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
