const supabase = require('../config/supabase');

exports.getAllLogs = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('finance_logs')
            .select(`
                *,
                category:finance_categories (id, name, icon)
            `)
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLog = async (req, res) => {
    const { amount, type, category_id, note } = req.body;

    if (!amount || !category_id || !type) {
        return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const { data, error } = await supabase
        .from('finance_logs')
        .insert([{ user_id: req.user.id, amount, type, category_id, note }])
        .select().single();

    if (error) return res.status(400).json(error);
    res.status(201).json(data);
};

exports.deleteLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('finance_logs')
            .delete()
            .eq('id', id)
            .eq('user_id', req.user.id); 

        if (error) throw error;
        res.json({ message: "Catatan berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};