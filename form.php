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
if(json_last_error()){
	$errors['json'] = 'bad json';
	echo json_encode(['success' => 'false', 'errors' => $errors]);
	sendMail($formDataRequest['mail'], 'test', json_encode(['success' => 'false', 'errors' => $errors]));
	exit();
}
if (isSameArrays(array_keys(FORM_DATA), array_keys($formDataRequest))){
	$errors = array_keys($formDataRequest, null);
	$errors = array_flip($errors);
	foreach ($errors as $key => &$el){
		if($key === 'phone-additional' || $key === 'patronymics'){
			unset($errors[$key]);
		}
	$el = 'Это поле обязательное для заполнения.';
	} 
}
else {
	$errors = array_diff(array_keys(FORM_DATA), array_keys($formDataRequest));
	$errors = array_flip($errors);
	foreach($errors as &$el){
		$el = 'Это поле обязательно для заполнения.';
	}
	echo json_encode(['success' => 'false', 'errors' => $errors]);
	sendMail($formDataRequest['mail'], 'test', json_encode(['success' => 'false', 'errors' => $errors]));
	exit();
}
array_walk($formDataRequest, function(&$el){
	$el = trim(strip_tags($el));
});
echo json_encode(['success' => 'true']);
sendMail($formDataRequest['mail'], 'test', json_encode(['success' => 'false', 'errors' => $errors]));
function isSameArrays($a, $b){
   sort($a);
   sort($b);
   return $a == $b;
}
function sendMail($to = false, $subject = 'test', $message){
	if($to){
		return;
	}
	mail($to, $subject, $message);
}