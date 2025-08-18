<?php

//Begin Really Simple Security session cookie settings
@ini_set('session.cookie_httponly', true);
@ini_set('session.cookie_secure', true);
@ini_set('session.use_only_cookies', true);
//END Really Simple Security cookie settings
//Begin Really Simple Security key
define('RSSSL_KEY', 'wgjPBAHeV9fw8Ron2pRPtijCaQQ56mIIo933eCy95Lgws9yNXeK0R6QGp2IQiacg');
//END Really Simple Security key
define("DB_NAME",     "wordpress");
define("DB_USER",     "wpuser");
define("DB_PASSWORD", "wppass");
define("DB_HOST",     "db");
define("DB_CHARSET",  "utf8");
define("DB_COLLATE",  "");

$table_prefix = "wp_";

define("WP_DEBUG", true);
define("AUTOMATIC_UPDATER_DISABLED", true);
define("FS_METHOD", "direct");

define('AUTH_KEY',         'tsUul<@?#LutW6YS==}}S8@g.=e<J7PdU_cNX}=Pu`oIA%0zW`Djln[%[ )AExz?');
define('SECURE_AUTH_KEY',  '~AiK>SDpmk@}N5v(ge%WqI|==Q>;Cd`2L-]B-,Hot?0hFel,)?I`O-i@a*~eGbds');
define('LOGGED_IN_KEY',    'w()R+[}%DDHBO*bYF51+_/4r236ZIQfBrO%!3q4g)liFQF0~NXi{~{-FXnX^u+A=');
define('NONCE_KEY',        '6e-&bT#L7&7<.zcq3`#_3(pK9rs>F8e!Gp`.N,u).BgH}L+Jb=wd+DF@K>YE<m.J');
define('AUTH_SALT',        'Vh~JEfVB!M~6.WQP=OV15.SC-q1Tq;=-K:9RgOk5qzcDL1g3re-,>w&h,s-zT#-E');
define('SECURE_AUTH_SALT', '^G$YeZ_If|xO..{q.(7YlKC!^sVr>a/.0,8-`hSC:o}rzBq+{t^O{l[hHt1;:^o6');
define('LOGGED_IN_SALT',   'Qk}}&&UP~Q@UdyydZ1]u0>KN5.;hb:-]t&{)fx2]!W>V{KyCZ6y4hK8`?4!1au6v');
define('NONCE_SALT',       ']f$_+epS|Pqgx|t+n4hCbu:NAdW$|-NgeCY|kXc{)yCcG3}2BpD7)]AVb|0A5Gop');

if ( ! defined("ABSPATH") ) define("ABSPATH", __DIR__ . "/");
require_once ABSPATH . "wp-settings.php";
