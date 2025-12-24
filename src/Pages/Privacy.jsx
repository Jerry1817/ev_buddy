import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="px-5 py-10 max-w-4xl mx-auto bg-[#f5fff5] rounded-2xl shadow-[0_4px_12px_rgba(0,128,0,0.15)] font-['Poppins']">
      
      <h1 className="text-4xl font-bold text-green-700 text-center mb-3">
        Privacy Policy
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Last Updated: November 7, 2025
      </p>

      {/* Sections */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">1. Introduction</h2>
        <p className="text-gray-800 leading-7">
          Welcome to <strong>EV Buddy</strong>. Your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">2. Information We Collect</h2>
        <ul className="ml-5 list-disc text-gray-800 leading-7">
          <li>Personal details such as your name, email, and phone number.</li>
          <li>Vehicle and charging information related to EV usage.</li>
          <li>Location data to help find nearby EV charging stations.</li>
          <li>Device and app usage data for performance improvement.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">3. How We Use Your Information</h2>
        <p className="text-gray-800 leading-7">We use your data to:</p>
        <ul className="ml-5 list-disc text-gray-800 leading-7">
          <li>Provide and improve our EV Buddy services.</li>
          <li>Notify you about updates, offers, and new features.</li>
          <li>Analyze usage patterns to enhance user experience.</li>
          <li>Ensure safety and prevent fraudulent activities.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">4. Sharing of Information</h2>
        <p className="text-gray-800 leading-7">
          We do not sell your personal data. We may share limited data with
          trusted third-party service providers who help us operate our app,
          subject to strict confidentiality agreements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">5. Data Security</h2>
        <p className="text-gray-800 leading-7">
          We implement industry-standard measures to safeguard your personal
          data from unauthorized access, disclosure, or alteration.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">6. Your Rights</h2>
        <p className="text-gray-800 leading-7">
          You can request access, correction, or deletion of your personal data
          at any time by contacting our support team.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">7. Updates to This Policy</h2>
        <p className="text-gray-800 leading-7">
          We may update this Privacy Policy periodically. The latest version
          will always be available within the EV Buddy app and website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-900 mb-2">8. Contact Us</h2>
        <p className="text-gray-800 leading-7">
          If you have questions or concerns about our Privacy Policy, please
          contact us at:
        </p>
        <p className="font-semibold text-green-900 mt-2">
          📧 support@evbuddy.com <br />
          🌐 www.evbuddy.com
        </p>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
