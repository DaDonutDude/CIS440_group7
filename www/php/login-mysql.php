<?php
    header('Content-Type: application/json');
    $returnVal = array();
    $userList = array();
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
            case 'getUsers':
                $result = $conn -> query("SELECT username, password, failedAttempts, isAdmin FROM Users");
                while ($row = $result -> fetch_row()) {
                    array_push($userList, [$row[0], $row[1], $row[2], $row[3]]);
                }
                $returnVal['result'] = $userList;
                $conn -> close();
                echo json_encode($returnVal);
                break;
            case 'lockAccount' :
                $username = $_POST['arguments'][0];
                $statement = $conn -> prepare("UPDATE Users SET failedAttempts=3 WHERE username=?");
                $statement -> bind_param('s', $username);
                $statement -> execute();
                $conn -> close();
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
?>