import { Body, Button, Container, Head, Html, Preview, Section, Tailwind, Text } from '@react-email/components'
import { styles } from '../global_styles'
import { Footer } from '../components/footer'

interface Props {
  user: {
    email: string
    name: string
  }
  unlockUrl: string
}

export default function AccountLockedEmail({
  user = { name: 'Joshua Epstein', email: 'josh@joshepstein.co.uk' },
  unlockUrl = 'http://localhost:3000',
}: Props) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Your account has been locked due to too many sign in attempts</Preview>
        <Body>
          <Section style={styles.main}>
            <Container style={styles.container}>
              <Section style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>LOGICATE</Section>
              <Text style={styles.h1}>Locked Account</Text>
              <Text style={styles.text}>Hello {user.name},</Text>
              <Text style={styles.text}>
                We have detected too many sign in attempts on your account. For your security, we have locked your account. Please click the
                link below to verify your identity and unlock your account.
              </Text>
              <Section style={{ textAlign: 'center' }}>
                <Button style={styles.btn} href={unlockUrl} className="mb-4 mt-3">
                  Unlock Account
                </Button>
              </Section>
              <Text style={styles.text} className="">
                Thank you for using Logicate,
                <br />
                <span className="font-medium">The Logicate Team</span>
              </Text>
              <Footer
                email={user.email}
                service="Authentication"
                reasonForEmail="This email was sent to you due to unwanted access to your existing account. If you would like to speak to our security team, please email security@logicate.joshepstein.co.uk"
              />
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}
