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

interface MarketingEmailProps {
  userName: string;
  subject: string;
  previewText: string;
  content: string;
  ctaUrl?: string;
  ctaText?: string;
}

export default function MarketingEmail({
  userName = 'User',
  subject = '最新动态',
  previewText = '查看我们的最新功能和更新',
  content = '我们有一些精彩的新功能要与您分享！',
  ctaUrl,
  ctaText = '了解更多',
}: MarketingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Text style={logo}>AI Interface</Text>
          </Section>

          <Heading style={heading}>{subject}</Heading>

          <Text style={text}>
            您好 {userName}，
          </Text>

          <Text style={text}>
            {content}
          </Text>

          {ctaUrl && (
            <Section style={buttonContainer}>
              <Button style={button} href={ctaUrl}>
                {ctaText}
              </Button>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            您收到此邮件是因为您订阅了我们的营销邮件。
            如不想再收到此类邮件，请在账户设置中取消订阅。
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

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const logo = {
  color: '#10b981',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
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
  backgroundColor: '#8b5cf6',
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
  textAlign: 'center' as const,
};
