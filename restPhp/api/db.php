<?php
function getDB() {
$dbhost="13.233.40.197";
//$dbuser="previna";
//$dbpass="Welcome02";
$dbuser="hradmin";
$dbpass="hrportal123";
$dbname="altenprevin";
$dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
return $dbConnection;
}
?>