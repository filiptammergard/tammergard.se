import Translate from "@docusaurus/Translate"
import { useClipboard } from "@site/src/hooks/useClipboard"

export function UseClipboardDemo() {
	const [clipboard, read] = useClipboard()

	return (
		<div>
			<button type="button" onClick={read}>
				<Translate id="useClipboard.showButton">Show clipboard</Translate>
			</button>
			<p>
				{clipboard ?? (
					<Translate id="useClipboard.empty">Nothing to show...</Translate>
				)}
			</p>
		</div>
	)
}
