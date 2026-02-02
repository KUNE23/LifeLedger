const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('users')
            .insert([{ username, email, password_hash: hashedPassword }])
            .select().single();

        if (error) throw error;
        res.status(201).json({ message: "User LifeLedger berhasil didaftarkan" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: user, error } = await supabase
            .from('users').select('*').eq('email', email).single();

        if (error || !user) return res.status(401).json({ error: "Email atau password salah" });

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ error: "Email atau password salah" });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await supabase.from('users').update({ refresh_token: refreshToken }).eq('id', user.id);

        res.json({ accessToken, refreshToken, user: { id: user.id, username: user.username, avatar_url: user.avatar_url } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: "Refresh token required" });

    const { data: user, error } = await supabase
        .from('users').select('*').eq('refresh_token', token).single();

    if (error || !user) return res.status(403).json({ error: "Invalid refresh token" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token expired" });
        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
    });
};

exports.logout = async (req, res) => {
    const { userId } = req.body;
    await supabase.from('users').update({ refresh_token: null }).eq('id', userId);
    res.json({ message: "Logged out successfully" });
};