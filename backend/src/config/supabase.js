// backend/src/config/supabase.js
require('dotenv').config(); // WAJIB DI ATAS SENDIRI
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Debugging (Opsional: hapus jika sudah jalan)
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Error: SUPABASE_URL atau ANON_KEY tidak ditemukan di .env");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;