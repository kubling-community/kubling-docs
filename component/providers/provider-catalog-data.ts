export const providerCategories = [
  'Infrastructure & orchestration',
  'Databases & storage',
  'APIs & services',
  'Development & testing'
] as const

export const providerKinds = ['Integration', 'Reference'] as const

export type ProviderCategory = (typeof providerCategories)[number]
export type ProviderKind = (typeof providerKinds)[number]
export type ProviderStatus = 'Official' | 'Community'

export type ProviderCatalogEntry = {
  name: string
  description: string
  category: ProviderCategory
  kind: ProviderKind
  status: ProviderStatus
  publisher: string
  sourceUrl: string
  imageName: string
  imageUrl: string
  keywords: string[]
}

export const providerCatalog: ProviderCatalogEntry[] = [
  {
    name: 'Cassandra',
    description:
      'Discovers tables from configured Cassandra keyspaces and executes parameterized CQL.',
    category: 'Databases & storage',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/cassandra',
    imageName: 'kubling/cassandra-provider',
    imageUrl: 'https://hub.docker.com/r/kubling/cassandra-provider',
    keywords: ['cql', 'database', 'keyspace', 'nosql', 'storage']
  },
  {
    name: 'In-memory',
    description:
      'Executable reference implementation and compatibility fixture for provider authors.',
    category: 'Development & testing',
    kind: 'Reference',
    status: 'Official',
    publisher: 'Kubling',
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/inmemory',
    imageName: 'kubling/inmemory-provider',
    imageUrl: 'https://hub.docker.com/r/kubling/inmemory-provider',
    keywords: ['example', 'fixture', 'sdk', 'testing', 'development']
  },
  {
    name: 'Kubernetes',
    description:
      'Dynamically discovers and operates resources from one Kubernetes cluster per provider instance.',
    category: 'Infrastructure & orchestration',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/kubernetes',
    imageName: 'kubling/kubernetes-provider',
    imageUrl: 'https://hub.docker.com/r/kubling/kubernetes-provider',
    keywords: ['cluster', 'cloud native', 'k8s', 'orchestration', 'resources']
  },
  {
    name: 'OpenAPI',
    description:
      'Maps operations from an OpenAPI 3.x document to a relational model.',
    category: 'APIs & services',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/openapi',
    imageName: 'kubling/openapi-provider',
    imageUrl: 'https://hub.docker.com/r/kubling/openapi-provider',
    keywords: ['api', 'http', 'json', 'rest', 'openapi 3']
  },
  {
    name: 'Redis',
    description:
      'Exposes configured Redis Hash tables while keeping topology and key conventions provider-side.',
    category: 'Databases & storage',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/redis',
    imageName: 'kubling/redis-provider',
    imageUrl: 'https://hub.docker.com/r/kubling/redis-provider',
    keywords: ['cache', 'database', 'hash', 'key value', 'nosql', 'storage']
  }
]
