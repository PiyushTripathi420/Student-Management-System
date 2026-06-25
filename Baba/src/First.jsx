import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { UserPlus, Trash2, Edit3, GraduationCap, Users, CheckCircle, Search, User, UserCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = ' https://student-management-system-v423.onrender.com/api/students';

function First() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  
  
  const [formData, setFormData] = useState({ name: '', rollNo: '', email: '', course: '', gender: 'Male' });
  
  
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo || !formData.email || !formData.course) return;
    
    try {
      if (editId) {
    
        await axios.put(`${API_URL}/${editId}`, formData);
        setEditId(null);
      } else {
      
        await axios.post(API_URL, formData);
      }
      
      
      setFormData({ name: '', rollNo: '', email: '', course: '', gender: 'Male' });
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEditClick = (student) => {
    setEditId(student._id);
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      email: student.email,
      course: student.course,
      gender: student.gender || 'Male'
    });
  };

  
  const cancelEdit = () => {
    setEditId(null);
    setFormData({ name: '', rollNo: '', email: '', course: '', gender: 'Male' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Kya aap is student ko delete karna chahte hain?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        if (editId === id) cancelEdit();
        fetchStudents();
      } catch (err) {
        console.error("Error deleting student", err);
      }
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNo.includes(search)
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      <div className="bg-indigo-700 p-3 flex items-center">
        <button 
          onClick={() => navigate("/")} 
          className="bg-white text-indigo-700 px-4 py-2 rounded-xl font-bold shadow hover:bg-slate-100 transition active:scale-95 text-sm"
        >
          ← Back to Dashboard
        </button>
      </div>

      <nav className="bg-indigo-600 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold tracking-wider">EduPulse | SMS</span>
          </div>
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-indigo-300" />
            </span>
            <input
              type="text"
              placeholder="Search by name or roll..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-indigo-700 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      
      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
      
        <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-indigo-500/10 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <UserPlus className="text-indigo-600" /> 
              {editId ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            {editId && (
              <button 
                onClick={cancelEdit} 
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-lg flex items-center gap-1 transition"
              >
                <X size={12} /> Cancel
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Roll Number</label>
              <input
                type="text"
                placeholder="Enter RollNo"
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.rollNo}
                onChange={e => setFormData({...formData, rollNo: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Course/Branch</label>
              <input
                type="text"
                placeholder="Enter Course"
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={formData.course}
                onChange={e => setFormData({...formData, course: e.target.value})}
              />
            </div>
            
            
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Gender</label>
              <select
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value})}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            
            <button
              type="submit"
              className={`w-full text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 transform active:scale-95 ${editId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {editId ? 'Update Student' : 'Register Student'}
            </button>
          </form>
        </div>

        
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Total Registered</p>
                <h3 className="text-3xl font-bold mt-1">{students.length}</h3>
              </div>
              <Users className="h-10 w-10 opacity-30" />
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Active Status</p>
                <h3 className="text-3xl font-bold mt-1">
                  {students.filter(s => s.status === 'Active').length || students.length}
                </h3>
              </div>
              <CheckCircle className="h-10 w-10 opacity-30" />
            </div>
          </div>

        
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Student Directory</h2>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
                Live Data
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b">
                    <th className="p-4 text-center w-12">S.No</th>
                    <th className="p-4">Student</th>
                    <th className="p-4">Roll No</th>
                    <th className="p-4">Course</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={student._id} className={`hover:bg-indigo-50/40 transition ${editId === student._id ? 'bg-amber-50/20' : ''}`}>
                        <td className="p-4 text-center font-semibold text-slate-500 text-sm">
                          {index + 1}.
                        </td>
                        <td className="p-4 flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold shadow-sm ${student.gender === 'Female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                            {student.gender === 'Female' ? <User size={20} /> : <UserCheck size={20} />}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{student.name}</div>
                            <div className="text-xs text-slate-400">{student.email}</div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-mono text-slate-600">{student.rollNo}</td>
                        <td className="p-4 text-sm text-slate-600">{student.course}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditClick(student)}
                              className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition"
                              title="Edit Details"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(student._id)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Student"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-8 text-slate-400">
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default First;