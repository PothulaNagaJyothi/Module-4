const supabase = require('../config/supabase');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, age, role }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('id, name, email, age, role, created_at');
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};

exports.getUserById = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', req.params.id).single();
  if (error || !data) return res.status(404).json({ error: "User not found" });
  res.status(200).json(data);
};

exports.updateUser = async (req, res) => {
  const { data, error } = await supabase.from('users').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data[0]);
};

exports.deleteUser = async (req, res) => {
  const { error } = await supabase.from('users').delete().eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};