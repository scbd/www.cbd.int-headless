<template>
  <div v-if="submissions.total > 0" class="mt-4 w-100">
    <h3>{{ t('submissions') }}</h3>

    <template v-if="parties.length > 0">
      <h4>{{ t('parties') }}</h4>
      <table class="submissions-table table table-striped table-hover">
        <tbody>
          <tr v-for="(item, index) in parties" :key="item.id">
            <td width="2%">
              <strong class="text-nowrap">{{ index + 1 }}.</strong>
            </td>
            <td width="50%">
                <NuxtLink
                    v-if="item.urls?.length"
                    :href="item.urls[0]"
                    target="_blank"
                    rel="noopener noreferrer"
                ><strong>{{ getSubmitterName(item) }}</strong>
                </NuxtLink>
            </td>
            <td width="18%">
                {{ t('submittedOn', { date: toFormatDate(item.submittedDate) }) }}
            </td>
            <td width="30%">
              <ul class="list-unstyled mb-0">
                <li v-for="(file, idx) in getFiles(item)" :key="idx">
                  <NuxtLink :href="file.url" target="_blank" rel="noopener noreferrer">
                    <NuxtImg
                        v-if="file.type === 'pdf'"
                        src="/images/icons/icon-file-pdf.svg"
                        alt="PDF"
                        style="width: 16px; height: 16px"
                    />
                    <NuxtImg
                        v-else-if="file.type === 'doc'"
                        src="/images/icons/icon-file-doc.svg"
                        alt="DOC"
                        style="width: 16px; height: 16px"
                    /> {{ file.name }}
                  </NuxtLink>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-if="observers.length > 0">
      <h4>{{ t('observers') }}</h4>
      <table class="submissions-table table table-striped table-hover">
        <tbody>
          <tr v-for="(item, index) in observers" :key="item.id">
            <td width="2%">
              <strong class="text-nowrap">{{ index + 1 }}.</strong>
            </td>
            <td width="50%">
                <NuxtLink
                    v-if="item.urls?.length"
                    :href="item.urls[0]"
                    target="_blank"
                    rel="noopener noreferrer"
                ><strong>{{ getSubmitterName(item) }}</strong>
                </NuxtLink>
            </td>
            <td width="18%">
                {{ t('submittedOn', { date: toFormatDate(item.submittedDate) }) }}
            </td>
            <td width="30%">
              <ul class="list-unstyled mb-0">
                <li v-for="(file, idx) in getFiles(item)" :key="idx">
                    <NuxtLink :href="file.url" target="_blank" rel="noopener noreferrer">
                        <NuxtImg
                            v-if="file.type === 'pdf'"
                            src="/images/icons/icon-file-pdf.svg"
                            alt="PDF"
                            style="width: 16px; height: 16px"
                        />
                        <NuxtImg
                            v-else-if="file.type === 'doc'"
                            src="/images/icons/icon-file-doc.svg"
                            alt="DOC"
                            style="width: 16px; height: 16px"
                        /> {{ file.name }}
                    </NuxtLink>
                </li>
                
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/notification/submissions.json"></i18n>

<script setup lang="ts">
import type { Submission, NotificationFileInfo } from '~~/types/notification'
import type { Country } from '~~/types/country'

const props = defineProps<{
  code: string
}>()

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const { getCountryList } = useCountries()
const { getSubmissionList } = useSubmissions()

const { data: submissions } = getSubmissionList(props.code, { limit: 500 })
const { data: countries } = getCountryList()

const countryMap = computed(() => {
  const map = new Map<string, Country>()
  for (const country of countries.value.rows) {
    if (country.code) map.set(country.code.toUpperCase(), country)
    if (country.code2) map.set(country.code2.toUpperCase(), country)
    if (country.code3) map.set(country.code3.toUpperCase(), country)
  }
  return map
})

function getSubmitterName (submission: Submission): string {
  if (submission.government) {
    const country = countryMap.value.get(submission.government.trim().toUpperCase())
    if (country) return toLocaleText(country.name)
  }
  return submission.title || submission.government || ''
}

function isParty (submission: Submission): boolean {
  if (!submission.government) return false
  const key = submission.government.trim().toUpperCase()
  const country = countryMap.value.get(key)
  return country?.treaties.XXVII8 === true
}

function getFiles (submission: Submission): NotificationFileInfo[] {
  if (!submission.files?.length) return []
  return submission.files.map((url) => {
    const name = decodeURIComponent(url.split('/').pop() || url)
    const lower = name.toLowerCase()
    const type = lower.endsWith('.pdf') ? 'pdf' : lower.match(/\.docx?$/) || lower.match(/\.doc$/) ? 'doc' : 'other'
    return { url, name, type }
  })
}

function sortByDate (a: Submission, b: Submission): number {
  return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime()
}

const parties = computed(() =>
  submissions.value.rows.filter(s => isParty(s)).sort(sortByDate)
)

const observers = computed(() =>
  submissions.value.rows.filter(s => !isParty(s)).sort(sortByDate)
)
</script>
