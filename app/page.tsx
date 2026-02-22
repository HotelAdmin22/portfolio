import { draftMode } from "next/headers"
import { VisualEditing } from "@sanity/visual-editing/next"
import DesignerPortfolio from "@/components/DesignerPortfolio"
import { getPortfolioItems, getSiteSettings } from "@/sanity/lib/queries"

export default async function Page() {
  const { isEnabled } = await draftMode()

  const [data, settings] = await Promise.all([
    getPortfolioItems(isEnabled),
    getSiteSettings(isEnabled),
  ])

  return (
    <>
      <DesignerPortfolio data={data} settings={settings} />
      {isEnabled && <VisualEditing />}
    </>
  )
}