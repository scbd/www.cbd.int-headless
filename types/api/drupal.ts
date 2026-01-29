export interface DrupalApiOptions {
  drupalBaseUrl: string
};

export interface DrupalRouterEntity {
  canonical: string
  type: string
  bundle: string
  id: string
  uuid: string
}

export interface DrupalRouterJsonApi {
  individual: string
  resourceName: string
  /** @deprecated Use basePath instead */
  pathPrefix: string
  basePath: string
  entryPoint: string
  type: string
  bundle: string
  uuid: string
}

export interface DrupalRouterRedirect {
  from: string
  to: string
  status: '301' | '302' | '307' | '308'
}

export interface DrupalRouterMeta {
  deprecated?: Record<string, string>
}

export interface DrupalRouterResponse {
  resolved: string
  isExternal: boolean
  isHomePath: boolean
  entity: DrupalRouterEntity
  label: string
  jsonapi: DrupalRouterJsonApi
  meta: DrupalRouterMeta
  redirect?: DrupalRouterRedirect[]
}
