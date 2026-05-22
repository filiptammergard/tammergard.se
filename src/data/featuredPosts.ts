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
			en: "A JSON API for namedays",
			sv: "Ett JSON-API för namnsdagar",
		},
	},
	{
		slug: "roman-api",
		date: "2026-05-22",
		tag: "javascript",
		title: {
			en: "A JSON API for roman numerals",
			sv: "Ett JSON-API för romerska siffror",
		},
	},
]
