import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface AccountNotificationProps {
  userName: string;
  subject: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}

export default function AccountNotification({
  userName = 'User',
  subject = '账户通知',
  message = '您的账户有重要更新。',
  actionUrl,
  actionText = '查看详情',
}: AccountNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{subject}</Heading>

          <Text style={text}>
            您好 {userName}，
          </Text>

          <Text style={text}>
            {message}
          </Text>

          {actionUrl && (
            <Section style={buttonContainer}>
              <Button style={button} href={actionUrl}>
                {actionText}
              </Button>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            您收到此邮件是因为您开启了邮件通知功能。
            如需修改通知设置，请访问账户设置页面。
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
  borderRadius: '8px',
};

const heading = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  textAlign: 'center' as const,
  margin: '0 0 30px',
};

const text = {
  color: '#525252',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '32px 0',
};

const footer = {
  color: '#8c8c8c',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '0',
};
