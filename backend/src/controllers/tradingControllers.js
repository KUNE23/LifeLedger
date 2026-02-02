const supabase = require('../config/supabase');

exports.createTrade = async (req, res) => {
    try {
        const { 
            ticker, quantity, entry_price, stop_loss, 
            take_profit, setup_id, status, notes 
        } = req.body;

        if (!ticker || !quantity || !entry_price) {
            return res.status(400).json({ error: "Ticker, Quantity, dan Entry Price wajib diisi" });
        }

        const { data, error } = await supabase
            .from('trading_journal')
            .insert([{
                user_id: req.user.id,
                ticker: ticker.toUpperCase(),
                quantity,
                entry_price,
                stop_loss,
                take_profit,
                setup_id,
                status: status || 'plan',
                notes
            }])
            .select().single();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTrade = async (req, res) => {
    try {
        const { id } = req.params;
        const { exit_price, status } = req.body;
        const { data: trade } = await supabase
            .from('trading_journal')
            .select('*')
            .eq('id', id)
            .single();

        let result_pnl = null;
        if (status === 'closed' && exit_price) {
            result_pnl = (exit_price - trade.entry_price) * trade.quantity;
        }

        const { data, error } = await supabase
            .from('trading_journal')
            .update({ 
                exit_price, 
                status, 
                result_pnl,
                updated_at: new Date() 
            })
            .eq('id', id)
            .select().single();

        if (error) throw error;
        res.json({ message: "Trade updated", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};