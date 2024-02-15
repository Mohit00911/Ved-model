
const fs = require('fs');
const xlsx = require('xlsx');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const PORT = 3001;

const dataFilePath = path.join(__dirname, 'data', 'students.json');
app.use(cors());
app.use(express.json());

const studentData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));


app.post('/api/getResult', (req, res) => {
  const { name, RollNumber } = req.body;
 

  const parsedRollNumber = isNaN(RollNumber) ? RollNumber : parseInt(RollNumber, 10);

  const result = studentData.find(
    (student) =>
       student.Roll_number === parsedRollNumber
  );

  if (result) {
    const responseObj = {
      name: result.Students_name,
      fatherName: result.Father_Name,
      motherName: result.Mother_Name,
      contactNumber: result.Contact_No,
      maxMarks: result.MM,
      marks: result.Marks,
      percent: result.percent,
      rank: result.Rank,
      cashPrize: result.Cash_prize,
      rollNumber:result.Roll_number,
      scholarship: result.Scholarship
    }
    res.json(responseObj);
  }else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
