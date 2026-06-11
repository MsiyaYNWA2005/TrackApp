🎓 ScholarTracker

Track. Rank. Succeed.

ScholarTracker is a full-stack web application that helps schools track student performance, recognise top achievers, and provide AI-powered career recommendations based on academic results.


🌐 Live Demo:[ScholarTracker](https://scholartracker-4c89b.web.app/)

🎯 Purpose

ScholarTracker was developed as a portfolio project to explore full-stack web development concepts, including authentication, database management, REST APIs, and AI integration. The goal is to provide schools with a platform that helps recognise academic achievement while assisting students in exploring career paths aligned with their strengths.


🌟 What is ScholarTracker?
ScholarTracker is a school performance platform built for students and administrators. Students can view their academic ranking and get personalised AI-powered career suggestions based on their actual marks. Admins can register students, capture subject marks, and keep the leaderboard up to date.

✨ Features

| Feature                    | Description                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| 🏆 Leaderboard       | Displays the top 10 students ranked by average mark, updated in real time.             |
| 🥇 Student Spotlight | Highlights the highest-performing student.                                             |
| 🎯 Career Guide       | Provides 3 AI-powered career suggestions based on a student's marks.                   |
| 📊 Subject Averages    | Allows users to browse performance across all subjects.                                |
| 🔐 Admin Login        | Secure administrator authentication using Firebase Authentication.                     |
| ➕ Student Registration | Enables administrators to add students, subjects, and marks through an intuitive form. |


🔮 Planned Features

- Support for Grade 11 students
- Separate leaderboards by grade level
- Semester filtering on the leaderboard
- Mobile-responsive design improvements
- Student self-login to view personal marks
- Deployment using Firebase Hosting
- Export student reports to PDF



🧭 How to Use It

As a Student


- Open the app — you'll land on the Home page.
- Click Leaderboard to see the top 10 ranked students.
- Click Career Guide, enter your name and surname, then select **Get Career Suggestions**.
- The app will retrieve your marks and provide 3 AI-powered career recommendations.
- Click View High Performing Student to see the highest-ranked student.


As an Admin

- Click Admin Login in the navigation bar.
- Log in using administrator credentials provided by the system administrator.
- You will be redirected to the Student Registration page.
- Enter the student's details, grade, subjects, and marks.
- Click Add Student to save the information.
- 

🔐 Admin Access: Administrator accounts are managed by the project owner through Firebase Authentication. To access administrator features, valid credentials must be provided by the system administrator. Public self-registration for administrator accounts is not available.


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


📚 Current Scope
ScholarTracker is currently designed for Grade 12 students only. Support for additional grades (such as Grade 11) is planned for future releases.

👨‍💻 Author
Mzothando Msiya
Built as a portfolio project to demonstrate full-stack web development with Firebase and AI integration.

📄 License

This project is open source and available for educational use.
