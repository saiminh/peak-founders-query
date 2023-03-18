<?php
/**
 * Plugin Name:       Peak Founders Query
 * Description:       Shows all the peak founders.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       peak-founders-query
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_peak_founders_query_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_peak_founders_query_init' );

function enqueue_foundersquery_admin_assets() {
  wp_enqueue_style(
    'peak-founders-query-style-admin',
    plugins_url('/build/index.css', __FILE__)        
);
}
add_action( 'enqueue_block_editor_assets', 'enqueue_foundersquery_admin_assets' );

function enqueue_foundersquery_frontend_assets() {

  global $post;
  if ( is_admin() || $post && strpos( $post->post_content, 'peak-founders-query-loop' ) !== false) {
    // Enqueue frontend block script
    wp_enqueue_style(
        'peak-founders-query-style',
        plugins_url('/build/style-index.css', __FILE__)        
    );
    wp_enqueue_script(
      'peak-founders-query-view-script',
      plugins_url( '/build/view.js', __FILE__ ),
      [],
      false,
      true
    );
  }
}
// Hook the enqueue function into the frontend and editor
add_action( 'enqueue_block_assets', 'enqueue_foundersquery_frontend_assets' );


function add_exit_class( $classes ) {
  global $post;
  if( get_post_meta($post->ID, 'exit') && get_post_meta($post->ID, 'exit')[0] == '1' ){
    array_push($classes, 'has-exited');
  } else {
    $classes = $classes;
  };
  return $classes;
}
add_action( 'post_class', 'add_exit_class' );

