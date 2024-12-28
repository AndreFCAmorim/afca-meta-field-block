<?php

namespace Afca\Plugins\MetaFieldBlock;

class Init {

	private string $plugin_path;
	private string $plugin_url;

	public function __construct( $plugin_dir_path, $plugin_dir_url ) {
		$this->plugin_path = plugin_dir_path( __DIR__ );
		$this->plugin_url  = plugin_dir_url( __DIR__ );

		// Register block
		add_action( 'init', [ $this, 'register_block' ] );

		// Load WP Code Plugin Functions
		if ( ! function_exists( 'get_plugin_data' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$plugin_data  = get_plugin_data( $this->plugin_path . 'afca-meta-field-block.php' );
		$update_class = new Updates( 'https://andreamorim.site/', basename( $this->plugin_path ), $plugin_data['Version'] );

		// Schedule task for checking updates
		add_action( 'afca_meta_field_block_updates', [ $update_class, 'check_for_updates_on_hub' ] );
		if ( ! wp_next_scheduled( 'afca_meta_field_block_updates' ) ) {
			wp_schedule_event( current_time( 'timestamp' ), 'daily', 'afca_meta_field_block_updates' );
		}

		$this->set_js_translations();
	}

	public function register_block() {
		register_block_type( $this->plugin_path . '/build' );
	}

	/**
	 * Translations for JavaScript
	 *
	 * @see https://developer.wordpress.org/block-editor/how-to-guides/internationalization/
	 * @see https://developer.wordpress.org/block-editor/reference-guides/filters/i18n-filters/
	 *
	 */
	private function set_js_translations() {
		wp_set_script_translations( 'afca-meta-field-block-editor-script', 'afca-meta-field-block', $this->plugin_path . '/languages' );
	}
}
