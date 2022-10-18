import { useEffect, useState } from "react"

export function useIpLocation() {
	const [ipLocation, setIpLocation] = useState<IpLocation | null>(null)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		fetch("https://ipapi.co/json/")
			.then((res) => res.json())
			.then((data) => setIpLocation(data))
			.catch((err) => setError(err))
	}, [])

	return { ipLocation, error }
}

interface IpLocation {
	ip: string
	version: string
	city: string
	region: string
	region_core: string
	country: string
	country_name: string
	country_code: string
	country_code_iso3: string
	country_capital: string
	country_tld: string
	continent_code: string
	in_eu: string
	postal: string
	latitude: number
	longitude: number
	timezone: string
	utc_offset: string
	country_calling_code: string
	currency: string
	currency_name: string
	languages: string
	country_area: number
	country_population: number
	asn: string
	org: string
}
