<?php
/**
 * Plugin Name:       Meta Field Block
 * Plugin URI:        https://andreamorim.site/plugin-documentation/afca-meta-block/
 * Description:       Block for displaying meta fields on the block editor.
 * Requires at least: 6.0
 * Requires PHP:      8.1
 * Version:           0.1
 * Author:            André Amorim
 * Author URI:        https://andreamorim.site
 * Text Domain:       afca-meta-field-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Require composer autoload for psr-4
 */
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}

use Afca\Plugins\MetaFieldBlock\Init;
new Init( plugin_dir_path( __FILE__ ), plugin_dir_url( __FILE__ ) );
