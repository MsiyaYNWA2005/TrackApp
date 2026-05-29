
//server file
const Groq = require("groq-sdk");
require("dotenv").config();
const admin = require("firebase-admin");
const express= require('express');
const cors = require('cors');

// var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);






// try{
//     admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });
//  console.log("Firebase initialized successfully");
// } catch(error) {
//   console.log("Firebase init error:", error.message);
// }

var serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, 'base64').toString('utf8')
);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase initialized successfully");
} catch(error) {
    console.log("Firebase init error:", error.message);
}

//can you please deploy

const app = express();
const db= admin.firestore();


console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
console.log("Client Email:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("Private Key exists:", !!process.env.FIREBASE_PRIVATE_KEY_BASE64);





app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});


app.get('/', function(req, res) {
    res.send({ status: "Server is running" });
});


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


// exports.app = functions.https.onRequest(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});