import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
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
	} = props.attributes;

	const blockProps = useBlockProps();

	const metaValue = useSelect(
		( select ) => {
			const post = select( 'core' ).getEntityRecord(
				'postType',
				props.context.query.postType,
				props.context.postId
			);

			const acfField = post?.acf?.[metaKey] ?? null;
			if ( acfField != null ) {
				return acfField;
			}

			const scfField = post?.scf?.[metaKey] ?? null;
			if ( scfField != null) {
				return scfField;
			}

			const podsField = post?.[metaKey] ?? null;
			console.log("podsField: ", podsField);
			if (podsField != null) {
			  return podsField;
			}

			console.log( "post: ", post );

			return post && post.meta && post.meta[ metaKey ];
		},
		[ props.context.postId, props.context.query.postType, metaKey ]
	);

	const RenderedMetaValue = () => {
		if ( metaValue ) {
			switch ( renderType ) {
				case 'text':
					return <p>{ metaValue.toString() }</p>;
				case 'url':
					return (
						<a
							href={ metaValue }
							target={ openLinkNewTab ? '_blank' : '' }
						>
							{ metaValue }
						</a>
					);
				case 'img':
					break;
				case 'list':
					break;
				default:
					break;
			}
		} else {
			return <p>{ altText }</p>;
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
