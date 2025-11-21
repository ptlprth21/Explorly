import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-sm border border-border/50 p-10 md:p-16">

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-foreground">
          Privacy Policy
        </h1>

        <p className="text-foreground/70 mb-12 text-center max-w-3xl mx-auto">
          Explorly is the dedicated bespoke travel service of THEVIPGROUP Sp. z o.o.
          We are committed to protecting your privacy and ensuring the security of
          your personal data. This policy describes how we collect, use, and
          share your personal information when you use our services. As a company
          registered in Poland, we are compliant with the European Union’s
          General Data Protection Regulation (GDPR).
        </p>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            1. Who We Are
          </h2>

          <p className="text-foreground/70 mb-4">
            Explorly is the data controller responsible for your personal data.
          </p>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70">
            <li>Company Name: Explorly (a service of THEVIPGROUP Sp. z o.o.)</li>
            <li>Registered Address: Solipska 3, 02-482 Warszawa, Poland</li>
            <li>Contact Email: privacy@explorly.com</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            2. Information We Collect
          </h2>

          <p className="text-foreground/70 mb-6">
            We only collect data that is strictly necessary for fulfilling your
            travel contract and providing our bespoke services.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">
            A. Information You Provide Directly (For Contract Fulfillment)
          </h3>

          <p className="text-foreground/70 mb-4">
            This data is required to secure bookings with our Suppliers and ensure
            smooth travel:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70 mb-6">
            <li>Identification Data: Full name (as per passport), date of birth, gender, nationality.</li>
            <li>Contact Data: Email address, phone number, mailing address.</li>
            <li>
              Payment Data: Billing address and payment method information
              (processed securely by third-party payment gateways; we do not store
              full credit/debit card details).
            </li>
            <li>
              Travel Documentation Data:
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>
                  <strong>Passport Details:</strong> Number and expiry date, required by hotels and
                  local ground handlers for identification, security, and pre-registration.
                </li>
                <li>
                  <strong>Visa Information:</strong> Required only if the destination in your booked
                  itinerary mandates a visa for your nationality.
                </li>
              </ul>
            </li>
            <li>
              Sensitive Data (Special Requests): Dietary requirements, allergies,
              medical conditions, or mobility issues. We only collect this data with
              your explicit consent and only as strictly necessary to ensure your
              safety and comfort during the trip.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3">
            B. Information Collected Automatically (For Website Improvement)
          </h3>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70">
            <li>Usage Data: IP address, browser type, device information, operating system, and geographical location (via IP).</li>
            <li>Tracking Data: Information about how you interact with our site (pages viewed, time spent, links clicked).</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-6">
            3. How We Use Your Information
          </h2>

          <p className="text-foreground/70 mb-6">
            We use your personal data based on the legal grounds defined by GDPR.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-border/40 rounded-xl overflow-hidden">
              <thead className="bg-muted/40">
                <tr>
                  <th className="py-3 px-4 border-b border-border/40">Purpose of Use</th>
                  <th className="py-3 px-4 border-b border-border/40">Legal Basis</th>
                </tr>
              </thead>
              <tbody className="text-foreground/70">
                <tr>
                  <td className="py-3 px-4 border-b border-border/40">
                    Travel Fulfillment & Booking (Sharing passport details with hotels, etc.)
                  </td>
                  <td className="py-3 px-4 border-b border-border/40">Contractual Necessity</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border/40">
                    Customer Service & Support (Responding to inquiries)
                  </td>
                  <td className="py-3 px-4 border-b border-border/40">Contractual Necessity</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border/40">
                    Internal Operations (Accounting, risk management)
                  </td>
                  <td className="py-3 px-4 border-b border-border/40">Legitimate Interest</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border/40">
                    Marketing & Promotions (Sending newsletters)
                  </td>
                  <td className="py-3 px-4 border-b border-border/40">
                    Consent (For new subscribers) or Legitimate Interest (For existing customers)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-border/40">Security & Fraud Prevention</td>
                  <td className="py-3 px-4 border-b border-border/40">
                    Legal Obligation & Legitimate Interest
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            4. Sharing Your Personal Information
          </h2>

          <p className="text-foreground/70 mb-6">
            We share your data only when necessary to execute the services you have paid for:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70 mb-4">
            <li>Travel Suppliers: Hotels, local tour operators, and ground transport companies.</li>
            <li>THEVIPGROUP Entities: For internal administration, logistics, and financial reporting.</li>
            <li>Payment Processors: Banks and payment gateways to complete financial transactions.</li>
            <li>Legal Authorities: When required by law (e.g., immigration or border control).</li>
          </ul>

          <p className="text-foreground/70">
            We mandate that all third-party suppliers who process your data adhere to strict
            data protection standards, including contractual clauses based on EU standards
            for international transfers.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            5. Your Data Protection Rights (GDPR)
          </h2>

          <p className="text-foreground/70 mb-6">As a data subject, you have the right to:</p>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70">
            <li>Access: Request a copy of the personal data we hold about you.</li>
            <li>Correction: Request correction of inaccurate or incomplete data.</li>
            <li>Erasure (Right to be Forgotten): Request deletion of your personal data.</li>
            <li>Object/Restrict Processing: Object to specific processing purposes.</li>
            <li>Data Portability: Request transfer of your data to another organization.</li>
            <li>Withdraw Consent: Withdraw consent where applicable.</li>
          </ul>

          <p className="text-foreground/70 mt-4">
            To exercise any of these rights, contact us at: <strong>privacy@explorly.com</strong>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            6. Contact Information
          </h2>

          <p className="text-foreground/70 mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70">
            <li>Email: privacy@explorly.com</li>
            <li>Mailing Address: Solipska 3, 02-482 Warszawa, Poland</li>
          </ul>
        </section>

        <section>
           <p className="text-center text-lg text-foreground/70 mb-2">
                Effective Date: November 19, 2025
            </p>
            <p className="text-center text-lg text-foreground/70 mb-12">
                Last Updated: November 19, 2025
            </p>
        </section>
      </div>
    </div>
  );
}