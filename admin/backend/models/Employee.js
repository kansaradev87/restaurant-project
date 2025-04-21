const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true
},
role: {
    type: String,
    required: true,
    enum: ['Manager', 'Chef', 'Waiter', 'Cashier', 'Cleaner']
},
department: {
    type: String,
    required: true,
    enum: ['Kitchen', 'Service', 'Finance', 'Housekeeping']
},
joinDate: {
    type: Date,
    required: true
},
salary: {
    type: Number,
    required: true
},
contact: {
    type: String,
    required: true,
    trim: true
},
createdAt: {
    type: Date,
    default: Date.now
},
updatedAt: {
    type: Date,
    default: Date.now
}
});

// Update the updatedAt field on save
employeeSchema.pre('save', function(next) {
this.updatedAt = Date.now();
next();
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;