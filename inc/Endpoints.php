<?php
namespace Afca\Plugins\MetaFieldBlock;

class Endpoints {

	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_api_routes' ] );
	}

	/**
	 * Registers a REST API routes
	 */
	public function register_api_routes() {
		register_rest_route(
			'afca-meta-field-block/v1',
			'/get-meta-field',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_meta_field' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' ); // Replace with 'editor' or other role if needed
				},
			]
		);
	}

	/**
	 * Retrieves a meta field value for a given post.
	 *
	 * This function handles a REST API request to fetch a specific meta field
	 * for a post specified by its ID. It checks if the current user has the
	 * 'edit_posts' capability and returns the meta field value if accessible.
	 *
	 * @param \WP_REST_Request $request The REST API request object containing 'post_id' and 'meta_key' parameters.
	 * @return void Sends a JSON response with either the meta field value or an error message.
	 */
	public function get_meta_field( \WP_REST_Request $request ) {
		try {
			$post_id  = isset( $request['post_id'] ) ? $request['post_id'] : '';
			$meta_key = isset( $request['meta_key'] ) ? $request['meta_key'] : '';

			wp_send_json(
				[
					'meta_key' => get_post_meta( $post_id, $meta_key, true ),
				],
				200
			);
		} catch ( \Exception $e ) {
			wp_send_json_error( $e->getMessage(), 500 );
		}
	}
}
