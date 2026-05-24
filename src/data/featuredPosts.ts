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
		slug: "namnsdag-api",
		date: "2025-12-15",
		tag: "javascript",
		title: {
			en: "An API for namedays",
			sv: "Ett API för namnsdagar",
		},
	},
	{
		slug: "roman-api",
		date: "2026-05-22",
		tag: "javascript",
		title: {
			en: "An API for roman numerals",
			sv: "Ett API för romerska siffror",
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
]
