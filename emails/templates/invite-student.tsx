import { Button, Link, Section, Text } from "@react-email/components"
import Wrapper from "../_components/wrapper"
import { styles } from "../global_styles"

type Props = {
  to: { name: string; email: string }
  inviter: { name: string; email: string }
  acceptUrl: string
  classroomName: string
}

export default function InviteStudent({
  to = { name: "Joshua Epstein", email: "josh@joshepstein.co.uk" },
  inviter = { name: "Joshua Epstein", email: "josh@joshepstein.co.uk" },
  acceptUrl = "http://localhost:3000",
  classroomName = "Logicate",
}: Props) {
  return (
    <Wrapper
      toEmail={to.email}
      reasonForEmail="You were invited to join a Logicate classroom by a teacher."
      preview={`You were invited to join ${classroomName} by a teacher.`}
      footerService="Invitation"
    >
      <Text style={styles.h1}>Invitation to Join {classroomName}</Text>
      <Text style={styles.text}>Hello {to.name},</Text>
      <Text style={styles.text}>
        You have been invited to join <span className="font-medium">{classroomName}</span> by{" "}
        <span className="font-medium">{inviter.name}</span>. To accept the invitation, please click the button below.
      </Text>
      <Section style={{ textAlign: "center" }}>
        <Button style={styles.btn} href={acceptUrl} className="mt-3">
          Accept Invitation
        </Button>
      </Section>
      <Text style={styles.text}>
        or copy and paste this URL into your browser:{" "}
        <Link href={acceptUrl} target="_blank" style={styles.link} rel="noreferrer">
          {acceptUrl}
        </Link>
      </Text>

      <Text style={styles.text}>
        If you do not wish to accept the invitation, please ignore this email or contact us at security@logicate.uk.
      </Text>
    </Wrapper>
  )
}
