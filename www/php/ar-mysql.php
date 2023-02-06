<?php
    header('Content-Type: application/json');
    $conn = new mysqli("107.180.1.16", "springa2023team7", "springa2023team7", "springa2023team7");
    $returnVal = array();
    $list = array();
    if( !isset($_POST['functionname']) ) { $returnVal['error'] = 'No function name!'; }
    if( !isset($returnVal['error']) ) {
        switch($_POST['functionname']) {
            case 'getUsers':
                $result = $conn -> query("SELECT username, email FROM Users");
                while ($row = $result -> fetch_row()) {
                    array_push($list, [$row[0], $row[1]]);
                }
                $returnVal['result'] = $list;
                echo json_encode($returnVal);
                break;
            case 'getEmailDomains':
                $result = $conn -> query("SELECT domains FROM EmailDomains");
                while ($row = $result -> fetch_row()) {
                    array_push($list, [$row[0]]);
                }
                $returnVal['result'] = $list;
                echo json_encode($returnVal);
                break;
            case 'getPendingAccounts':
                $result = $conn -> query("SELECT username, email FROM PendingAccounts");
                while ($row = $result -> fetch_row()) {
                    array_push($list, [$row[0], $row[1]]);
                }
                $returnVal['result'] = $list;
                echo json_encode($returnVal);
                break;
            case 'writePendingAccounts':
                $username = $_POST['arguments'][0];
                $password = $_POST['arguments'][1];
                $firstname = $_POST['arguments'][2];
                $lastname = $_POST['arguments'][3];
                $email = $_POST['arguments'][4];
                $points = $_POST['arguments'][5];
                $failedAttempts = $_POST['arguments'][6];
                $isAdmin = $_POST['arguments'][7];
                $statement = $conn -> prepare("INSERT INTO PendingAccounts (username, password, firstName, lastName, email, points, failedAttempts, isAdmin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $statement -> bind_param('sssssiii', $username, $password, $firstname, $lastname, $email, $points, $failedAttempts, $isAdmin);
                $statement -> execute();
                break;
            default:
                $returnVal['error'] = 'Not found function '.$_POST['functionname'].'!';
                break;
        }
    }
    $conn -> close();
?>