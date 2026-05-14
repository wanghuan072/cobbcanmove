<template>
  <LegalPageLayout
    title="About Us"
    eyebrow="Hub · Mission"
    last-updated="May 14, 2026"
  >
    <template #intro>
      <p>
        COBB CAN MOVE Hub is an independent player-facing portal built to celebrate the flagship browser survival
        experience and closely related titles we curate in the same lane: tense pacing, readable rules, and runs that
        feel different every time you queue in.
      </p>
      <p>
        We are a small editorial and technical team—not the studio that ships the core game. Our job is to keep
        navigation honest, point downloads at trustworthy channels, collect thoughtful community reviews with
        moderation, and publish short articles when patches or hub features deserve explanation.
      </p>
    </template>

    <section>
      <h2>What you will find here</h2>
      <p>
        A fast home page with embedded play where licensing allows, a directory of related games with consistent
        metadata, a moderated comment stream, itch.io-oriented download guidance, and a blog for patch-adjacent notes
        and design commentary. We bias toward clarity over hype: if a link is experimental, we say so.
      </p>
    </section>

    <section>
      <h2>Editorial standards</h2>
      <p>
        We distinguish between official channels and community mirrors. Store buttons prefer stable search or direct URLs
        maintained in our data files. Screenshots and descriptions aim to match current builds but may lag behind rapid
        creator updates—always verify version notes at the source.
      </p>
    </section>

    <section>
      <h2>Independence</h2>
      <p>
        Unless explicitly labeled as a partnership, references to storefronts, engines, or creators are informational.
        Compensation relationships, if any, will be disclosed near the relevant link or article in line with fair
        advertising practice.
      </p>
    </section>

    <section>
      <h2>Roadmap mindset</h2>
      <p>
        We iterate the hub like a live service: accessibility passes, faster API responses, and richer metadata for games
        are ongoing goals. Feedback sent to our public contact address is read even when we cannot reply to every message
        individually.
      </p>
    </section>
  </LegalPageLayout>
</template>

<script setup>
import LegalPageLayout from '@/views/Legal/LegalPageLayout.vue'
</script>
