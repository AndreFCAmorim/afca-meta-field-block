import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ 'Afca Meta Block – hello from the saved content!' }
		</p>
	);
}
