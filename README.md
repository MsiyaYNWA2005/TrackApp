🎓 ScholarTracker

Track. Rank. Succeed.
A web app that helps schools track student marks, celebrate top performers, and guide students toward the right career paths using AI.


🌟 What is ScholarTracker?
ScholarTracker is a school performance platform built for students and administrators. Students can view their academic ranking and get personalised AI-powered career suggestions based on their actual marks. Admins can register students, capture subject marks, and keep the leaderboard up to date.

✨ Features
FeatureDescription🏆 LeaderboardTop 10 students ranked by average mark, updated in real time🥇 Student SpotlightHighlights the number one student each term🎯 Career GuideAI suggests 3 personalised career paths based on a student's marks📊 Subject AveragesBrowse performance across all subjects🔐 Admin LoginSecure login for administrators via Firebase Authentication➕ Student RegistrationAdmins can add students, subjects, and marks through a simple form

🚀 Getting Started
What You Need

A modern web browser (Chrome, Firefox, Edge)
Node.js installed on your computer (for the backend server)
A Firebase project (free at firebase.google.com)

Installation

Clone or download this repository to your computer
Install backend dependencies

bash   npm install

Set up your Firebase credentials

Go to Firebase Console → Project Settings → Service Accounts
Generate a new private key and save it as schoolTracker.json in the project root
⚠️ Never commit this file to GitHub — make sure it's listed in .gitignore


Start the backend server

bash   node firebaseAdd.js
The server will run at http://localhost:3000

Open the app
Open primary_html.html in your browser (or serve it with a local server like Live Server in VS Code)


🧭 How to Use It
As a Student

Open the app — you'll land on the Home page
Click Leaderboard in the nav to see the top 10 ranked students
Click Career Guide, enter your name and surname, then hit Get Career Suggestions
The app will pull your marks from the database and give you 3 AI-recommended career paths
Click View High Performing Student to see the term's top student

As an Admin

Click Admin Login in the top navigation
Log in with your email and password
You'll be taken to the Student Registration page
Fill in the student's name, surname, grade, and add subjects with their marks
Click Add Student to save the student to the database


🗂️ Project Structure
ScholarTracker/
├── primary_html.html     # Main HTML — all pages in one file
├── primary_css.css       # All styles
├── HandleFunction.js     # Page navigation (show/hide sections)
├── Authentic.js          # Firebase app initialisation
├── LoginLogic.js         # Admin login with Firebase Auth
├── studentsMarks.js      # Student registration form logic
├── leaderBoardApi.js     # Leaderboard and top student display
├── CareerApi.js          # AI career suggestions via Groq API
├── firebaseAdd.js        # Express backend — Firebase CRUD endpoints
├── schoolTracker.json    # 🔒 Firebase service account key (keep private!)
└── .gitignore

🛠️ Built With

HTML / CSS / JavaScript — Frontend
Firebase Authentication — Admin login
Firebase Firestore — Student data storage
Node.js + Express — Backend API server
Groq API (LLaMA 3) — AI career suggestions
Boxicons — Icons


⚠️ Important Security Notes

schoolTracker.json contains your Firebase private key. Never push this file to GitHub.
Make sure your .gitignore includes:

  schoolTracker.json

The Groq API key in CareerApi.js should be moved to an environment variable before deploying publicly.


🔮 Planned Features

 Separate leaderboards for Grade 9 and Grade 12
 Semester filtering on the leaderboard
 Mobile-responsive design
 Student self-login to view personal marks
 Deploy to Firebase Hosting


👨‍💻 Author
Mzothando Msiya
Built as a portfolio project to demonstrate full-stack web development with Firebase and AI integration.

📄 License
This project is open source and available for educational use.
