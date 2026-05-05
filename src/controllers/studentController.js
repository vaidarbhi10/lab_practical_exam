// In-memory data
let students = [];
let currentId = 1;

// Validation function
function validateStudent(data) {
    if (!data.name || typeof data.name !== 'string') {
        return "Name is required and must be a string";
    }
    if (data.marks === undefined || typeof data.marks !== 'number' || data.marks < 0) {
        return "Marks must be a number ≥ 0";
    }
    return null;
}

// GET /students
exports.getStudents = (req, res) => {
    res.status(200).json(students);
};

// POST /students
exports.addStudent = (req, res) => {
    const error = validateStudent(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    const newStudent = {
        id: currentId++,
        name: req.body.name,
        marks: req.body.marks
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
};

// PUT /students/:id
exports.updateStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    const error = validateStudent(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    student.name = req.body.name;
    student.marks = req.body.marks;

    res.status(200).json(student);
};

// DELETE /students/:id
exports.deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
};