import { Body, Container, Head, Html, Preview, Section, Tailwind, Text } from "@react-email/components"
import { PropsWithChildren } from "react"
import { styles } from "../global_styles"
import { Footer } from "./footer"
import LogoIcon from "./logo"

export default function Wrapper({
  children,
  toEmail,
  preview,
  reasonForEmail = "You were sent this email because you registered for a new account on Logicate. If you did not register, please ignore this email or contact us at security@logicate.uk",
  footerService = "Authentication",
}: PropsWithChildren<{
  toEmail: string
  preview: string
  reasonForEmail?: string
  footerService?: string
}>) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>{preview}</Preview>
        <Body>
          <Section style={styles.main}>
            <Container style={styles.container}>
              <Section style={{ marginTop: "32px", display: "flex", justifyContent: "center" }}>
                <LogoIcon className="h-8" />
              </Section>
              {children}
              <Text style={styles.text} className="">
                Thank you for using Logicate,
                <br />
                <span className="font-medium">The Logicate Team</span>
              </Text>
              <Footer email={toEmail} service={footerService} reasonForEmail={reasonForEmail} />
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}
