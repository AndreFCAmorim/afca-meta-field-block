<?php
/**
 * Uninstall script for My Plugin.
 *
 * This script is run when the plugin is uninstalled.
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Delete the plugin's cron tasks.
wp_clear_scheduled_hook( 'afca_meta_field_block_updates' );
