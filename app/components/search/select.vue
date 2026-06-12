<template>
    <label :for="inputId" class="w-100">
        <slot>{{ t('themes') }}</slot>
        <select
            value=""
            @change="onSelect"
            :id="inputId"
            class="form-select"
        >
            <option value="">{{ t('anySubject') }}</option>
            <optgroup
              v-for="group in groups"
              :key="group.identifier"
              :label="group.label"
            >
              <option
                v-for="child in group.children"
                :key="child.identifier"
                :value="child.identifier"
              >
                {{ child.label }}
              </option>
            </optgroup>
        </select>
    </label>
</template>
<i18n src="~~/i18n/dist/app/components/search/select.json"></i18n>

<script setup lang="ts">
import { useLString } from '~/composables/use-lstring'
import useSubjectsApi from '~/composables/api/use-subjects'
import { groupSubjects } from '~~/utils/subjects'

const props = defineProps<{
  modelValue: string[]
  domain: string
  inputId: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const { t, locale } = useI18n()
const { toLocaleText } = useLString()
const { subjects } = await useSubjectsApi(props.domain)
const groups = computed(() => {
  const cmp = (a: string, b: string): number => a.localeCompare(b, locale.value)
  return groupSubjects(subjects.value)
    .map(group => ({
      identifier: group.identifier,
      label: toLocaleText(group.title),
      children: group.children
        .map(child => ({ identifier: child.identifier, label: toLocaleText(child.title) }))
        .sort((a, b) => cmp(a.label, b.label))
    }))
    .sort((a, b) => cmp(a.label, b.label))
})


function onSelect (event: Event) {
  const select = event.target as HTMLSelectElement
  const value = select.value
  if (value && !props.modelValue.includes(value)) {
    emit('update:modelValue', [...props.modelValue, value])
  }
  select.value = ''
}

/**
 * Returns the localized display label for the given identifier.
 * Exposed so parent components can resolve labels for active filters.
 */
function getLabel (identifier: string): string {
  const subject = subjects.value.find(s => s.identifier === identifier)
  return subject ? toLocaleText(subject.title) : identifier
}

defineExpose({ getLabel })
</script>