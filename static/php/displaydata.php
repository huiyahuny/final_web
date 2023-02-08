<?php
$db = new SQLite3('ijm.db');
$results = $db->query('SELECT * FROM your_table');
$row = $results->fetchArray();
$value = $row['column_name'];
echo $value;
?>