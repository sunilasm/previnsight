<?php
namespace App;
use PDO;
class LogactivityController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	
    public function addLogactivity()
    { 
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		
		if($input->i_LOG_ACTIVITY_MATERIAL_ID1=='NULL') {
		$input->i_LOG_ACTIVITY_MATERIAL_ID1 = null;
		$input->i_ACTIVITY_ID1 = null;
		}
		if($input->i_LOG_ACTIVITY_MATERIAL_ID2=='NULL') {
		$input->i_LOG_ACTIVITY_MATERIAL_ID2 = null;
		$input->i_ACTIVITY_ID2 = null;
		}
		$quotes = $this->proc_qoutes($input);
		$sql = "CALL PRIN_LOG_ACTIVITY_PROC(".$quotes.")";
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
	
	public function logLiberarymachid($machid)
    { 
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT a.*,b.COUNTRY,b.CITY,b.ADDRESS_LINE1,b.ADDRESS_LINE2,b.ADDRESS_LINE3,b.ADDRESS_LINE4 FROM PRIN_LOG_ACTIVITY a INNER JOIN PRIN_LOCATION b on a.LOCATION_ID = b.LOCATION_ID WHERE MACHINERY_ID=".$machid;
		$db = getDB();
		try{
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$logs = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($logs)) {
				echo '{"status":"success","response": ' . json_encode($logs) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No logs Found"}}';
			}
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    
    
	public function qualificationBymachid($machid)
    { 
	$request = \Slim\Slim::getInstance()->request();
	$input = json_decode($request->getBody());
	$sql = "SELECT a.*,b.COUNTRY,b.CITY,b.ADDRESS_LINE1,b.ADDRESS_LINE2,b.ADDRESS_LINE3,b.ADDRESS_LINE4 FROM PRIN_QUALIFICATION a INNER JOIN PRIN_LOCATION b on a.LOCATION_ID = b.LOCATION_ID WHERE MACHINERY_ID=".$machid;
	$db = getDB();
	try{
		$stmt = $db->prepare($sql);
		$stmt->execute();
		$logs = $stmt->fetchAll(PDO::FETCH_OBJ);
		if(!empty($logs)) {
			echo '{"status":"success","response": ' . json_encode($logs) . '}';
			$db = null;
		} else {
			echo '{"error":{"status":"failure","response":"No qualification Found"}}';
		}
	}
	catch(PDOException $e){
	  echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
	}
    
    public function logLiberarymaterialsid($id)
    { 
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql = "SELECT * FROM PRIN_LOG_ACTIVITY_MATERIALS WHERE ACTIVITY_ID=".$id;
		$db = getDB();
		try{
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$logs = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($logs)) {
				echo '{"status":"success","response": ' . json_encode($logs) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No logs Found"}}';
			}
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	
	public function addQualification()
    { 
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$quotes = $this->proc_qoutes($input);
		$sql = "CALL PRIN_QUALIFICATION_PROC(".$quotes.")";
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
	public function proc_qoutes($input) {
		$qts = "";
		foreach($input as $key) {
			$qts .= "?,";
		}
		return rtrim($qts,",");
	}
}