<template>
  <LegalPageLayout
    title="Privacy Policy"
    eyebrow="Legal · Data & cookies"
    last-updated="May 14, 2026"
  >
    <template #intro>
      <p>
        This Privacy Policy describes how the COBB CAN MOVE Hub (“we”, “us”, or “the site”) collects, uses, and shares
        information when you browse our pages, play embedded experiences where available, or use features such as public
        comments that connect to our backend services.
      </p>
      <p>
        We aim to be transparent in plain language. If anything here conflicts with a third-party service you use
        through outbound links (for example storefronts or social platforms), that service’s own policy governs your
        relationship with them.
      </p>
    </template>

    <section>
      <h2>1. Who this applies to</h2>
      <p>
        This policy applies to visitors and registered visitors alike insofar as we do not operate a traditional user
        account system on the public hub. Certain interactions—such as submitting a comment or rating—create a minimal
        record tied to the content you submitted and technical metadata needed for moderation and abuse prevention.
      </p>
    </section>

    <section>
      <h2>2. Information we may collect</h2>
      <p>
        <strong>Browser and device data.</strong> When you load pages, standard web server and analytics-style logs may
        include your IP address, user agent string, approximate region derived from network routing, timestamps, and
        requested URLs. We use this information to keep the service reliable, diagnose errors, and understand aggregate
        traffic patterns.
      </p>
      <p>
        <strong>Comments and reviews.</strong> If you post a comment or star-style rating through our API, we store the
        display name you provide, the text of your message, optional numeric rating, time of submission, moderation
        status, and a server-observed IP address or similar identifier used for rate limiting and spam reduction.
      </p>
      <p>
        <strong>Cookies and local storage.</strong> We may use strictly necessary cookies or local storage for UI
        preferences (such as theme or dismissal of notices). We do not use third-party advertising cookies on this hub as
        part of its core template; if that changes, we will update this section and, where required, prompt consent.
      </p>
      <p>
        <strong>Email correspondence.</strong> If you email us at the address listed on our Contact page, we retain
        messages and our replies for as long as needed to complete the conversation and maintain reasonable business
        records.
      </p>
    </section>

    <section>
      <h2>3. How we use information</h2>
      <p>
        We process information to operate and improve the hub, to moderate user-generated content, to enforce technical
        rate limits, to secure our infrastructure, and to comply with applicable law. We do not sell your personal
        information as a line item; we also do not build individual profiles for cross-site marketing.
      </p>
    </section>

    <section>
      <h2>4. Sharing</h2>
      <p>
        We may share data with infrastructure providers that host the site or database (for example a managed PostgreSQL
        provider), strictly under agreements that require appropriate safeguards. We may disclose information if we
        believe in good faith that disclosure is necessary to comply with legal process, to protect the rights or safety
        of users or the public, or to investigate abuse of the service.
      </p>
    </section>

    <section>
      <h2>5. Retention</h2>
      <p>
        Server logs are retained for a limited rolling window appropriate to security and debugging needs unless a longer
        period is required for incident response. Approved comments may remain visible indefinitely unless removed for
        policy reasons or by administrator action. Rejected or spam submissions may be deleted sooner. Email threads are
        kept according to operational necessity.
      </p>
    </section>

    <section>
      <h2>6. Security</h2>
      <p>
        We implement reasonable administrative and technical measures appropriate to the sensitivity of the data we
        handle. No method of transmission over the Internet is completely secure; you should use discretion when sharing
        sensitive personal details in any public comment field.
      </p>
    </section>

    <section>
      <h2>7. International visitors</h2>
      <p>
        The hub may be operated from or hosted in jurisdictions other than your own. By using the site, you understand
        that your information may be processed in countries where data protection laws differ from those in your home
        region.
      </p>
    </section>

    <section>
      <h2>8. Children</h2>
      <p>
        Our content may discuss mature themes related to games. The site is not directed at children under the age where
        parental consent is required for data collection in your region. If you believe a child has submitted personal
        data through our forms of interaction, contact us and we will take appropriate steps.
      </p>
    </section>

    <section>
      <h2>9. Your choices and rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing of
        personal data, or to object to processing. To exercise these rights, email us using the contact address on this
        site. We may need to verify your request and will respond within a reasonable timeframe.
      </p>
    </section>

    <section>
      <h2>10. Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. The “Last updated” date at the top of the page will change
        when we do. Continued use of the hub after changes constitutes your acknowledgment of the revised policy where
        permitted by law.
      </p>
    </section>
  </LegalPageLayout>
</template>

<script setup>
import LegalPageLayout from '@/views/Legal/LegalPageLayout.vue'
</script>
