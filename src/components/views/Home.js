import React from "react";
import { Card, CardDeck } from "react-bootstrap";

function Home() {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Afton Gauntlett</h1>
        <p>Web Developer</p>
      </div>
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Link href="/about">About Me</Card.Link>{" "}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Link href="/portfolio">Portfolio</Card.Link>{" "}
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Link href="/contact">Contact</Card.Link>{" "}
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}

export default Home;
