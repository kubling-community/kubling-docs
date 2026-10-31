export const providerCategories = [
  'Infrastructure & orchestration',
  'Databases & storage',
  'APIs & services',
  'Development & testing'
] as const

export const providerKinds = ['Integration', 'Reference'] as const

export const providerCapabilities = [
  'Semantic fragment',
  'Rich values',
  'Aggregate pushdown',
  'Partial results',
  'Access patterns'
] as const

export const providerDistributionChannels = [
  'Container image',
  'Debian package'
] as const

export type ProviderCategory = (typeof providerCategories)[number]
export type ProviderKind = (typeof providerKinds)[number]
export type ProviderCapability = (typeof providerCapabilities)[number]
export type ProviderDistributionChannel =
  (typeof providerDistributionChannels)[number]
export type ProviderStatus = 'Official' | 'Community'

export type ProviderDistribution = {
  channel: ProviderDistributionChannel
  href: string
  identifier: string
}

export type ProviderCatalogEntry = {
  name: string
  description: string
  category: ProviderCategory
  kind: ProviderKind
  status: ProviderStatus
  publisher: string
  capabilities: ProviderCapability[]
  distributions: ProviderDistribution[]
  sourceUrl: string
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
    capabilities: ['Aggregate pushdown'],
    distributions: [
      {
        channel: 'Container image',
        href: 'https://hub.docker.com/r/kubling/cassandra-provider',
        identifier: 'kubling/cassandra-provider'
      }
    ],
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/cassandra',
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
    capabilities: ['Rich values', 'Aggregate pushdown'],
    distributions: [
      {
        channel: 'Container image',
        href: 'https://hub.docker.com/r/kubling/inmemory-provider',
        identifier: 'kubling/inmemory-provider'
      }
    ],
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/inmemory',
    keywords: ['example', 'fixture', 'sdk', 'testing', 'development']
  },
  {
    name: 'Host',
    description:
      'Presents a fleet of outbound host agents as bounded tables for system facts, resources, network activity and processes.',
    category: 'Infrastructure & orchestration',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    capabilities: ['Semantic fragment', 'Partial results', 'Access patterns'],
    distributions: [
      {
        channel: 'Container image',
        href: 'https://hub.docker.com/r/kubling/host-provider',
        identifier: 'kubling/host-provider'
      },
      {
        channel: 'Debian package',
        href: '/install/debian',
        identifier: 'kubling-host-provider and kubling-host-agent'
      }
    ],
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/host',
    keywords: [
      'agent',
      'cpu',
      'fleet',
      'host',
      'memory',
      'network',
      'observability',
      'processes',
      'system'
    ]
  },
  {
    name: 'Kubernetes',
    description:
      'Dynamically discovers and operates resources from one Kubernetes cluster per provider instance.',
    category: 'Infrastructure & orchestration',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    capabilities: ['Semantic fragment'],
    distributions: [
      {
        channel: 'Container image',
        href: 'https://hub.docker.com/r/kubling/kubernetes-provider',
        identifier: 'kubling/kubernetes-provider'
      }
    ],
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/kubernetes',
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
    capabilities: [],
    distributions: [
      {
        channel: 'Container image',
        href: 'https://hub.docker.com/r/kubling/openapi-provider',
        identifier: 'kubling/openapi-provider'
      }
    ],
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/openapi',
    keywords: ['api', 'http', 'json', 'rest', 'openapi 3']
  },
  {
    name: 'Redfish',
    description:
      'Exposes hardware inventory, health, firmware, power and thermal data from multiple Redfish BMCs as bounded read-only tables.',
    category: 'Infrastructure & orchestration',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    capabilities: ['Semantic fragment', 'Partial results', 'Access patterns'],
    distributions: [
      {
        channel: 'Container image',
        href: 'https://hub.docker.com/r/kubling/redfish-provider',
        identifier: 'kubling/redfish-provider'
      },
      {
        channel: 'Debian package',
        href: '/install/debian',
        identifier: 'kubling-redfish-provider'
      }
    ],
    sourceUrl: 'https://github.com/kubling-community/kubling-provider-redfish',
    keywords: [
      'bare metal',
      'bmc',
      'data center',
      'firmware',
      'hardware',
      'inventory',
      'out of band',
      'power',
      'redfish',
      'server',
      'thermal'
    ]
  },
  {
    name: 'Redis',
    description:
      'Exposes configured Redis Hash tables while keeping topology and key conventions provider-side.',
    category: 'Databases & storage',
    kind: 'Integration',
    status: 'Official',
    publisher: 'Kubling',
    capabilities: [],
    distributions: [
      {
        channel: 'Container image',
        href: 'https://hub.docker.com/r/kubling/redis-provider',
        identifier: 'kubling/redis-provider'
      }
    ],
    sourceUrl:
      'https://github.com/kubling-community/kubling-providers/tree/main/providers/redis',
    keywords: ['cache', 'database', 'hash', 'key value', 'nosql', 'storage']
  }
]
