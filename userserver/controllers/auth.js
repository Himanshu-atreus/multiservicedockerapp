import bcrypt from 'bcrypt' ; 
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/user' ; 

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, username, hashedPassword);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

module.exports = { register, login };
