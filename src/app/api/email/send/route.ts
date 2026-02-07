import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import LowBalanceAlert from '@/emails/LowBalanceAlert';
import AccountNotification from '@/emails/AccountNotification';
import MarketingEmail from '@/emails/MarketingEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export type EmailType = 'low_balance' | 'account_notification' | 'marketing';

interface SendEmailRequest {
  type: EmailType;
  to: string;
  data: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedKey = process.env.EMAIL_API_SECRET;

    if (expectedKey && authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: SendEmailRequest = await request.json();
    const { type, to, data } = body;

    if (!type || !to || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: type, to, data' },
        { status: 400 }
      );
    }

    let emailComponent;
    let subject: string;

    switch (type) {
      case 'low_balance':
        subject = `余额不足提醒 - 当前余额 $${(data.currentBalance as number)?.toFixed(2) || '0.00'}`;
        emailComponent = LowBalanceAlert({
          userName: data.userName as string,
          currentBalance: data.currentBalance as number,
          threshold: data.threshold as number,
          topUpUrl: data.topUpUrl as string || 'https://aiinterface.com/credits',
        });
        break;

      case 'account_notification':
        subject = data.subject as string || '账户通知';
        emailComponent = AccountNotification({
          userName: data.userName as string,
          subject: subject,
          message: data.message as string,
          actionUrl: data.actionUrl as string,
          actionText: data.actionText as string,
        });
        break;

      case 'marketing':
        subject = data.subject as string || '最新动态';
        emailComponent = MarketingEmail({
          userName: data.userName as string,
          subject: subject,
          previewText: data.previewText as string,
          content: data.content as string,
          ctaUrl: data.ctaUrl as string,
          ctaText: data.ctaText as string,
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      react: emailComponent,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: emailData?.id });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
