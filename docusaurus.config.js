// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "Tammergård",
	tagline: "Filip Tammergård's personal website",
	url: "https://tammergard.se",
	baseUrl: "/",
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",
	// GitHub pages deployment config.
	organizationName: "filiptammergard",
	projectName: "tammergard.se",
	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en", "sv"],
	},
	themes: ["@docusaurus/theme-live-codeblock"],
	presets: [
		[
			"classic",

			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: false,
				blog: {
					showReadingTime: true,
					editUrl:
						"https://github.com/filiptammergard/tammergard.se/tree/main/",
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
	],
	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: "Tammergård",
				items: [
					{ to: "/blog", label: "Blog", position: "left" },
					{
						href: "https://github.com/filiptammergard",
						label: "GitHub",
						position: "right",
					},
					{
						href: "https://twitter.com/tammergard",
						label: "Twitter",
						position: "right",
					},
					{
						href: "https://recept.tammergard.se",
						label: "Recipes",
						position: "right",
					},
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
							{
								label: "Twitter",
								href: "https://twitter.com/tammergard",
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
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Tammergård`,
			},
			prism: {
				theme: require("prism-react-renderer/themes/github"),
				darkTheme: require("prism-react-renderer/themes/dracula"),
			},
		}),
}

module.exports = config
