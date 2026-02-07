import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedKey = process.env.CRON_SECRET;

    if (expectedKey && authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get all users with usage_alerts enabled
    const { data: usersWithAlerts, error: prefsError } = await supabase
      .from('user_preferences')
      .select(`
        user_id,
        low_balance_alert_threshold,
        email_notifications
      `)
      .eq('usage_alerts', true)
      .eq('email_notifications', true);

    if (prefsError) {
      console.error('Failed to fetch user preferences:', prefsError);
      return NextResponse.json({ error: prefsError.message }, { status: 500 });
    }

    if (!usersWithAlerts || usersWithAlerts.length === 0) {
      return NextResponse.json({ message: 'No users with alerts enabled', sent: 0 });
    }

    const userIds = usersWithAlerts.map(u => u.user_id);

    // Get balances for these users
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('user_id, balance')
      .in('user_id', userIds);

    if (creditsError) {
      console.error('Failed to fetch user credits:', creditsError);
      return NextResponse.json({ error: creditsError.message }, { status: 500 });
    }

    // Get profiles for user emails and names
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, full_name, display_name')
      .in('id', userIds);

    if (profilesError) {
      console.error('Failed to fetch profiles:', profilesError);
      return NextResponse.json({ error: profilesError.message }, { status: 500 });
    }

    // Check for already sent alerts (to avoid spamming)
    const { data: recentAlerts, error: alertsError } = await supabase
      .from('notification_logs')
      .select('user_id, created_at')
      .eq('type', 'low_balance')
      .in('user_id', userIds)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    const recentlyAlertedUsers = new Set(recentAlerts?.map(a => a.user_id) || []);

    // Find users who need alerts
    const usersNeedingAlerts: {
      userId: string;
      email: string;
      userName: string;
      balance: number;
      threshold: number;
    }[] = [];

    for (const pref of usersWithAlerts) {
      if (recentlyAlertedUsers.has(pref.user_id)) {
        continue; // Already alerted in last 24h
      }

      const credit = credits?.find(c => c.user_id === pref.user_id);
      const profile = profiles?.find(p => p.id === pref.user_id);

      if (!credit || !profile?.email) {
        continue;
      }

      const balance = parseFloat(credit.balance);
      const threshold = parseFloat(pref.low_balance_alert_threshold);

      if (balance < threshold) {
        usersNeedingAlerts.push({
          userId: pref.user_id,
          email: profile.email,
          userName: profile.display_name || profile.full_name || 'User',
          balance,
          threshold,
        });
      }
    }

    // Send emails
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aiinterface.com';
    const emailApiUrl = `${baseUrl}/api/email/send`;
    const emailApiSecret = process.env.EMAIL_API_SECRET;

    let sentCount = 0;
    const errors: string[] = [];

    for (const user of usersNeedingAlerts) {
      try {
        const response = await fetch(emailApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(emailApiSecret && { Authorization: `Bearer ${emailApiSecret}` }),
          },
          body: JSON.stringify({
            type: 'low_balance',
            to: user.email,
            data: {
              userName: user.userName,
              currentBalance: user.balance,
              threshold: user.threshold,
              topUpUrl: `${baseUrl}/credits`,
            },
          }),
        });

        if (response.ok) {
          sentCount++;

          // Log the notification
          await supabase.from('notification_logs').insert({
            user_id: user.userId,
            type: 'low_balance',
            metadata: {
              balance: user.balance,
              threshold: user.threshold,
            },
          });
        } else {
          const errorData = await response.json();
          errors.push(`${user.email}: ${errorData.error}`);
        }
      } catch (err) {
        errors.push(`${user.email}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }

    return NextResponse.json({
      message: 'Balance check completed',
      checked: usersWithAlerts.length,
      needingAlerts: usersNeedingAlerts.length,
      sent: sentCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Balance check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
