const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
try {
const employees = await Employee.find().sort({ name: 1 });
res.status(200).json(employees);
} catch (error) {
console.error('Error fetching employees:', error);
res.status(500).json({ message: 'Error fetching employees', error: error.message });
}
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
try {
const employee = await Employee.findById(req.params.id);

if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
}

res.status(200).json(employee);
} catch (error) {
console.error('Error fetching employee:', error);
res.status(500).json({ message: 'Error fetching employee', error: error.message });
}
};

// Create a new employee
exports.createEmployee = async (req, res) => {
try {
const { name, role, department, joinDate, salary, contact } = req.body;

// Basic validation
if (!name || !role || !department || !joinDate || !salary || !contact) {
    return res.status(400).json({ message: 'All fields are required' });
}

const newEmployee = new Employee({
    name,
    role,
    department,
    joinDate,
    salary,
    contact
});

const savedEmployee = await newEmployee.save();
res.status(201).json(savedEmployee);
} catch (error) {
console.error('Error creating employee:', error);
res.status(500).json({ message: 'Error creating employee', error: error.message });
}
};

// Update an employee
exports.updateEmployee = async (req, res) => {
try {
const { name, role, department, joinDate, salary, contact } = req.body;

// Basic validation
if (!name || !role || !department || !joinDate || !salary || !contact) {
    return res.status(400).json({ message: 'All fields are required' });
}

const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    {
    name,
    role,
    department,
    joinDate,
    salary,
    contact,
    updatedAt: Date.now()
    },
    { new: true, runValidators: true }
);

if (!updatedEmployee) {
    return res.status(404).json({ message: 'Employee not found' });
}

res.status(200).json(updatedEmployee);
} catch (error) {
console.error('Error updating employee:', error);
res.status(500).json({ message: 'Error updating employee', error: error.message });
}
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
try {
const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

if (!deletedEmployee) {
    return res.status(404).json({ message: 'Employee not found' });
}

res.status(200).json({ message: 'Employee deleted successfully' });
} catch (error) {
console.error('Error deleting employee:', error);
res.status(500).json({ message: 'Error deleting employee', error: error.message });
}
};

// Get department statistics
exports.getDepartmentStats = async (req, res) => {
try {
const stats = await Employee.aggregate([
    {
    $group: {
        _id: "$department",
        count: { $sum: 1 },
        avgSalary: { $avg: "$salary" },
        avgPerformance: { $avg: "$performance" },
        avgAttendance: { $avg: "$attendance" }
    }
    }
]);

res.status(200).json(stats);
} catch (error) {
console.error('Error fetching department statistics:', error);
res.status(500).json({ message: 'Error fetching department statistics', error: error.message });
}
};