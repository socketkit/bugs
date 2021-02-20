import { NodeTracerProvider } from '@opentelemetry/node'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { SimpleSpanProcessor } from '@opentelemetry/tracing'

const provider = new NodeTracerProvider({
  plugins: {
    knex: {
      path: '@myrotvorets/opentelemetry-plugin-knex',
    },
  },
})

registerInstrumentations({
  tracerProvider: provider,
})

provider.register()

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new JaegerExporter({
      serviceName: 'subscription-worker',
      endpoint:
        'http://linkerd-jaeger.linkerd.svc.cluster.local:14268/api/traces',
    }),
  ),
)

export default provider
