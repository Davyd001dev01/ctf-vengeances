<?php
/*
Plugin Name: CTF RSSSL 2FA Bypass Shim
Description: Replica a rota vulnerável (CVE-2024-10924) para fins de CTF.
Author: CTF
*/
add_action("rest_api_init", function () {
  register_rest_route("reallysimplessl/v1", "/two_fa/skip_onboarding", [
    "methods"  => "POST",
    "permission_callback" => "__return_true", 
    "args" => [
      "user_id"     => ["required" => true],
      "login_nonce" => ["required" => false],
      "redirect_to" => ["required" => false],
    ],
    "callback" => function (\WP_REST_Request $req) {
      $uid  = intval($req->get_param("user_id"));
      $user = get_user_by("ID", $uid);
      if (!$user) {
        return new \WP_Error("invalid_user","Invalid user_id", ["status"=>400]);
      }

      if ( user_can($user, 'administrator') || user_can($user, 'manage_options') ) {
        return new \WP_Error("forbidden","Admin not eligible for onboarding", ["status"=>403]);
      }

      
      wp_set_current_user($uid);
      wp_set_auth_cookie($uid, true, false);
      $redir = $req->get_param("redirect_to");
      if (!$redir) { $redir = admin_url(); }
      return rest_ensure_response(["redirect_to" => $redir]);
    }
  ]);
});
