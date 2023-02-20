<?php
    header('Content-Type: application/json');
    $returnVal = array();
    $points = array();
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
            case 'updatePoints':
                $username = $_POST['arguments'][0];
                $points = $_POST['arguments'][1];
                $statement = $conn -> prepare("UPDATE Users SET points=? WHERE username=?");
                $statement -> bind_param('is', $points, $username);
                $statement -> execute();
                break;
            case 'getPoints':
                $username = $_POST['arguments'][0];
                $statement = $conn -> prepare("SELECT points FROM Users WHERE username=?");
                $statement -> bind_param('s', $username);
                $statement -> execute();
                $result = $statement -> get_result();
                $row = $result -> fetch_row();
                array_push($points, [$row[0]]);
                $returnVal['result'] = $points;
                echo json_encode($returnVal);
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
    $conn -> close();
?>