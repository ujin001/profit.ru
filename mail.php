<?php
    function HTTPPost ($url, array $params) { $query = http_build_query($params); $ch = curl_init(); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); curl_setopt($ch, CURLOPT_HEADER, false); curl_setopt($ch, CURLOPT_URL, $url); curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, $query); $response = curl_exec($ch); curl_close($ch); return $response; }

    $email  = htmlspecialchars($_POST['email']);
    $name  = htmlspecialchars($_POST['name']);
    $mobile  = htmlspecialchars($_POST['mobile']);
    $formName  = htmlspecialchars($_POST['form_name']);

    $to = "profit-nl@yandex.ru";
    $secret_google = "6LeTr0AUAAAAANakEd8Y2i7dn3XgDCz601sHh5UX";

    $response = json_decode(HTTPPost(
        "https://www.google.com/recaptcha/api/siteverify",
        array(
            "response" => $_POST['g-recaptcha-response'],
            "secret" => $secret_google
        )
    ));

    if(
        $response && $response->success && $response->success  == true
    ) {
        $subject = "Поздравляем! Новый кандидат в Ваш бизнес!";

        
        $subject = "New candidate from " . $_SERVER['SERVER_NAME'];
        $body = "<head><meta charset=\"utf-8\"><title>Поздравляем! Новый кандидат в Ваш бизнес! (" . $_SERVER['SERVER_NAME'] . ")</title><style>*{margin:0;padding: 0;font: 16px normal Arial, sans-serif;color: #777}h1{font-size: 28px;font-weight: bold;color: #ccc}body{background: #f0f0f0}hr{margin: 30px 0 ;background: #ccc;display: block;width:100%;height:1px;border:none}.message{padding: 5%;box-sizing: border-box}p{margin-bottom: 15px}.input{font-weight: bold;color: #aaa}</style></head><body><div class=\"message\"><h1>Данные:</h1><hr><p><span class=\"input\">Имя: </span>" . $name . "</p><p><span class=\"input\">Номер телефона или скайп: </span>" . $mobile . "</p><p><span class=\"input\">E-mail: </span>" . $email . "</p><p><span class=\"input\">Форма: </span>" . $formName . "</p></div></body>";
        $headers = 'From: info@' . $_SERVER['SERVER_NAME'] . "\r\n" ;
        $headers .='Reply-To: '. $to . "\r\n" ;
        $headers .='X-Mailer: PHP/' . phpversion();
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";

        mail($to, $subject, $body,$headers);
        header("Location: /start.html");

    }else {
        header("Location: /");
    }
    exit(0);