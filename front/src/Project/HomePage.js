import React from 'react';
import { Button } from 'react-bootstrap';
import { Navbar1 } from './Navbar1';
import '../Styles/HomePage.css';

export function HomePage() {
  return (
    <>
    <Navbar1></Navbar1>
    <div className="homepage">
      <section className="header section">
        <div className="content">
          <h1>גלו את העולם עם Fly High</h1>
          <p>חוו את הריגוש שבנסיעה עם שירותי הטיסה המובילים שלנו. הזמינו את ההרפתקה הבאה שלכם היום!</p>
          <div className="button-group">
            <Button variant="primary" className="custom-button">הזמינו טיסה</Button>
            <Button variant="secondary" className="custom-button">גלו מבצעים</Button>
          </div>
        </div>
        <div className="image-placeholder"></div>
      </section>
      
      <section className="white-section section">
        <div className="image-placeholder"></div>
        <div className="content">
          <h2>גלו את העולם עם Fly High</h2>
          <p>
            ב-Fly High, אנו מאמינים כי הנסיעה צריכה להיות חוויה בלתי נשכחת. המשימה שלנו היא להפוך את הנסיעה לפשוטה ולמהנה, בין אם אתם מתכננים חופשה משפחתית, טיול עסקים, או הרפתקה אישית.
          </p>
          <p>
            עם הפלטפורמה הקלה לשימוש שלנו, תוכלו לחפש טיסות, להשוות מחירים ולהזמין מושבים בלחיצה אחת. הצוות שלנו תמיד כאן לעזור לכם למצוא את היעד המושלם, מלהמליץ על המקומות הטובים ביותר לביקור ועד מתן טיפים מקומיים.
          </p>
          <div className="button-group">
            <Button variant="primary" className="custom-button">למד עוד</Button>
            <Button variant="secondary" className="custom-button">צור קשר</Button>
          </div>
        </div>
      </section>

      <section className="header section">
        <div className="content">
          <h2>גלו את המבצעים הטובים ביותר עם Fly High</h2>
          <p>
            ב-Fly High, אנו מחויבים לעזור לכם למצוא את הדילים הטובים ביותר על טיסות, מלונות, וחבילות נופש. הצוות שלנו תמיד כאן כדי להביא לכם את המחירים התחרותיים ביותר והמבצעים הבלעדיים.
          </p>
          <div className="button-group">
            <Button variant="primary" className="custom-button">ראה מבצעים</Button>
            <Button variant="secondary" className="custom-button">הזמינו עכשיו</Button>
          </div>
        </div>
        <div className="image-placeholder"></div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About FlyHigh</h3>
            <p>FlyHigh is a leading travel booking platform that makes it easy to find and book flights, hotels, and vacation packages.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>Home</li>
              <li>Flights</li>
              <li>Seats</li>
              <li>About</li>
              <li>Contact</li>
              <li>Deals</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Customer Support</h3>
            <ul>
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Subscribe to our Newsletter</h3>
            <input type="email" placeholder="Enter your email" />
            <Button variant="primary" className="subscribe-button">Subscribe</Button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FlyHigh. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
}
