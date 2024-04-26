// server.js
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const session = require('express-session'); 


app.use(serveStatic(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(session({
    secret: 'HeyHI',
    resave: false,
    saveUninitialized: false
}));

let users = [
    { 
      id: 1, 
      username: 'rishitt.107002@stu.upes.ac.in', 
      password: 'Pah28358', 
      name: 'Rishitt Gupta', 
      profilePicture: './imagesdashboard/rishitt.png', 
      sap:'500107002', 
      enroll: 'R2142220352', 
      session:'Semester 4', 
      email:'rishitt.107002@stu.upes.ac.in', 
      phone:'9717232341', 
      program:'B.Tech(CSE)(Hons.)(Full Stack AI)',
      security: '30,000',
      netamountdue:'0',
      timetable:'./noticepdfs/timetable1.pdf',
      academiccalender:'./noticepdfs/Acadmic Calender 23.pdf',
      semester1: '/noticepdfs/rishitt_semester1.pdf', 
      semester2: '/noticepdfs/rishitt_semester2.pdf'
    },

    
    {
        id: 2, 
        username: 'gurmehr.101995@stu.upes.ac.in', 
        password: 'password2', 
        name: 'Gurmehr Singh Gulati',
        profilePicture: './imagesdashboard/gurmehr.jpg', 
        sap:'500101995', 
        enroll: 'R2142220078', 
        session:'Semester 4', 
        email:'gurmehr.101995@stu.upes.ac.in', 
        phone:'7747009595', 
        program:'B.Tech(CSE)(Hons.)(Full Stack AI)',
        security: '30,000',
        netamountdue:'0',
        timetable:'./noticepdfs/timetable2.pdf', 
        academiccalender:'./noticepdfs/Acadmic Calender 23.pdf',
        semester1: '/noticepdfs/gurmehr_semester1.pdf', 
        semester2: '/noticepdfs/gurmehr_semester2.pdf'
    }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user; 
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


app.get('/api/user', (req, res) => {
    if (req.session.user) {
        const userData = req.session.user;
        res.status(200).json(userData);
    } else {
        res.status(401).json({ message: 'User not authenticated' });
    }
});

app.get('/api/timetable/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const timetableUrl = user.timetable;
    res.json({ timetableUrl });
});
app.get('/api/academiccalender/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const timetableUrl = user.academiccalender;
    res.json({ timetableUrl });
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get('/documents', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'documents.html'));
});
app.get('/academiccalender', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'academiccalender.html'));
});
app.get('/gradecard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gradecard.html'));
});
app.get('/examnotice', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'examnotice.html'));
});

app.use('/pdfs', express.static(path.join(__dirname, 'grade_pdfs')));

app.get('/api/semesters', (req, res) => {
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3','Semester 4', 'Semester 5', 'Semester 6']; 
    res.json(semesters);
});

app.get('/api/grades/:semester', (req, res) => {
    const semester = req.params.semester;
    const pdfPath = path.join(__dirname, 'grade_pdfs', `${semester}.pdf`);
    res.sendFile(pdfPath);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

