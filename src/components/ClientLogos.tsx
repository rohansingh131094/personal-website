import { useState } from 'react'
import { clients, clientsEyebrow } from '@/config/loader'
import { cn } from '@/lib/utils'

function ClientLogo({
  name,
  url,
  logo,
  highlight,
}: {
  name: string
  url?: string
  logo?: string
  highlight: boolean
}) {
  const [failed, setFailed] = useState(false)
  const domain = url ? new URL(url).hostname : null
  const src = logo ?? (domain ? `https://logos.hunter.io/${domain}` : null)

  const text = (
    <span
      className={cn(
        'text-sm md:text-base font-semibold transition-colors duration-200',
        highlight
          ? 'text-brass-600 dark:text-brass-400'
          : 'text-slate-400 dark:text-slate-500 hover:text-brass-500 dark:hover:text-brass-400'
      )}
    >
      {name}
    </span>
  )

  const imgEl =
    src && !failed ? (
      <img
        src={src}
        alt={`${name} logo`}
        className="h-6 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200"
        onError={() => setFailed(true)}
      />
    ) : null

  const content = imgEl ?? text

  if (!url) return content

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  )
}

export function ClientLogos() {
  if (clients.length === 0) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-8">
      <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium">
        {clientsEyebrow}
      </span>
      <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
        {clients.map((client) => (
          <span key={client.name} className="flex items-center gap-4 md:gap-6">
            <ClientLogo
              name={client.name}
              url={client.url}
              logo={client.logo}
              highlight={client.highlight}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
