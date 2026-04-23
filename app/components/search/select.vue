<template>
    <label :for="inputId" class="w-100">
        <slot>{{ t('themes') }}</slot>
        <select
            :value="modelValue"
            @change="onSelect"
            :id="inputId"
            class="form-select"
        >
            <option value="">{{ t('anySubject') }}</option>
            <option
                v-for="subject in subjects"
                :key="subject.identifier"
                :value="subject.identifier"
            >
                {{ toLocaleText(subject.title) }}
            </option>
        </select>
    </label>
</template>
<i18n src="~~/i18n/dist/app/components/search/select.json"></i18n>

<script setup lang="ts">
import { useLString } from '~/composables/use-lstring'

const props = defineProps<{
  modelValue: string
  domain: string
  inputId: string
}>()

const { getSubjectList } = useSubjects()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { t } = useI18n()
const { toLocaleText } = useLString()
const { data: subjects } = getSubjectList(props.domain)

function onSelect (event: Event) {
  const select = event.target as HTMLSelectElement
  emit('update:modelValue', select.value)
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