import { getBusinessDetails } from "@/lib/db-utils"
import { Navbar } from "./navbar"

export async function Header() {
  const details = await getBusinessDetails()
  const businessName = details?.name || "Unity Group"
  const firstName = businessName.split(" ")[0]

  return (
    <Navbar 
      details={JSON.parse(JSON.stringify(details))} 
      businessName={businessName} 
      firstName={firstName} 
    />
  )
}
