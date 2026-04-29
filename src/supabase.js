import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qnfpycxgbeghcerjfyhs.supabase.co";
const supabaseKey = "sb_publishable_bdgvngCw6unlpGefEbdRoQ_skAbbMOu";

export const supabase = createClient(supabaseUrl, supabaseKey);
