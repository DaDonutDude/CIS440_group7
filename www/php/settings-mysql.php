<?php
    header('Content-Type: application/json');
    $returnVal = array();
    $user = array();
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
            case 'getUser':
                $username = $_POST['arguments'][0];
                $statement = $conn -> prepare("SELECT password, firstName, lastName, Company FROM Users WHERE username=?");
                $statement -> bind_param('s', $username);
                $statement -> execute();
                $result = $statement -> get_result();
                $row = $result -> fetch_row();
                array_push($user, [$row[0], $row[1], $row[2], $row[3]]);
                $returnVal['result'] = $user;
                echo json_encode($returnVal);
                break;
            case 'updatePassword':
                $username = $_POST['arguments'][0];
                $password = $_POST['arguments'][1];
                $statement = $conn -> prepare("UPDATE Users SET password=? WHERE username=?");
                $statement -> bind_param('ss', $password, $username);
                $statement -> execute();
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
    $conn -> close();
?>