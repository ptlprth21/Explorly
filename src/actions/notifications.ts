'use server';
import { createServerSupabase } from '@/lib/supabase/server';
//import { sendEmail } from './email'; // función que implementaremos para enviar correo

export async function getUserNotificationSettings(userId: string) {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
        .from('user_notification_settings')
        .select('*')
        .eq('user_id', userId)
        .single();;

    if (error && error.code !== 'PGRST116') throw error; 
    return data || { notify_in_app: true, notify_email: false };
}

export async function updateUserNotificationSettings(userId: string, notifyInApp: boolean, notifyEmail: boolean) {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('user_notification_settings')
    .upsert({
      user_id: userId,
      notify_in_app: notifyInApp,
      notify_email: notifyEmail,
      updated_at: new Date().toISOString()
    }, { onConflict: ['user_id'] });

  if (error) throw error;
  return data;
}

export async function addUserNotification(userId: string, message: string) {
  const supabase = createServerSupabase();

  const { data: settings, error: settingsError } = await supabase
    .from('user_notification_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (settingsError && settingsError.code !== 'PGRST116') throw settingsError;

  if (!settings || settings.notify_in_app) {
    const { error } = await supabase
      .from('user_notifications')
      .insert({ user_id: userId, message });
    if (error) throw error;
  }

//   if (settings?.notify_email) {
//     await sendEmail(userId, message); // implementa tu lógica de envío
//   }

  return true;
}

export async function getUserNotifications(userId: string) {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('user_notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createServerSupabase();
  const { error } = await supabase
    .from('user_notifications')
    .update({ read: true })
    .eq('id', notificationId);
  if (error) throw error;
  return true;
}