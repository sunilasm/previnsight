<?php
namespace App;
use PDO;
class UserController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	public function addUser()
    { 
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$quotes = $this->proc_qoutes($input);
		$sql = "CALL PRIN_USER_PROC(".$quotes.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		$i=1;
		try{
			foreach($input as $key => $value){
				$stmt->bindParam($i,$input->$key);
				$i++;
			}
			$stmt->execute();
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public function getAllUsers()
    {
		$sql = "SELECT a.USER_ID,a.FIRST_NAME,a.LAST_NAME,a.DESIGNATION,a.DESCRIPTION,a.USERNAME,a.USER_ROLE,a.IS_ACTIVE,a.BADGE_ID, a.USER_PROFILE_ID,a.USER_PREFERENCES_ID,b.CITY,b.COUNTRY,b.ADDRESS_LINE1,b.ADDRESS_LINE2,b.ADDRESS_LINE3,b.ADDRESS_LINE4,a.BILLING_ADDRESS_ID,a.PRIMARY_EMAIL_ID,a.WORK_PHONE,a.CELL_PHONE,IMAGE FROM PRIN_USER a inner join PRIN_LOCATION b ON a.LOCATION_ID = b.LOCATION_ID";
		$db = getDB();
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($user)) {
				echo '{"status":"success","response": ' . json_encode($user) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No users Found"}}';
			}
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
		
    }
    
    /***************************
		@Created by :- 5838
		@created by :- 12-dec-2016
		@ Forgot password functionality 
	**********************************/
	
	public function forgetPassword(){
		
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		
		$sql = "SELECT USER_ID,AES_DECRYPT(PASSWORD, 'passw') as pwd,FIRST_NAME FROM PRIN_USER WHERE PRIMARY_EMAIL_ID ='".$input->email."'";
		$db = getDB();
		try{
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($user[0])) {
				$to = $input->email;
				$subject = "Forgot Password";
				$message = 'Dear '.ucfirst($user[0]->FIRST_NAME).',<br/><br/>You requested that your password be sent to you because it was forgotten or lost.<br/><br/><br/>Your password is: '.$user[0]->pwd.' <br/><br/><br/>Thanks & Regards,<br/>Previnsights.com';
				 
				 $header = "From:info@previnsights.com \r\n";
				 $header .= "MIME-Version: 1.0\r\n";
				 $header .= "Content-type: text/html\r\n";
				 $retval = mail ($to,$subject,$message,$header);
				 
				echo '{"status":"success","response": ' . json_encode($user[0]) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"Email is not registered!"}}';
			}
			
			//$response_array['status'] = 'success';
	
		}catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';	
		}

	}
	/****** End ********/
	
	
	public function getUserbyId($id)
    {

		$sql = "SELECT pu.USER_ID,AES_DECRYPT(pu.PASSWORD, 'passw') AS PASSWORD,pu.FIRST_NAME,pu.LAST_NAME,pu.DESIGNATION,pu.DESCRIPTION,pu.USERNAME,pu.USER_ROLE,pu.IS_ACTIVE,pu.BADGE_ID,	pu.USER_PROFILE_ID,pu.USER_PREFERENCES_ID,pu.LOCATION_ID,pu.BILLING_ADDRESS_ID,pu.PRIMARY_EMAIL_ID,pu.WORK_PHONE,pu.CELL_PHONE,pu.IMAGE,pl.ADDRESS_LINE1,pl.ADDRESS_LINE2,pl.ADDRESS_LINE3,pl.ADDRESS_LINE4,pl.CITY,pl.STATE,pl.COUNTRY FROM PRIN_USER pu JOIN PRIN_LOCATION pl on pl.LOCATION_ID = pu.LOCATION_ID WHERE pu.USER_ID=".$id;
		

		$db = getDB();
		try {
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$user = $stmt->fetchAll(PDO::FETCH_OBJ);
			
			if(!empty($user)) {
				echo '{"status":"success","response": ' . json_encode($user) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No users Found"}}';
			}
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
		
    }
	
			/***************************************
			@Created by :- 5838
			@Message :- Add user profile into table.
			****************************************/
	
	public function addUserProfile(){
		
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "INSERT INTO PRIN_USER_PROFILES(NAME,DESCRIPTION,PROFILE_NAME,CREATION_DATE,CREATED_BY) VALUES (:name,:description,:profile_name,:creation_date,:created_by)";
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($insertSql);
		  $stmt1->bindParam("name", $input->name);
		  $stmt1->bindParam("description", $input->description);
		  $stmt1->bindParam("profile_name", $input->name);
		  $stmt1->bindParam("creation_date", $input->CREATION_DATE);
		  $stmt1->bindParam("created_by", $input->CREATED_BY);
		  $stmt1->execute();
		  $userProfileId = $db->lastInsertId();
          $updateSql = "SELECT USER_PROFILE_ID,NAME,DESCRIPTION,PROFILE_NAME FROM PRIN_USER_PROFILES where USER_PROFILE_ID=".$userProfileId."";
          $stmt = $db->prepare($updateSql);
          $stmt->execute();
          $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
          $response_array['status'] = 'success';
          $data=array_merge($data,$response_array);
          echo json_encode($data);
        } catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		   die();
		}
		
	}
		/***************************************
			@Created by :- 5838
			@Message :- update user profile into table.
			****************************************/
	public function editUserProfile($user_profile_id)
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
/*INSIGHT_SETTINGS = :insight,*/
$updateSql = "UPDATE PRIN_USER_PROFILES SET WORKORDER_SETTINGS = :workorder,QUALITY_SETTINGS = :quality,INVENTORY_SETTINGS = :inventory,INVQUALITY_SETTINGS = :invquality,RECEIPE_SETTINGS = :receipe,EQUIPMENTMENU_SETTINGS = :equipment,SENSOR_SETTINGS = :sensor,MACHINERY_SETTINGS = :machinery,LOGACTIVITY_SETTINGS = :logactivity,ADDQUALIFICATION_SETTINGS = :qualification,PARAMETER_SETTINGS = :parameter,REPORTSMENU_SETTINGSF = :report,ADMIN_SETTINGS = :admin,USER_SETTINGS = :user,ROLES_SETTINGS = :roles,MASTER_SETTINGS=	:master,MAERIALS_SETTINGS = :materials,UOM_SETTINGS = :uom,MANUFACTURER_SETTINGS = :manufacturer,
MODEL_SETTINGS = :model,LOCATION_SETTINGS = :location,SUPPILER_SETTINGS = :suppiler,SHOWCHAT_SETTINGS=:showchat,SHOWALERTS_SETTINGS=:showalert,
SHOWLOCATIONMAP_SETTINGS=:showlocationmap,LAST_UPDATED_DATE=:lastuptdate,LAST_UPDATED_BY=:lastupdatedby WHERE USER_PROFILE_ID=".$user_profile_id;
			
		try {
			$db = getDB();
			$stmt1 = $db->prepare($updateSql);
			//$stmt1->bindParam("insight", $input->INSIGHT_SETTINGS);
			$stmt1->bindParam("workorder", $input->WORKORDER_SETTINGS);
			$stmt1->bindParam("quality", $input->QUALITY_SETTINGS);
			$stmt1->bindParam("inventory", $input->INVENTORY_SETTINGS);
			$stmt1->bindParam("invquality", $input->INVQUALITY_SETTINGS);
			$stmt1->bindParam("receipe", $input->RECEIPE_SETTINGS);
			$stmt1->bindParam("equipment", $input->EQUIPMENTMENU_SETTINGS);
			$stmt1->bindParam("sensor", $input->SENSOR_SETTINGS);
			$stmt1->bindParam("machinery", $input->MACHINERY_SETTINGS);
			$stmt1->bindParam("logactivity", $input->LOGACTIVITY_SETTINGS);
			$stmt1->bindParam("qualification", $input->ADDQUALIFICATION_SETTINGS);
			$stmt1->bindParam("parameter", $input->PARAMETER_SETTINGS);
			$stmt1->bindParam("report", $input->REPORTSMENU_SETTINGSF);
			$stmt1->bindParam("admin", $input->ADMIN_SETTINGS);
			$stmt1->bindParam("user", $input->USER_SETTINGS);
			$stmt1->bindParam("roles", $input->ROLES_SETTINGS);
			$stmt1->bindParam("master", $input->MASTER_SETTINGS);
			$stmt1->bindParam("materials", $input->MATERIALS_SETTINGS);
			$stmt1->bindParam("uom", $input->UOM_SETTINGS);
			$stmt1->bindParam("manufacturer", $input->MANUFACTURER_SETTINGS);
			$stmt1->bindParam("model", $input->MODEL_SETTINGS);
			$stmt1->bindParam("location", $input->LOCATION_SETTINGS);
			$stmt1->bindParam("suppiler", $input->SUPPILER_SETTINGS);
			$stmt1->bindParam("showchat", $input->SHOWCHAT_SETTINGS);
			$stmt1->bindParam("showalert", $input->SHOWALERTS_SETTINGS);
			$stmt1->bindParam("showlocationmap", $input->SHOWLOCATIONMAP_SETTINGS);
			$stmt1->bindParam("lastuptdate", $input->LAST_UPDATED_DATE);
			$stmt1->bindParam("lastupdatedby", $input->LAST_UPDATED_BY);

			//echo $stmt1;die;
			
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
		/***************************************
			@Created by :- 5838
			@Message :- get all user profile list from table.
			****************************************/
	public function getUserProfiles()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT USER_PROFILE_ID,NAME,DESCRIPTION,PROFILE_NAME FROM PRIN_USER_PROFILES";
		try {
		  $db = getDB();
		  $stmt = $db->prepare($updateSql);
		  $stmt->execute();
		  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
	      echo json_encode($data);
		}
		  catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
		/***************************************
			@Created by :- 5838
			@Message :- get user profile record by id.
			****************************************/
	public function getUserProfilebyId($user_profile_id)
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT * FROM PRIN_USER_PROFILES where USER_PROFILE_ID=".$user_profile_id;
		try {
		  $db = getDB();
		  $stmt = $db->prepare($updateSql);
		  $stmt->execute();
		  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
		  
		  $data=$data[0];
		  
			//$insight		=	$this->column_implode($data['INSIGHT_SETTINGS'],"insight");
			$workorder		=	$this->column_implode($data['WORKORDER_SETTINGS'],"workorder");
			$quality		=	$this->column_implode($data['QUALITY_SETTINGS'],"quality");
			$inventory		=	$this->column_implode($data['INVENTORY_SETTINGS'],"inventory");
			$invquality		=	$this->column_implode($data['INVQUALITY_SETTINGS'],"invquality");
			$recipe			=	$this->column_implode($data['RECEIPE_SETTINGS'],"recipe");
			$equipment		=	$this->column_implode($data['EQUIPMENTMENU_SETTINGS'],"equipment");
			$sensor			=	$this->column_implode($data['SENSOR_SETTINGS'],"sensor");
			$machinery		=	$this->column_implode($data['MACHINERY_SETTINGS'],"machinery");
			$logactivity	=	$this->column_implode($data['LOGACTIVITY_SETTINGS'],"logactivity");
			$qualification	=	$this->column_implode($data['ADDQUALIFICATION_SETTINGS'],"qualification");
			$parameter		=	$this->column_implode($data['PARAMETER_SETTINGS'],"parameter");
			$report			=	$this->column_implode($data['REPORTSMENU_SETTINGSF'],"report");
			$admin			=	$this->column_implode($data['ADMIN_SETTINGS'],"admin");
			$user			=	$this->column_implode($data['USER_SETTINGS'],"user");
			$role			=	$this->column_implode($data['ROLES_SETTINGS'],"role");
			$master			=	$this->column_implode($data['MASTER_SETTINGS'],"master");
			$material		=	$this->column_implode($data['MAERIALS_SETTINGS'],"material");
			$uom			=	$this->column_implode($data['UOM_SETTINGS'],"uom");
			$manufacturer	=	$this->column_implode($data['MANUFACTURER_SETTINGS'],"manufacturer");
			$model			=	$this->column_implode($data['MODEL_SETTINGS'],"model");
			$location		=	$this->column_implode($data['LOCATION_SETTINGS'],"location");
			$supplier		=	$this->column_implode($data['SUPPILER_SETTINGS'],"supplier");
			
			
			$merge_array = array_merge_recursive($workorder,$quality,$inventory,$invquality,$recipe,$equipment,$sensor,$machinery,$logactivity,$qualification,$parameter,$report,$admin,$user,$role,$master,$material,$uom,$manufacturer,$model,$location,$supplier);
			
		 // echo "<pre>";
		 
		  $data=array_merge($data,$merge_array);
		   
		  unset($data['INSIGHT_SETTINGS']);
		  unset($data['WORKORDER_SETTINGS']);
		  unset($data['QUALITY_SETTINGS']);
		  unset($data['INVENTORY_SETTINGS']);
		  unset($data['INVQUALITY_SETTINGS']);
		  unset($data['RECEIPE_SETTINGS']);
		  unset($data['EQUIPMENTMENU_SETTINGS']);
		  unset($data['SENSOR_SETTINGS']);
		  unset($data['MACHINERY_SETTINGS']);
		  unset($data['LOGACTIVITY_SETTINGS']);
		  unset($data['ADDQUALIFICATION_SETTINGS']);
		  unset($data['PARAMETER_SETTINGS']);
		  unset($data['REPORTSMENU_SETTINGSF']);
		  unset($data['ADMIN_SETTINGS']);
		  unset($data['USER_SETTINGS']);
		  unset($data['ROLES_SETTINGS']);
		  unset($data['MAERIALS_SETTINGS']);
		  unset($data['UOM_SETTINGS']);
		  unset($data['MANUFACTURER_SETTINGS']);
		  unset($data['MODEL_SETTINGS']);
		  unset($data['LOCATION_SETTINGS']);
		  unset($data['SUPPILER_SETTINGS']);
		  unset($data['MASTER_SETTINGS']);
		  
		  
		 // print_r($data);die;
		  
		  
	      echo json_encode($data);
		}
		  catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function deleteUserProfile($user_profile_id){
	   
	    $table = "PRIN_USER_PROFILES";
		$id = "USER_PROFILE_ID";
		$db = getDB();
		try{
				$deleteSql = "DELETE FROM $table WHERE $id='$user_profile_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
		
		
   }
	/***********************
		@Created By : 5838
		@Cretaed date :16-12-2016
		@Message :- get extract table column string to array in seprate field 
		******************************/
	public function column_implode($input,$fieldname) {
		//$data	=array();
		
		$create_field=$fieldname."Create";
		$read_field=$fieldname.'Read';
		$update_field=$fieldname.'Update';
		$delete_field=$fieldname.'Delete';
		
		if(!empty($input)){
		$convery_in_array=explode(',',$input);
		list($c, $r, $u, $d) = $convery_in_array;
		
		$data =array($create_field=>intval($c),$read_field=>intval($r),$update_field=>intval($u),$delete_field=>intval($d));
		//print_r($data);die;
		}else{
		$data =array($create_field=>intval(0),$read_field=>intval(0),$update_field=>intval(0),$delete_field=>intval(0));	
		}
		return $data;
		
	}
	/*End*/
	public function proc_qoutes($input) {
		$qts = "";
		foreach($input as $key) {
			$qts .= "?,";
		}
		return rtrim($qts,",");
	}
	
	/************************************************
		@Created by :- 5838
		@Comment	:- check User Profile name exist or not 
		**********************************************/
	 public function checkProfilenameexits($name){
		 
		$sql = "SELECT count(*) FROM PRIN_USER_PROFILES WHERE NAME= '".base64_decode($name)."'";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchcolumn();
			//print_r($data);
			echo $data;
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	/************************************************
		@Created by :- 5838
		@Comment	:- check UserName name exist or not 
		**********************************************/
	 public function checkUsernameexits($name){
		 
		$sql = "SELECT count(*) FROM PRIN_USER WHERE USERNAME= '".base64_decode($name)."'";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchcolumn();
			//print_r($data);
			echo $data;
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}