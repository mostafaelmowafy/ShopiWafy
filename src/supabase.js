import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gmbynptzvocbgapcxnjy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtYnlucHR6dm9jYmdhcGN4bmp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzcwNTcsImV4cCI6MjA3MzAxMzA1N30.z1IomFIHBmNkGi5CJfsC9V8hknt54eYLmzoYZgbr4AY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
