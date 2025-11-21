import React from "react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-5xl mx-auto bg-card rounded-2xl shadow-sm border border-border/50 p-10 md:p-16">

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-foreground">
          Terms and Conditions
        </h1>

        <p className="text-foreground/70 mb-12 text-center max-w-3xl mx-auto">
          These Terms and Conditions govern the relationship between you (the "Client" or "You")
          and Explorly, a bespoke travel service operated by THEVIPGROUP Sp. z o.o., registered
          under the laws of Poland. By accessing our website, using our services, or booking a trip,
          you agree to be bound by these Terms and Conditions.
        </p>

        {/* 1. OUR ROLE AS OPERATOR AND AGENT */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            1. Our Role as Operator and Agent
          </h2>

          <p className="text-foreground/70 mb-4">
            1.1. <strong>Your Contract:</strong> When you book a bespoke trip with Explorly, 
            your contract is with Explorly/THEVIPGROUP Sp. z o.o.
          </p>

          <p className="text-foreground/70 mb-4">
            1.2. <strong>Agent Status:</strong> In making arrangements for your travel, Explorly acts 
            as an agent on behalf of third-party suppliers, including airlines, hotels, ground handlers,
            and insurance companies ("Suppliers"). While we carefully manage the logistics and quality of
            these Suppliers, your use of their services is subject to their own terms and conditions,
            which may limit their liability.
          </p>
        </section>

        {/* 2. BOOKING AND PAYMENTS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            2. Booking and Payments
          </h2>

          <p className="text-foreground/70 mb-4">
            2.1. <strong>Trip Confirmation:</strong> A booking is confirmed only upon our receipt of a
            non-refundable deposit of 20% of the total trip cost or full payment, and the issuance of our
            written confirmation (invoice).
          </p>

          <p className="text-foreground/70 mb-4">
            2.2. <strong>Deposit:</strong> The deposit secures reservations with Suppliers and is
            non-refundable unless Explorly cannot confirm the requested arrangements.
          </p>

          <p className="text-foreground/70 mb-4">
            2.3. <strong>Final Payment:</strong> The balance is due no later than 21 days prior to
            departure. Failure to pay by the due date may result in cancellation and forfeiture of the deposit.
          </p>

          <p className="text-foreground/70 mb-4">
            2.4. <strong>Pricing:</strong> All prices are quoted in EUR unless stated otherwise. Explorly
            may adjust prices due to currency fluctuation, taxes, or fuel increases until the final payment date.
          </p>
        </section>

        {/* 3. CLIENT RESPONSIBILITY */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            3. Client Responsibility and Documentation
          </h2>

          <p className="text-foreground/70 mb-4">
            3.1. <strong>Passports and Visas:</strong> You are responsible for ensuring you have a valid
            passport, visas, permits, and vaccination certificates. Explorly is not liable for costs or losses
            resulting from failure to secure required documents.
          </p>

          <p className="text-foreground/70 mb-4">
            3.2. <strong>Health and Fitness:</strong> You must be medically and physically able to complete
            the booked itinerary. You must notify Explorly of any medical conditions, disabilities, or dietary
            needs that may affect your travel.
          </p>

          <p className="text-foreground/70 mb-4">
            3.3. <strong>Travel Insurance:</strong> Comprehensive travel insurance is mandatory. Coverage must
            include medical expenses, repatriation, evacuation, accident, and death. Proof is required before departure.
          </p>
        </section>

        {/* 4. CANCELLATIONS AND AMENDMENTS */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            4. Cancellations and Amendments
          </h2>

          <h3 className="text-xl font-semibold text-foreground mb-3">4.1. Cancellation by the Client</h3>
          <p className="text-foreground/70 mb-4">
            All cancellations must be submitted in writing via email. Due to non-refundable supplier
            arrangements, the following penalties apply:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70 mb-6">
            <li>61+ days before departure: Loss of Deposit (20%).</li>
            <li>31–60 days before departure: 50% forfeited.</li>
            <li>0–30 days before departure: 100% forfeited.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3">4.2. Amendments by the Client</h3>
          <p className="text-foreground/70 mb-4">
            Amendment requests are subject to Supplier rules and an Explorly administrative fee of €50 per change,
            plus Supplier charges.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">4.3. Cancellation or Change by Explorly</h3>
          <p className="text-foreground/70 mb-4">
            Explorly may modify or cancel a trip due to unforeseen circumstances such as force majeure,
            natural disasters, supplier failure, or health crises.
          </p>

          <p className="text-foreground/70 mb-4">
            <strong>Major Changes/Cancellation:</strong> If a major change (e.g., new destination or date change
            over 24 hours) occurs, you may choose between:
          </p>

          <ul className="list-disc ml-6 space-y-2 text-foreground/70 mb-6">
            <li>Accepting the revised arrangements.</li>
            <li>Selecting an alternative trip.</li>
            <li>A full refund of all payments made to Explorly.</li>
          </ul>
        </section>

        {/* 5. LIABILITY */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">5. Limitation of Liability</h2>

          <p className="text-foreground/70 mb-4">
            5.1. <strong>General Limitation:</strong> Explorly acts as a travel service provider and agent.
            We carefully select Suppliers, but are not liable for injury, loss, delay, or damage caused by Suppliers
            or force majeure events.
          </p>

          <p className="text-foreground/70 mb-4">
            5.2. <strong>Maximum Liability:</strong> If Explorly is found liable, compensation shall not
            exceed the total cost of the booked travel arrangements (excluding insurance and amendment fees).
          </p>
        </section>

        {/* 6. INTELLECTUAL PROPERTY */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            6. Website Use and Intellectual Property
          </h2>

          <p className="text-foreground/70">
            All content, design, and branding on the Explorly website belong to THEVIPGROUP Sp. z o.o.
            and are protected under intellectual property law. No content may be reproduced without prior
            written consent.
          </p>
        </section>

        {/* 7. COMPLAINTS & LAW */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-primary mb-4">
            7. Complaints and Governing Law
          </h2>

          <p className="text-foreground/70 mb-4">
            7.1. <strong>Complaints:</strong> If you experience an issue during your trip, notify the
            Supplier immediately. If unresolved, you must submit a written complaint to Explorly within
            15 days of your return.
          </p>

          <p className="text-foreground/70">
            7.2. <strong>Governing Law:</strong> These Terms are governed by Polish law. Disputes shall be
            resolved exclusively in the competent courts of Warsaw, Poland.
          </p>
        </section>

        {/* EFFECTIVE DATES */}
        <section>
          <p className="text-center text-lg text-foreground/70 mb-2">
            Effective Date: November 19, 2025
          </p>
        </section>

      </div>
    </div>
  );
}