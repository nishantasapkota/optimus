import type { FounderPageContent } from "@/lib/page-content"

export function FounderSpotlight({
  founder,
}: {
  founder: FounderPageContent["founder"]
}) {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-red-600 font-semibold">{founder.eyebrow}</p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-blue-950">{founder.name}</h2>
          <p className="mt-4 text-lg text-slate-600 font-medium">{founder.role}</p>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate-700">
            {founder.paragraphs.map((paragraph, index) => {
              if (founder.highlight && paragraph.includes(founder.highlight)) {
                const [before, after] = paragraph.split(founder.highlight)
                return (
                  <p key={index}>
                    {before}
                    <strong className="font-bold text-blue-950">{founder.highlight}</strong>
                    {after}
                  </p>
                )
              }

              return <p key={index}>{paragraph}</p>
            })}
          </div>

          <blockquote className="mt-10 border-l-4 border-red-600 pl-6 text-2xl italic leading-relaxed text-slate-700">
            "{founder.quote}"
          </blockquote>
        </div>
      </div>
    </section>
  )
}
