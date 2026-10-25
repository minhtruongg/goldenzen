import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Preview,
  Button,
} from "react-email";

// One branded layout for every booking email.
// props: name, preview, heading, lines (array of paragraphs), button { label, href }
export function EmailTemplate({ name, preview, heading, lines = [], button }) {
  const body = { color: "#444444", fontSize: "15px", lineHeight: "1.7" };
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: "#f6f3ed", fontFamily: "Arial, sans-serif", margin: 0, padding: "24px 0" }}>
        <Container
          style={{ backgroundColor: "#ffffff", borderRadius: "8px", margin: "0 auto", maxWidth: "560px", overflow: "hidden" }}
        >
          <Section style={{ backgroundColor: "#263d32", padding: "28px 24px", textAlign: "center" }}>
            <Heading style={{ color: "#e5c98b", fontSize: "28px", margin: 0 }}>GoldenZen</Heading>
            <Text style={{ color: "#f6f3ed", fontSize: "13px" }}>Your moment of relaxation</Text>
          </Section>

          <Section style={{ padding: "28px 24px" }}>
            <Heading style={{ color: "#263d32", fontSize: "23px" }}>{heading}</Heading>
            <Text style={body}>Hi {name},</Text>
            {lines.map((line, i) => (
              <Text key={i} style={body}>
                {line}
              </Text>
            ))}
            {button && (
              <Section style={{ textAlign: "center", margin: "24px 0 8px" }}>
                <Button
                  href={button.href}
                  style={{
                    backgroundColor: "#263d32",
                    color: "#e5c98b",
                    padding: "12px 22px",
                    borderRadius: "6px",
                    fontSize: "15px",
                    textDecoration: "none",
                  }}
                >
                  {button.label}
                </Button>
              </Section>
            )}
            <Hr style={{ borderColor: "#e8e5dc", margin: "24px 0" }} />
            <Text style={{ color: "#777777", fontSize: "12px", textAlign: "center" }}>GoldenZen · Prague 6</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}