const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Add this
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); // This tells Express to serve static files from 'public' folder
app.use(express.json());                                 // parse JSON bodies
app.use(express.urlencoded({ extended: true }));         // parse <form> bodies



// MongoDB connection setup
mongoose.connect('mongodb+srv://chinmay:ydQkOntpYle0F0RE@cluster0.0tptm.mongodb.net/formDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB error ❌", err));

// Root route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html')); // This sends index.html when accessing the root route
});

// Your POST route for form submission
const FormData = require('./models/FormData');
app.post('https://backend-form-2r24.onrender.com/submit-form', async (req, res) => {
    try {
      console.log("✅ Request body:", req.body); // Log incoming data
      const formData = new FormData(req.body);
      await formData.save();
      res.status(201).json({ message: 'Form data saved successfully ✅' });
    } catch (err) {
      console.error("❌ Server error:", err); // Log the exact error
      res.status(500).json({ error: 'Something went wrong ❌' });
    }
  });
  

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
