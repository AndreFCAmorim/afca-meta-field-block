<?php
$meta_key            = $attributes['metaKey'];
$render_type         = $attributes['renderType'];
$show_text_adjacency = $attributes['showTextAdjacency'];
$before_text         = $show_text_adjacency ? sprintf( '<p class="before-text">%1$s</p>', $attributes['beforeText'] ) : '';
$after_text          = $show_text_adjacency ? sprintf( '<p class="after-text">%1$s</p>', $attributes['afterText'] ) : '';
$alt_text            = $attributes['altText'];
$open_link_new_tab   = $attributes['openLinkNewTab'];

$meta_value = null;
if ( $meta_key ) {
	$the_post = get_post();
	if ( $the_post instanceof \WP_Post ) {
		$meta_value = get_post_meta( $the_post->ID, $meta_key, true );
	}
}

$html = '';
if ( $meta_value ) {
	switch ( $render_type ) {
		case 'text':
			$html .= sprintf(
				'<p>%1$s</p>',
				$meta_value
			);

			break;
		case 'url':
			$html .= sprintf(
				'<a href="%1$s" target="%2$s">%1$s</a>',
				$meta_value,
				( $open_link_new_tab ? '_blank' : '' )
			);

			break;
		case 'img':
			break;
		case 'list':
			break;
		default:
			break;
	}
} else {
	$html .= sprintf(
		'<p>%1$s</p>',
		$alt_text
	);
}

echo wp_kses(
	sprintf( '<div class="afca-blocks-meta-field">%1$s</div>', $before_text . $html . $after_text ),
	[
		'div' => [ 'class' => [] ],
		'p'   => [ 'class' => [] ],
		'a'   => [
			'href',
			'target',
		],
	]
);
