export type BusinessOffice = {
  label: string
  address: string
  phones: string[]
  emails: string[]
}

export type BusinessContactDetails = {
  address?: string
  phones?: string[]
  emails?: string[]
  offices?: BusinessOffice[]
}

const OFFICE_MARKER = /(?:^|\s)([A-Za-z ]+ Office)\s*:\s*/g

function cleanList(items?: string[]) {
  return (items ?? []).map((item) => item.trim()).filter(Boolean)
}

function parseLegacyAddress(address?: string, phones?: string[], emails?: string[]): BusinessOffice[] {
  const trimmedAddress = address?.trim()

  if (!trimmedAddress) return []

  const matches = [...trimmedAddress.matchAll(OFFICE_MARKER)]

  if (matches.length === 0) {
    return [
      {
        label: "Office",
        address: trimmedAddress,
        phones: cleanList(phones),
        emails: cleanList(emails),
      },
    ]
  }

  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length
    const end = matches[index + 1]?.index ?? trimmedAddress.length
    const label = match[1].trim()
    const officePhones = phones?.[index] ? [phones[index].trim()] : []

    return {
      label,
      address: trimmedAddress.slice(start, end).replace(/[,\s]+$/, "").trim(),
      phones: officePhones.filter(Boolean),
      emails: index === 0 ? cleanList(emails) : [],
    }
  })
}

export function normalizeBusinessOffices(details?: BusinessContactDetails | null): BusinessOffice[] {
  const configuredOffices = details?.offices
    ?.map((office) => ({
      label: office.label?.trim() || "Office",
      address: office.address?.trim() || "",
      phones: cleanList(office.phones),
      emails: cleanList(office.emails),
    }))
    .filter((office) => office.address || office.phones.length > 0 || office.emails.length > 0)

  if (configuredOffices?.length) return configuredOffices

  return parseLegacyAddress(details?.address, details?.phones, details?.emails)
}
