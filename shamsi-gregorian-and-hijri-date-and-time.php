<?php
/*
Plugin Name: Shamsi, Gregorian, and Hijri Date and Time
Requires PHP: 7.2
Description: This plugin displays the current time along with the Persian (Shamsi), Islamic (Hijri), and Gregorian dates.
Version: 1.0.0
Author: Hamid Ranjbar Akbari
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tested up to: 6.6
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Function for displaying HTML
function hamid_date_time_display() {
    ?>
    <div class="container">
        <div class="radio-group">
            <label>
                <input type="radio" name="dateType" value="jalali" checked> Jalali Date
            </label>
            <label>
                <input type="radio" name="dateType" value="gregorian"> Gregorian Date
            </label>
            <label>
                <input type="radio" name="dateType" value="hijri"> Islamic Date
            </label>
        </div>
        <div class="date-container" id="date"></div>
        <div id="clock"></div>
    </div>
    <?php
}

// Enqueue styles and scripts
function hamid_date_time_enqueue_scripts() {
    // Enqueue moment.js from WordPress default libraries if available
    wp_enqueue_script( 'moment', includes_url( '/js/moment.min.js' ), array(), null, true );
    wp_enqueue_script( 'moment-hijri', plugins_url( '/js/moment-hijri.js', __FILE__ ), array('moment'), null, true );

    // Enqueue custom JS for date/time display
    wp_enqueue_script( 'shamsi-gregorian-hijri-date-time-script', plugins_url( '/js/shamsi-gregorian-and-hijri-date-and-time.js', __FILE__ ), array('moment', 'moment-hijri'), null, true );

    // Enqueue styles
    wp_enqueue_style( 'shamsi-gregorian-hijri-date-time-style', plugins_url( '/css/shamsi-gregorian-and-hijri-date-and-time.css', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'hamid_date_time_enqueue_scripts' );

// Register shortcode to display the plugin
function hamid_date_time_shortcode() {
    ob_start();
    hamid_date_time_display();
    return ob_get_clean();
}
add_shortcode( 'shamsi_gregorian_hijri_date_time', 'hamid_date_time_shortcode' );
?>
