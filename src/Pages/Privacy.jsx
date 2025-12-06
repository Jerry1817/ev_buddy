import React from "react";
import "../components/Privacy.css"

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-update">Last Updated: November 7, 2025</p>

      <section className="privacy-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>EV Buddy</strong>. Your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you use our services.
        </p>
      </section>

      <section className="privacy-section">
        <h2>2. Information We Collect</h2>
        <ul>
          <li>Personal details such as your name, email, and phone number.</li>
          <li>Vehicle and charging information related to EV usage.</li>
          <li>Location data to help find nearby EV charging stations.</li>
          <li>Device and app usage data for performance improvement.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>3. How We Use Your Information</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve our EV Buddy services.</li>
          <li>Notify you about updates, offers, and new features.</li>
          <li>Analyze usage patterns to enhance user experience.</li>
          <li>Ensure safety and prevent fraudulent activities.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>4. Sharing of Information</h2>
        <p>
          We do not sell your personal data. We may share limited data with
          trusted third-party service providers who help us operate our app,
          subject to strict confidentiality agreements.
        </p>
      </section>

      <section className="privacy-section">
        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard measures to safeguard your personal
          data from unauthorized access, disclosure, or alteration.
        </p>
      </section>

      <section className="privacy-section">
        <h2>6. Your Rights</h2>
        <p>
          You can request access, correction, or deletion of your personal data
          at any time by contacting our support team.
        </p>
      </section>

      <section className="privacy-section">
        <h2>7. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. The latest version
          will always be available within the EV Buddy app and website.
        </p>
      </section>

      <section className="privacy-section">
        <h2>8. Contact Us</h2>
        <p>
          If you have questions or concerns about our Privacy Policy, please
          contact us at:
        </p>
        <p className="contact-info">
          📧 support@evbuddy.com <br />
          🌐 www.evbuddy.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;