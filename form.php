<?php
const FORM_DATA = [
	'email' => null,
	'phone' => null,
	'phone-additional' => null,
	'second-name' => null,
	'name' => null,
	'patronymics' => null,
	'day-of-birth' => null,
	'month-of-birth' => null,
	'year-of-birth' => null,
	'gender' => null
];
$errors = [];
$formDataRequest = json_decode(file_get_contents('php://input'), true);
if (json_last_error()){
	$errors['json'] = json_last_error_msg();
	echo json_encode(['success' => 'false', 'errors' => $errors]);
	sendMail($formDataRequest['mail'], 'test', json_encode(['success' => 'false', 'errors' => $errors]));
	exit();
}
array_walk($formDataRequest, function(&$el){
	$el = trim(strip_tags($el));
});
if (!isSameArrays(array_keys(FORM_DATA), array_keys($formDataRequest))){
	$errors = array_diff(array_keys(FORM_DATA), array_keys($formDataRequest));
	$errors = array_flip($errors);
	foreach ($errors as &$el)
		$el = 'Это поле обязательно для заполнения.';
	unset($el);
}
else {
	$errors = array_keys($formDataRequest, null);
	$errors = array_flip($errors);
	foreach ($errors as $key => &$el){
		if ($key === 'phone-additional' || $key === 'patronymics')
			unset($errors[$key]);
	$el = 'Это поле обязательное для заполнения.';
	}
}
foreach($formDataRequest as $key => $el){
	if ($key === 'phone' && strlen($el) !== 12)
		$errors['phone'] = 'Введите корректный номер телефона';
	if ($key === 'phone-additional' && strlen($el) !== 12 && !empty($el))
		$errors['phone-additional'] = 'Введите корректный номер телефона';
	if ($key === 'email')
		$validEmail = filter_var($el, FILTER_VALIDATE_EMAIL);
		if(!$validEmail)
			$errors['email'] = 'Введите корректный email';
}
if (count($errors) > 0){
	$response = json_encode(['success' => 'false', 'errors' => $errors]);
	echo $response;
	sendMail($formDataRequest['email'], 'test', $response);
}
else {
	$response = json_encode(['success' => 'true']); 
	echo $response;
	sendMail($formDataRequest['email'], 'test', $response);
}
function isSameArrays($a, $b){
   sort($a);
   sort($b);
   return $a == $b;
}
function sendMail($to, $subject, $message){
	if (!$to){
		return;
	}
	mail($to, $subject, $message);
}