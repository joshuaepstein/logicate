import { styles } from "@logicate/emails/global_styles"
import { Hr, Text } from "@react-email/components"

export const Footer = ({ email, service, reasonForEmail }: { email: string; service: string; reasonForEmail: string }) => {
  return (
    <>
      <Hr style={styles.hr} />
      <Text style={styles.footer}>
        This email was intended for <span style={styles.black}>{email}</span>. This email was sent on the behalf of{" "}
        <span style={styles.black}>Logicate</span> sent by the Logicate {service} service. This email was sent to you on{" "}
        {new Date().toLocaleDateString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        .<br />
        {reasonForEmail}
      </Text>
    </>
  )
}
