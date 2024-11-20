const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/adminModel'); // Replace with the correct path to your model file

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://gavinarori:g123456@cluster0.7kfoiet.mongodb.net/collections', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected');
}).catch(err => {
    console.error('Database connection error:', err);
});

async function addAdmin() {
    try {
        // Define admin data
        const adminData = {
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'securepassword', // This will be hashed before saving
            image: 'path/to/image.jpg',
            role: 'admin'
        };

        // Hash the password
        const saltRounds = 10; // Number of hashing rounds
        adminData.password = await bcrypt.hash(adminData.password, saltRounds);

        // Create and save the admin
        const admin = new Admin(adminData);
        await admin.save();

        console.log('Admin user created successfully');
        mongoose.connection.close(); // Close the connection after saving
    } catch (error) {
        console.error('Error creating admin:', error);
        mongoose.connection.close();
    }
}

// Run the script
addAdmin();
