<?php
namespace App;
use PDO;
class LoginController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	public function login()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT USER_ID,FIRST_NAME,LAST_NAME,DESIGNATION,DESCRIPTION,USERNAME,USER_ROLE,IS_ACTIVE,	USER_PROFILE_ID,USER_PREFERENCES_ID,LOCATION_ID,BILLING_ADDRESS_ID,PRIMARY_EMAIL_ID,WORK_PHONE,CELL_PHONE,IMAGE FROM PRIN_USER WHERE username ='".$input->username."' AND password = AES_ENCRYPT('".$input->password."','passw')";
		$db = getDB();

		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($user[0])) {
				echo '{"status":"success","response": ' . json_encode($user[0]) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"Invalid user or wrong password"}}';
			}
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
		
    }
    // Optional setters
    public function setApp($app)
    {
        $this->app = $app;
    }

    public function setRequest($request)
    {
        $this->request = $request;
    }

    public function setResponse($response)
    {
        $this->response = $response;
    }

    // Init
    public function init()
    {
        // do things now that app, request and response are set.
    }
}