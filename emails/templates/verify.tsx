import { Body, Button, Container, Head, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components"
import { Footer } from "../_components/footer"
import LogoIcon from "../_components/logo"
import { styles } from "../global_styles"

interface Props {
  user: {
    email: string
    name: string
  }
  verifyUrl: string
}

export default function VerifyEmail({
  user = { name: "Joshua Epstein", email: "josh@joshepstein.co.uk" },
  verifyUrl = "http://localhost:3000",
}: Props) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Please verify your new account on Logicate.</Preview>
        <Body>
          <Section style={styles.main}>
            <Container style={styles.container}>
              <Section style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
                <LogoIcon className="h-8" />
              </Section>
              <Text style={styles.h1}>Verify Your Account</Text>
              <Text style={styles.text}>Hello {user.name},</Text>
              <Text style={styles.text}>
                Thank you for registering with Logicate. To complete your registration, please verify your email address by clicking the
                button below.
              </Text>
              <Section style={{ textAlign: "center" }}>
                <Button style={styles.btn} href={verifyUrl} className="mt-3">
                  Unlock Account
                </Button>
              </Section>
              <Text style={styles.text}>
                <br />
                or copy and paste this URL into your browser:{" "}
                <Link href={verifyUrl} target="_blank" style={styles.link} rel="noreferrer">
                  {verifyUrl}
                </Link>
              </Text>
              <Text style={styles.text} className="">
                Thank you for using Logicate,
                <br />
                <span className="font-medium">The Logicate Team</span>
              </Text>
              <Footer
                email={user.email}
                service="Authentication"
                reasonForEmail="You were sent this email because you registered for a new account on Logicate. If you did not register, please ignore this email or contact us at security@logicate.joshepstein.co.uk"
              />
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}
