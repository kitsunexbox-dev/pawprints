import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qnfpycxgbeghcerjfyhs.supabase.co";
const supabaseKey = "sb_publishable_XSxCodZEnLIsraPg0LmGAg_3U1gAn9m";

export const supabase = createClient(supabaseUrl, supabaseKey);
