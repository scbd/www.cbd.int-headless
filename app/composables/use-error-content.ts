import error403 from '~~/i18n/dist/app/pages/error/403.json'
import error404 from '~~/i18n/dist/app/pages/error/404.json'
import error500 from '~~/i18n/dist/app/pages/error/500.json'
import errorDefault from '~~/i18n/dist/app/pages/error/default.json'

const getMessages = (code: number): any => {
  switch (code) {
    case 403:
      return error403
    case 404:
      return error404
    case 500:
      return error500
    default:
      return errorDefault
  }
}

export const useErrorContent = (statusCode: number): ErrorContent => {
  const { t } = useI18n({
    useScope: 'local',
    messages: getMessages(statusCode)
  })
  const localePath = useLocalePath()
  const route = useRoute()

  const handleError = async (): Promise<void> => clearError({ redirect: localePath('/') })

  const errorCodeMessage = computed(() => t('errorCodeMessage'))
  const errorMessage = computed(() => t('errorMessage', { path: route.path }))
  const homeButton = computed(() => t('homeButton'))

  return {
    errorCodeMessage,
    errorMessage,
    homeButton,
    handleError,
    route
  }
}

interface ErrorContent {
  errorCodeMessage: ComputedRef<string>
  errorMessage: ComputedRef<string>
  homeButton: ComputedRef<string>
  handleError: () => Promise<void>
  route: ReturnType<typeof useRoute>
}
