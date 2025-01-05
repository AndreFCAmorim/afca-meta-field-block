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
		renderType,
		showTextAdjacency,
		beforeText,
		afterText,
		altText,
		openLinkNewTab,
		textLink
	} = props.attributes;

	const blockProps = useBlockProps();

	const [ metaValue, setMetaValue ] = useState( '' );

	const fetchData = useCallback( async () => {
		try {
			let response = await fetch(
				`/wp-json/afca-meta-field-block/v1/get-meta-field?post_id=${ props.context.postId }&meta_key=${ metaKey }`,
				{
					method: 'GET',
					headers: {
						'X-WP-Nonce': AfcaMetaFieldBlockSettings.nonce,
						'Content-Type': 'application/json',
					},
				}
			);

			if ( response == false ) {
				return;
			} else {
				const result = await response.json();
				setMetaValue( result.meta_key );
			}
		} catch ( error ) {
			console.error( 'Error retrieving meta field:', error );
		}
	}, [] );

	useEffect( () => {
		fetchData();
	}, [ props.context.postId, metaKey ] );

	const RenderedMetaValue = () => {
		if ( metaValue && typeof metaValue != 'object' ) {
			switch ( renderType ) {
				case 'text':
					return <p>{ metaValue }</p>;
				case 'url':
					return (
						<a
							href={ metaValue }
							target={ openLinkNewTab ? '_blank' : '' }
						>
							{ textLink == '' ? metaValue : textLink }
						</a>
					);
				case 'img':
					return (
						<p>
							{ __(
								'Image will be displayed in the frontend',
								'afca-meta-field-block'
							) }
						</p>
					);
				case 'list':
					if ( Array.isArray( metaValue ) ) {
						return (
							<ul>
								{ metaValue.map( ( item, index ) => (
									<li key={ index }>{ item }</li>
								) ) }
							</ul>
						);
					} else {
						return <p>{metaValue}</p>;
					}
			}
		} else {
			return <p>{ altText != '' ? altText : '-' }</p>;
		}
	};

	return (
		<div { ...blockProps }>
			<Controls { ...props } />
			{ showTextAdjacency && beforeText && (
				<p className="before-text">{ beforeText } </p>
			) }
			<RenderedMetaValue />
			{ showTextAdjacency && afterText && (
				<p className="after-text"> { afterText }</p>
			) }
		</div>
	);
}
