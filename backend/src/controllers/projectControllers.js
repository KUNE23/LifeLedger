const supabase = require('../config/supabase');

exports.getProjects = async (req, res) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*, todo_list(*)') 
        .eq('user_id', req.user.id);
    
    if (error) return res.status(400).json(error);
    res.json(data);
};

exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    const { data, error } = await supabase
        .from('projects')
        .insert([{ user_id: req.user.id, name, description }])
        .select().single();

    if (error) return res.status(400).json(error);
    res.status(201).json(data);
};

exports.addTodo = async (req, res) => {
    const { project_id, task, priority, due_date } = req.body;
    const { data, error } = await supabase
        .from('todo_list')
        .insert([{ user_id: req.user.id, project_id, task, priority, due_date }])
        .select().single();

    if (error) return res.status(400).json(error);
    res.status(201).json(data);
};

exports.toggleTodo = async (req, res) => {
    const { id } = req.params;
    const { is_done } = req.body;

    const { data, error } = await supabase
        .from('todo_list')
        .update({ is_done })
        .eq('id', id)
        .select().single();

    if (error) return res.status(400).json(error);
    res.json(data);
};