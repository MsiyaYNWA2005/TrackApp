
//server file
const Groq = require("groq-sdk");
require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express= require('express');

// const cors = require('cors');
// app.use(cors({
//   origin: [
//     "https://scholartracker-4c89b.web.app",
//     "https://scholartracker-4c89b.firebaseapp.com",
//     "http://localhost:3000",
//     "http://127.0.0.1:5500"
//   ]
// }))
app.use(cors());

// var serviceAccount = require("./schoolTracker.json");

var serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const db= admin.firestore();




app.use(cors({origin : true}))
app.use(express.json())



app.post('/post-data-firebase', async function(req, res) {
    try {
        await db.collection('Student').add({
            name: req.body.name,
            surname: req.body.surname,
            grade:req.body.grade,
            subject_marks: req.body.subject_marks,
            average: req.body.student_average
        });
        return res.status(200).send({ success: true });
    }
    catch(error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


app.get('/get-data-firebase' , async function(req,res){
    const student_name =req.query.name;
    const student_surname = req.query.surname;
     try {
        const snapshots = await db.collection('Student').get();
        const students = snapshots.docs;
        const student_info=[];
        for(let i=0;i<students.length;i++){
            if(student_name ===students[i].data().name  && student_surname ===students[i].data().surname){
                    student_info.push({
                    subject_marks:students[i].data().subject_marks
            })
            }
           
        }
        console.log(student_info); 
        return res.status(200).send(student_info);
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

app.get('/get-data_students-firebase' , async function(req,res){
    try{
        const snapshots=await db.collection('Student').get();
        const students = snapshots.docs;
        const student_info=[];
        for(let i=0;i<students.length;i++){
           student_info.push({
            name:students[i].data().name,
            surname:students[i].data().surname,
            subject_marks:students[i].data().subject_marks,
            average:students[i].data().average
           })
        }
        student_info.sort((a, b) => b.average - a.average);
        console.log(student_info);
        return res.status(200).send(student_info);
    }
     catch(error) {
        console.log(error);
        return res.status(500).send(error);
    }
})

app.post('/get-career-suggestion', async function(req, res) {
    try {

        console.log("prompt received:", req.body.prompt); 
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            max_tokens: 1024,
            messages: [{ role: "user", content: req.body.prompt }]
        });
        return res.status(200).send({ result: completion.choices[0].message.content });
    } catch(error) {
        console.log(error);
        return res.status(500).send(error);
    }
});


exports.app = functions.https.onRequest(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
