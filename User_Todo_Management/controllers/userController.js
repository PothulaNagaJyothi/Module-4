import { supabase } from '../config/supabase.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "Name, email, and password are required" });

    const { data, error } = await supabase.from('users').insert([{ name, email, password }]).select();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: "User created successfully", user: data[0] });
};

export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const { error: todoError } = await supabase.from('todos').delete().eq('user_id', userId);
    if (todoError) return res.status(400).json({ error: todoError.message });
    const { error } = await supabase.from('users').delete().eq('id', userId);
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: "User and all associated todos deleted." });
};