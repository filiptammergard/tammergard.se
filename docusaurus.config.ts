import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"
import { themes as prismThemes } from "prism-react-renderer"

const config: Config = {
	title: "Tammergård",
	tagline:
		"Filip Tammergård's personal website — notes on JavaScript, TypeScript, CSS and React.",
	url: "https://tammergard.se",
	baseUrl: "/",
	trailingSlash: false,
	onBrokenLinks: "throw",
	favicon: "img/favicon.ico",
	markdown: {
		hooks: {
			onBrokenMarkdownLinks: "warn",
		},
	},
	organizationName: "filiptammergard",
	projectName: "tammergard.se",
	i18n: {
		defaultLocale: "en",
		locales: ["en", "sv"],
		localeConfigs: {
			en: { label: "English", htmlLang: "en-US" },
			sv: { label: "Svenska", htmlLang: "sv-SE" },
		},
	},
	headTags: [
		{
			tagName: "link",
			attributes: {
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
		},
		{
			tagName: "link",
			attributes: {
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossorigin: "anonymous",
			},
		},
	],
	themes: ["@docusaurus/theme-live-codeblock"],
	presets: [
		[
			"classic",
			{
				docs: false,
				blog: {
					showReadingTime: true,
					editUrl:
						"https://github.com/filiptammergard/tammergard.se/tree/main/",
					feedOptions: {
						type: ["rss", "atom"],
						title: "Tammergård",
						description:
							"Filip Tammergård's notes on JavaScript, TypeScript, CSS and React.",
						copyright: `Copyright © ${new Date().getFullYear()} Filip Tammergård.`,
						xslt: true,
					},
					blogTitle: "Tammergård — blog",
					blogDescription:
						"Notes on JavaScript, TypeScript, CSS and React.",
				},
				sitemap: {
					changefreq: "monthly",
					priority: 0.5,
					ignorePatterns: ["/tags/**", "/blog/page/**", "/blog/archive"],
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
		colorMode: {
			respectPrefersColorScheme: true,
		},
		metadata: [
			{
				name: "description",
				content:
					"Filip Tammergård's personal website — notes on JavaScript, TypeScript, CSS and React.",
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "author", content: "Filip Tammergård" },
			{ name: "theme-color", content: "#faf7f2" },
		],
		navbar: {
			title: "Tammergård",
			items: [
				{ to: "/blog", label: "Blog", position: "left" },
				{ type: "localeDropdown", position: "right" },
			],
		},
		footer: {
			links: [
				{
					title: "Community",
					items: [
						{
							label: "GitHub",
							href: "https://github.com/filiptammergard",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "Blog",
							to: "/blog",
						},
						{
							label: "Recipes",
							href: "https://recept.tammergard.se",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Tammergård`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
}

export default config
