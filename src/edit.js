import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useCallback, useEffect } from '@wordpress/element';
import './editor.scss';
import Controls from './controls.js';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	const {
		metaKey,
		showTextAdjacency,
		beforeText,
		afterText,
	} = props.attributes;

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Controls { ...props } />
			{ showTextAdjacency && beforeText && (
				<p className="before-text">{ beforeText } </p>
			) }
			<p>{ metaKey }</p>
			{ showTextAdjacency && afterText && (
				<p className="after-text"> { afterText }</p>
			) }
		</div>
	);
}
