import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalInputControl as InputControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

export default function Controls( props ) {
	const {
		metaKey,
		renderType,
		showTextAdjacency,
		beforeText,
		afterText,
		altText,
		openLinkNewTab,
		textLink,
		imgAltText
	} = props.attributes;

	const handleMetaKeyChange = ( value ) => {
		props.setAttributes( { metaKey: value } );
	};

	const handleRenderTypeChange = ( value ) => {
		props.setAttributes( { renderType: value } );
	};

	const handleMetaShowTextAdjacencyChange = ( value ) => {
		props.setAttributes( { showTextAdjacency: value } );
	};
	const handleBeforeTextChange = ( value ) => {
		props.setAttributes( { beforeText: value } );
	};

	const handleAltTextChange = ( value ) => {
		props.setAttributes( { altText: value } );
	};

	const handleAfterTextChange = ( value ) => {
		props.setAttributes( { afterText: value } );
	};

	const handleOpenLinkNewTabChange = ( value ) => {
		props.setAttributes( { openLinkNewTab: value } );
	};

	const handleTextLinkChange = ( value ) => {
		props.setAttributes( { textLink: value } );
	};

	const handleImgAltTextChange = ( value ) => {
		props.setAttributes( { imgAltText: value } );
	};

	return (
		<InspectorControls>
			<PanelBody>
				<InputControl
					label={ __( 'Meta key', 'afca-meta-field-block' ) }
					value={ metaKey }
					onChange={ handleMetaKeyChange }
				/>
				<ToggleControl
					checked={ showTextAdjacency }
					label={ __(
						'Show text adjacency?',
						'afca-meta-field-block'
					) }
					onChange={ handleMetaShowTextAdjacencyChange }
				/>
				{ showTextAdjacency && (
					<>
						<InputControl
							label={ __(
								'Text before meta value',
								'afca-meta-field-block'
							) }
							value={ beforeText }
							onChange={ handleBeforeTextChange }
						/>
						<InputControl
							label={ __(
								'Alternative text for meta value',
								'afca-meta-field-block'
							) }
							value={ altText }
							onChange={ handleAltTextChange }
						/>
						<InputControl
							label={ __(
								'Text after meta value',
								'afca-meta-field-block'
							) }
							value={ afterText }
							onChange={ handleAfterTextChange }
						/>
					</>
				) }
				<SelectControl
					label={ __( 'Render option', 'afca-meta-field-block' ) }
					value={ renderType }
					options={ [
						{
							label: __( 'Text', 'afca-meta-field-block' ),
							value: 'text',
						},
						{
							label: __( 'URL', 'afca-meta-field-block' ),
							value: 'url',
						},
						{
							label: __( 'Image', 'afca-meta-field-block' ),
							value: 'img',
						},
						{
							label: __( 'List', 'afca-meta-field-block' ),
							value: 'list',
						},
					] }
					onChange={ handleRenderTypeChange }
				/>
				{ renderType == 'url' && (
					<>
						<ToggleControl
							checked={ openLinkNewTab }
							label={ __(
								'Open link in new tab',
								'afca-meta-field-block'
							) }
							onChange={ handleOpenLinkNewTabChange }
						/>
						<InputControl
							label={ __(
								'Text for the link',
								'afca-meta-field-block'
							) }
							value={ textLink }
							onChange={ handleTextLinkChange }
						/>
					</>
				) }
				{
					renderType == 'img' && (
						<InputControl
							label={ __(
								'Alternative text for image',
								'afca-meta-field-block'
							) }
							value={ imgAltText }
							onChange={ handleImgAltTextChange }
						/>
						)
				}
			</PanelBody>
		</InspectorControls>
	);
}
