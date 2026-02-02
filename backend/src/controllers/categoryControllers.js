const supabase = require('../config/supabase');

exports.getCategories = async (req, res) => {
    const { type } = req.query; 
    let query = supabase.from('finance_categories').select('*').eq('user_id', req.user.id);
    
    if (type) query = query.eq('type', type);

    const { data, error } = await query;
    if (error) return res.status(400).json(error);
    res.json(data);
};

exports.createCategory = async (req, res) => {
    const { name, type, icon } = req.body;
    if (!name || !type) return res.status(400).json({ error: "Nama dan Tipe wajib diisi" });

    const { data, error } = await supabase
        .from('finance_categories')
        .insert([{ user_id: req.user.id, name, type, icon }])
        .select().single();

    if (error) return res.status(400).json(error);
    res.status(201).json(data);
};