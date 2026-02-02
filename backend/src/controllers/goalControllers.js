const supabase = require('../config/supabase');

exports.getGoals = async (req, res) => {
    const { data, error } = await supabase
        .from('yearly_goals')
        .select('*')
        .eq('user_id', req.user.id)
        .order('deadline', { ascending: true });

    if (error) return res.status(400).json(error);
    res.json(data);
};

exports.createGoal = async (req, res) => {
    const { title, target_amount, deadline } = req.body;
    
    const { data, error } = await supabase
        .from('yearly_goals')
        .insert([{ user_id: req.user.id, title, target_amount, deadline }])
        .select().single();

    if (error) return res.status(400).json(error);
    res.status(201).json(data);
};

exports.updateProgress = async (req, res) => {
    const { id } = req.params;
    const { current_amount } = req.body;

    const { data: goal } = await supabase.from('yearly_goals').select('target_amount').eq('id', id).single();

    const is_completed = current_amount >= goal.target_amount;

    const { data, error } = await supabase
        .from('yearly_goals')
        .update({ current_amount, is_completed })
        .eq('id', id)
        .select().single();

    if (error) return res.status(400).json(error);
    res.json(data);
};