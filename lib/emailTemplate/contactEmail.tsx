import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>New Contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading as="h1" style={heading}>
              New Message From {name}
            </Heading>
            <Text style={subheading}>via himangshu.xyz contact form</Text>
          </Section>

          <Section style={body}>
            <Text style={paragraph}>
              <strong>Name: </strong>
              {name}
            </Text>
            <Text style={paragraph}>
              <strong>Email:</strong>{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            <Hr style={hr} />
            <Heading as="h2" style={sectionHeading}>
              Message
            </Heading>
            <Text style={msg}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  padding: "32px 24px",
  borderRadius: "8px 8px 0 0",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 8px 0",
  lineHeight: "1.3",
};

const subheading = {
  fontSize: "14px",
  opacity: 0.8,
  margin: "0",
};

const body = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "0 0 8px 8px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px 0",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};

const hr = {
  border: "none",
  borderTop: "1px solid #eaeaea",
  margin: "24px 0",
};

const sectionHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 16px 0",
};

const msg = {
  ...paragraph,
  whiteSpace: "pre-line",
};

export default ContactFormEmail;
