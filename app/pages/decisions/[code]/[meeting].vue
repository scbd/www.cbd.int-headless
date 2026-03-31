<template>
  <async-block>
    <decision-content :code="code" :meeting-code="meetingCode" />
  </async-block>
</template>

<script setup lang="ts">
import { DECISION } from '~~/constants/decisions'

definePageMeta({
  layout: 'home'
})

const route = useRoute()
const code = route.params.code as string
const meetingCode = route.params.meeting as string

// Validate both the decision type and the meeting code
const entries = DECISION[code.toUpperCase() as keyof typeof DECISION]
if (!entries) {
  throw createError({ statusCode: 404, statusMessage: `Decision type '${code}' not found.` })
}

const validMeeting = entries.some(e => e.name === meetingCode.toUpperCase())
if (!validMeeting) {
  throw createError({ statusCode: 404, statusMessage: `Meeting '${meetingCode}' not found for '${code}'.` })
}
</script>