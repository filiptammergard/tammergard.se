import Link from "@docusaurus/Link"
import type { ReactNode } from "react"
import styles from "./LinkCards.module.css"

interface LinkCard {
	href: string
	title: string
	description: ReactNode
	external?: boolean
}

interface LinkCardsProps {
	cards: LinkCard[]
}

export function LinkCards({ cards }: LinkCardsProps) {
	return (
		<div className={styles.grid}>
			{cards.map((card) => (
				<Link
					key={card.href}
					to={card.href}
					className={styles.card!}
					{...(card.external
						? { target: "_blank" as const, rel: "noopener noreferrer" }
						: {})}
				>
					<div className={styles.cardTitle}>
						<span>{card.title}</span>
						<span className={styles.arrow} aria-hidden>
							{card.external ? "↗" : "→"}
						</span>
					</div>
					<div className={styles.cardDescription}>{card.description}</div>
				</Link>
			))}
		</div>
	)
}
