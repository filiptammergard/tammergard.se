export interface FeaturedPost {
	slug: string
	date: string
	tag: string
	title: {
		en: string
		sv: string
	}
}

export const featuredPosts: FeaturedPost[] = [
	{
		slug: "calendar-maths",
		date: "2020-08-12",
		tag: "javascript",
		title: {
			en: "Calendar maths",
			sv: "Kalendermatematik",
		},
	},
	{
		slug: "robber-language-generator",
		date: "2020-09-27",
		tag: "javascript",
		title: {
			en: "Robber language generator",
			sv: "Rövarspråksgenerator",
		},
	},
	{
		slug: "birthday-maths",
		date: "2020-10-12",
		tag: "javascript",
		title: {
			en: "Birthday maths",
			sv: "Födelsedagsmatematik",
		},
	},
	{
		slug: "alphabet-game",
		date: "2020-10-25",
		tag: "react",
		title: {
			en: "Alphabet game",
			sv: "Alfabetsspelet",
		},
	},
	{
		slug: "pi-decimals",
		date: "2020-10-31",
		tag: "react",
		title: {
			en: "Pi decimals",
			sv: "Pi-decimaler",
		},
	},
	{
		slug: "logical-or-operator-vs-nullish-coalescing-operator",
		date: "2021-04-22",
		tag: "javascript",
		title: {
			en: "|| vs ??",
			sv: "|| vs ??",
		},
	},
	{
		slug: "physical-properties-to-logical-properties",
		date: "2022-10-10",
		tag: "css",
		title: {
			en: "Physical properties to logical properties",
			sv: "Från fysiska till logiska egenskaper",
		},
	},
	{
		slug: "border-radius-ellipses",
		date: "2022-12-01",
		tag: "css",
		title: {
			en: "border-radius ellipses",
			sv: "border-radius ellipses",
		},
	},
	{
		slug: "javascript-equality-table",
		date: "2023-02-07",
		tag: "javascript",
		title: {
			en: "JavaScript equality table",
			sv: "JavaScripts likhetstabell",
		},
	},
]
