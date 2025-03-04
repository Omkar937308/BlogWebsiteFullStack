const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const dbPath = path.join(__dirname, 'db.json');
const usersPath = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Helper function to read database
async function readDB() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file doesn't exist, create it with empty blogs array
            const initialData = { blogs: [] };
            await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2), 'utf8');
            return initialData;
        }
        throw error;
    }
}

// Helper function to write to database
async function writeDB(data) {
    try {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to database:', error);
        throw new Error('Failed to save to database');
    }
}

// Helper function to read users
async function readUsers() {
    try {
        const data = await fs.readFile(usersPath, 'utf8');
        return JSON.parse(data).users;
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
}

// Helper function to write users
async function writeUsers(users) {
    try {
        await fs.writeFile(usersPath, JSON.stringify({ users }, null, 2));
    } catch (error) {
        console.error('Error writing users:', error);
        throw error;
    }
}

// Initialize users.json if it doesn't exist
async function initializeUsersFile() {
    try {
        await fs.access(usersPath);
    } catch {
        await fs.writeFile(usersPath, JSON.stringify({ users: [] }));
    }
}

initializeUsersFile();

// Generate a simple ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const users = await readUsers();
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password, // In a real app, you should hash the password
            isAdmin: false,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await writeUsers(users);

        // Don't send password in response
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const users = await readUsers();
        const user = users.find(u => u.email === email);

        // User not found
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Don't send password in response
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Get user profile
app.get('/api/user/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const user = users.find(u => u.id === req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Error getting user profile' });
    }
});

// Routes
app.get('/api/blogs', async (req, res) => {
    try {
        const db = await readDB();
        res.json(db.blogs);
    } catch (error) {
        console.error('Error reading blogs:', error);
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const db = await readDB();
        const blog = db.blogs.find(b => b._id === req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: 'Failed to fetch blog' });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const { title, content, image } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const db = await readDB();
        const newBlog = {
            _id: generateId(),
            title,
            content,
            image: image || null,
            createdAt: new Date().toISOString()
        };
        
        db.blogs.push(newBlog);
        await writeDB(db);
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: 'Failed to create blog' });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    try {
        const { title, content, image } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const db = await readDB();
        const index = db.blogs.findIndex(b => b._id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        db.blogs[index] = {
            ...db.blogs[index],
            title,
            content,
            image: image || null,
            updatedAt: new Date().toISOString()
        };

        await writeDB(db);
        res.json(db.blogs[index]);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Failed to update blog' });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const db = await readDB();
        const initialLength = db.blogs.length;
        db.blogs = db.blogs.filter(b => b._id !== req.params.id);
        
        if (db.blogs.length === initialLength) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        await writeDB(db);
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Failed to delete blog' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
