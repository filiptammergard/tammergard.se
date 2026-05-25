import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

export function useDecimalFormat() {
	const {
		i18n: { currentLocale },
	} = useDocusaurusContext()
	const locale = currentLocale === "sv" ? "sv-SE" : "en-US"

	return (value: number, fractionDigits: number) =>
		new Intl.NumberFormat(locale, {
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits,
			useGrouping: false,
		}).format(value)
}
