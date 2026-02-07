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

interface LowBalanceAlertProps {
  userName: string;
  currentBalance: number;
  threshold: number;
  topUpUrl: string;
}

export default function LowBalanceAlert({
  userName = 'User',
  currentBalance = 3.50,
  threshold = 5.00,
  topUpUrl = 'https://example.com/credits',
}: LowBalanceAlertProps) {
  return (
    <Html>
      <Head />
      <Preview>您的账户余额不足 - 当前余额 ${currentBalance.toFixed(2)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>余额不足提醒</Heading>

          <Text style={text}>
            您好 {userName}，
          </Text>

          <Text style={text}>
            您的 AI Interface 账户余额已低于设定的提醒阈值。
          </Text>

          <Section style={alertBox}>
            <Text style={balanceLabel}>当前余额</Text>
            <Text style={balanceAmount}>${currentBalance.toFixed(2)}</Text>
            <Text style={thresholdText}>提醒阈值: ${threshold.toFixed(2)}</Text>
          </Section>

          <Text style={text}>
            为确保您的 API 服务不受影响，建议您尽快充值。
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={topUpUrl}>
              立即充值
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            您收到此邮件是因为您开启了用量提醒功能。
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

const alertBox = {
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'center' as const,
  margin: '24px 0',
};

const balanceLabel = {
  color: '#92400e',
  fontSize: '14px',
  margin: '0 0 8px',
};

const balanceAmount = {
  color: '#b45309',
  fontSize: '36px',
  fontWeight: '700',
  margin: '0 0 8px',
};

const thresholdText = {
  color: '#92400e',
  fontSize: '14px',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#10b981',
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
