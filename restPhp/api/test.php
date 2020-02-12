<?php
// Replace the database connection information, username and password with your own.
$conn = new PDO('mysql:dbname=altenprevin;host=localhost', 'root', 'calsoftlabs1');

$conn->exec('CREATE TABLE testIncrement ' .'(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50))');
$sth = $conn->prepare('INSERT INTO testIncrement (name) VALUES (:name)');
$sth->execute([':name' => 'foo']);
var_dump($conn);
$conn->exec('DROP TABLE testIncrement');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";

?>