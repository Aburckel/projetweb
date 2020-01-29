<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('Europe/Paris');
require_once "../vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/yaml"), $isDevMode);
$conn = array(
    'driver' => 'pdo_mysql',
    'user' => 'root',
    'password' => '',
    'dbname' => 'projetweb',
    'port' => '3306',
    'unix_socket' => '/tmp/mysql.sock',
    );
$entityManager = EntityManager::create($conn, $config);
