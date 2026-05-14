<template>
  <LegalPageLayout
    title="Contact Us"
    eyebrow="Hub · Reach the team"
    last-updated="May 14, 2026"
    :contact-email="SITE_EMAIL"
  >
    <template #intro>
      <p>
        We welcome questions about the hub, partnership inquiries that align with our editorial rules, and good-faith
        reports of incorrect links or accessibility barriers. Because we keep the surface area small, the most reliable
        channel is email—no ticket portal required.
      </p>
      <p>
        Please include enough context for us to help on the first reply: the page URL, your browser and OS if reporting a
        layout bug, and screenshots if something renders incorrectly. For legal or copyright matters, put a clear subject
        line so routing is faster.
      </p>
    </template>

    <section>
      <h2>Primary email</h2>
      <p>
        Write to us at <strong><a :href="'mailto:' + SITE_EMAIL">{{ SITE_EMAIL }}</a></strong>. We aim to read every
        message within several business days. Complex moderation appeals or legal notices may take longer while we
        consult records.
      </p>
    </section>

    <section>
      <h2>What we can help with</h2>
      <p>
        Broken outbound links, typos in hub-authored text, suggestions for the game directory, accessibility improvements,
        API or comment moderation issues, and press or creator verification questions. We cannot provide personal tech
        support for third-party game installs—please use official forums or store support for those cases.
      </p>
    </section>

    <section>
      <h2>What to include</h2>
      <p>
        A concise subject, the hub page you are referring to, steps to reproduce for bugs, and any transaction IDs only if
        your question relates to a hub-adjacent purchase we explicitly facilitated (most purchases occur on external
        stores). Do not send passwords or payment card numbers by email.
      </p>
    </section>

    <section>
      <h2>Abuse reports</h2>
      <p>
        If you see a comment that violates our policies, flag it by email with the game title, approximate time posted, and
        the offending excerpt. We reserve the right to remove content that harms community safety or legal compliance
        without prior negotiation on the public thread.
      </p>
    </section>

    <section>
      <h2>No postal requirement</h2>
      <p>
        This project operates primarily online. Unless a specific law requires a physical address for your jurisdiction,
        email remains the canonical contact method listed on this page.
      </p>
    </section>
  </LegalPageLayout>
</template>

<script setup>
import LegalPageLayout from '@/views/Legal/LegalPageLayout.vue'

const SITE_EMAIL = 'cobbcanmove.site@wyong.com'
</script>
