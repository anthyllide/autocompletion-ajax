<?php 
    
$data = unserialize (file_get_contents('towns.txt'));
    
$dataLength = count($data);

$result = array();

for($i=0; $i < $dataLength && count($result) < 10; $i++){
    
    if (stripos($data[$i], $_GET['s']) === 0){
        
        array_push($result, $data[$i]);
    }
}

echo implode('|', $result);

?>