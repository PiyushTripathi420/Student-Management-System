const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sms_db')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

const Student = mongoose.model('Student', StudentSchema);


app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rollNo, email, course, gender } = req.body;

  try {
    
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, rollNo, email, course, gender },
      { new: true } 
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student nahi mila!" });
    }

    res.status(200).json({ message: "Student details successfully update ho gayi!", data: updatedStudent });
  } catch (err) {
    console.error("Backend Edit Error:", err);
    res.status(500).json({ message: "Server par update karne mein dikkat aayi." });
  }
});








const MONGO_URI = 'mongodb://localhost:27017/academiaDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB successfully connected.'))
  .catch((err) => console.log('Database Connection Error:', err));


const StatSchema = new mongoose.Schema({
  totalStudents: Number,
  activeStudents: Number,
  departments: Number,
  staffMembers: Number,
  attendanceRate: Number
});

const Stat = mongoose.model('Stat', StatSchema);


app.get('/api/dashboard-stats', async (req, res) => {
  try {
    const stats = await Stat.findOne();
    if (!stats) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is perfectly running on port ${PORT}`);
});