import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xjrhuevsnoxezablayis.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqcmh1ZXZzbm94ZXphYmxheWlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNjMxMDcsImV4cCI6MjA1NzYzOTEwN30.VmRCg3O8CDImQ2nEcwZoAtUl6Q72_cbDzhZPeXzxwI4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
