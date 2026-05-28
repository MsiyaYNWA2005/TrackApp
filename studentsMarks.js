const Add_Subject = document.getElementById("Add_subject");
const Section = document.getElementById("add_subjects");

const inputs_=[];
Add_Subject.addEventListener("click" , function(){
    const row = document.createElement("section");
    row.className="row";

    const subject=document.createElement("input");
    subject.placeholder="Subject";
    subject.className="subject_input";
    const mark = document.createElement("input");
    mark.placeholder="Mark";
    mark.className="mark_input";

    

    inputs_.push({subject,mark})
    
   
    row.appendChild(subject);
    row.appendChild(mark);
 

    Section.appendChild(row);
})

const submit = document.getElementById("submit_marks");
submit.addEventListener("click", async function(){
    const student_name = document.getElementById("name").value;
    const student_surname = document.getElementById("surname").value;
    const grade  = Number(document.getElementById("grade").value);

    const subject_marks=[];
    for(let i =0;i<inputs_.length;i++){
        const subject_name = inputs_[i].subject.value.trim();
        const mark_value = inputs_[i].mark.value.trim();

        if(mark_value && subject_name){
            subject_marks.push({[subject_name]  : Number(mark_value)})
        }
    }

    let marks=0;
    for(let i =0;i<subject_marks.length;i++){
        marks += Object.values(subject_marks[i])[0];
    }

    const average = marks/subject_marks.length;

    console.log(student_name);
    console.log(student_surname);
    console.log(marks);
    console.log(average);

    const data ={
           name:student_name,
           surname:student_surname,
           grade:grade,
           subject_marks:subject_marks,
           student_average : average
    }

    try{
        const response = await  fetch('http://localhost:3000/post-data-firebase',
                       {
                         method:"POST",
                          headers:{
                           "Content-Type":"application/json"
                          },
                      body:JSON.stringify(data)
        })
        if(!response.ok){
            console.log("response not successfully")
        }
        const data_ = await response.json();
        console.log(data_);

        
        document.getElementById("add_inputs").reset();
        Section.innerHTML="";
        subject_marks.length=0;
        inputs_.length = 0; 

        alert("Student Saved succeffully");

    }
    catch(error){
       console.log("Error:", error); 
    }
})