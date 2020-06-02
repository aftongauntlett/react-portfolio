import React from "react";
import { Card, CardDeck } from "react-bootstrap";

function Aboutme() {
  return (
    <div style={{ textAlign: "center", padding: "25px", margin: "25px" }}>
      A technology minded and forward thinking artist seeking a career in Front
      End Web Development. Inspired by design and usability with a natural
      orientation towards collaborative innovation. I am currently enrolled in
      George Washington University studying full-stack web development. On top
      of my studies with GWU, I actively study content online focused on
      numerous technologies. Tech Stack:>HTML5, CSS3, JavaScript, jQuery,
      Bootstrap, Express, React, Node, Vue, Database Theory, MongoDB, MySQL,
      Mongoose, Handlebars, JSX, GIT, Github, APIs, Heroku, ClearDB, Es6+, 508c,
      Responsive Design. Hobbies: Gaming, designing, reading and cooking.
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>George Washington University</Card.Title>
            <Card.Text>12-week Full-Time Coding Bootcamp.</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Udemy</Card.Title>
            <Card.Text>Completed. In Progress.</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Codecademy</Card.Title>
            <Card.Text>Completed. In Progress.</Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}

export default Aboutme;
