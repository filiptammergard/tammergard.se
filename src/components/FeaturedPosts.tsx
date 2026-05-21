import Link from "@docusaurus/Link"
import Translate from "@docusaurus/Translate"
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { featuredPosts } from "../data/featuredPosts"
import styles from "./FeaturedPosts.module.css"

export function FeaturedPosts() {
	const { withBaseUrl } = useBaseUrlUtils()
	const {
		i18n: { currentLocale },
	} = useDocusaurusContext()
	const locale = currentLocale === "sv" ? "sv" : "en"
	return (
		<section className={styles.section}>
			<header className={styles.header}>
				<h2 className={styles.heading}>
					<Translate
						id="home.featured.heading"
						description="The heading of the featured posts section on the home page"
					>
						Featured posts
					</Translate>
				</h2>
				<Link to={withBaseUrl("/blog")} className={styles.viewAll!}>
					<Translate
						id="home.featured.viewAll"
						description="The label of the link to view all blog posts"
					>
						View all →
					</Translate>
				</Link>
			</header>
			<ul className={styles.list}>
				{featuredPosts.map((post) => (
					<li key={post.slug} className={styles.item}>
						<Link
							to={withBaseUrl(`/blog/${post.slug}`)}
							className={styles.link!}
						>
							<span className={styles.title}>{post.title[locale]}</span>
							<span className={styles.meta}>
								<time dateTime={post.date} className={styles.date}>
									{formatDate(post.date)}
								</time>
								<span className={styles.tag}>#{post.tag}</span>
							</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}

function formatDate(iso: string): string {
	const [year, month, day] = iso.split("-")
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]
	return `${months[Number(month) - 1]} ${Number(day)}, ${year}`
}
