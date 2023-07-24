import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./SubscribeSection.css";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform email subscription logic here
    console.log(`Subscribing email: ${email}`);
    setEmail("");
  };

  return (
    <section className="subscribe-section py-5 mt-5">
      <Container>
        <div className="content">
          <h2>Get Timely Updates</h2>
          <p>
            Subscribe to receive timely updates from your favorite products.
          </p>
          <Form onSubmit={handleSubmit} className="subscribe-form">
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                // Adjust the width as desired
              />
            </Form.Group>
            <Button type="submit" className="subscribe-btn">
              Subscribe
            </Button>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default SubscribeSection;
