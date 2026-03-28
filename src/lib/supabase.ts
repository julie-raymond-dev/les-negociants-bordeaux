import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Fonctions de lecture ---

export async function getMenuCarte() {
  const { data, error } = await supabase
    .from('menu_carte')
    .select('*')
    .order('display_order', { ascending: true });
  if (error) console.error('Error fetching Menu Carte:', error);
  return data || [];
}

export async function getMenuWeek() {
  const { data, error } = await supabase
    .from('menu_week')
    .select('*')
    .single();
  if (error) console.error('Error fetching Menu Week:', error);
  return data;
}

export async function getGallery() {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) console.error('Error fetching Gallery:', error);
  return data || [];
}

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');
  if (error) console.error('Error fetching settings:', error);
  
  // Transforme l'array en objet clé:valeur
  return (data || []).reduce((acc: any, item: any) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}
