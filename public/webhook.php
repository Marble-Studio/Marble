<?php

$apiKey = '7530853145:AAGSiXFUT7mySRKJFqQyLE7MSfAkxcdWXEs'; // Your Telegram bot API key

$apiUrl = "https://api.telegram.org/bot$apiKey/";

 

// Get the incoming message
$content = file_get_contents("php://input");
$update = json_decode($content, true);

if (isset($update['message'])) {
    // Extract necessary information from the update
    $chat_id = $update['message']['chat']['id'];
    $text = $update['message']['text'];
    $message_id = $update['message']['message_id'];
    $user_id = $update['message']['from']['id'];
    $user_first_name = $update['message']['from']['first_name'];
    $user_last_name = isset($update['message']['from']['last_name']) ? $update['message']['from']['last_name'] : 'Not provided';
    $user_username = isset($update['message']['from']['username']) ? $update['message']['from']['username'] : 'Not provided'; // Get user's username
    $user_language_code = isset($update['message']['from']['language_code']) ? $update['message']['from']['language_code'] : 'Not provided';

    // Path to the image
    $photoPath = __DIR__ . '/start.png';

    // Check if the "/start" command has a referral
    if (strpos($text, '/start') === 0) {
        // Extract the referrer ID from the referral link (if present)
        $referrer_id = null;
        if (strpos($text, '/start r') === 0) {
            $referrer_id = substr($text, 8);
        }

        // If there's a referrer, notify them
        if ($referrer_id) {
            $notificationText = "$user_first_name joined using your referral link! 🎉";

            $ch_notify = curl_init();
            curl_setopt($ch_notify, CURLOPT_URL, $apiUrl . "sendMessage");
            curl_setopt($ch_notify, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch_notify, CURLOPT_POST, 1);

            $post_notify = [
                'chat_id' => $referrer_id,
                'text' => $notificationText
            ];

            curl_setopt($ch_notify, CURLOPT_POSTFIELDS, $post_notify);
            curl_setopt($ch_notify, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch_notify, CURLOPT_SSL_VERIFYHOST, 0);

            $result = curl_exec($ch_notify);
            if ($result === false) {
                error_log("CURL Error: " . curl_error($ch_notify));
            }
            curl_close($ch_notify);
        }

        // Standard /start welcome message with image
        if ($text === '/start' || $referrer_id) {
            $caption = "*Welcome to Marble!* 🎮\n\n" .
           "Enjoy addictive mobile games right here on Telegram. \n\n" .
           "✨ *Invite Friends* - Earn rewards together!\n" .
           "🎉 *Play Games* - Experience the thrill and challenge!\n" .
           "💰 *Mine Tokens* - Tokens will be listed soon!\n\n" .
           "Ready to start your adventure? Tap below! 👇";


            $referralLink = $referrer_id ? "https://marbletoken.com/?ref=$referrer_id" : "https://marbletoken.com";

            if (file_exists($photoPath)) {
                $realPath = realpath($photoPath);

                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $apiUrl . "sendPhoto");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_POST, 1);

                $post_fields = [
                    'chat_id' => $chat_id,
                    'photo' => new CURLFILE($realPath),
                    'caption' => $caption,
                    'parse_mode' => 'Markdown',
                    'reply_markup' => json_encode([
                        'inline_keyboard' => [
                            [
                                ['text' => 'Play Marble Now', 'web_app' => ['url' => $referralLink]],
                            ]
                        ]
                    ])
                ];

                curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

                $result = curl_exec($ch);
                if ($result === false) {
                    error_log("CURL Error: " . curl_error($ch));
                }

                curl_close($ch);
            } else {
                error_log("Image not found: " . $photoPath);
            }
        }

 
    }
}

 

?>