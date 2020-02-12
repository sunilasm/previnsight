<?php
namespace App;
use PDO;
class BadgeController
{
   public function addBadge()
    { 
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$quotes = $this->proc_qoutes($input);
		$sql = "CALL PRIN_PUNCH_IN_OUT_ADD_PROC(".$quotes.")";
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
	
	public function badgeLiberary()
    { 
		
		//$date = date_create($date);
		//$date = date_format($date,"Y-m-d");
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		/*$sql = "SELECT ppIO.USER_ID,ppIO.STATUS,ppIO.PUNCH_IN_OUT,pu.USERNAME,pu.LAST_NAME,pu.FIRST_NAME,pl.COUNTRY,pl.CITY,pl.ADDRESS_LINE1,pl. ADDRESS_LINE2,pl.ADDRESS_LINE3,pl.ADDRESS_LINE4 FROM PRIN_PUNCH_IN_OUT ppIO INNER JOIN PRIN_LOCATION pl ON ppIO.LOCATION_ID = pl.LOCATION_ID INNER JOIN PRIN_USER pu on pu.USER_ID = ppIO.USER_ID WHERE ppIO.PUNCH_IN_OUT <= CONCAT('$date',' ','24:00:00') AND ppIO.PUNCH_IN_OUT >= CONCAT('$date',' ','00:00:00')";*/
        $sql = "SELECT ppIO.USER_ID,ppIO.STATUS,ppIO.PUNCH_IN_OUT, DATE_FORMAT(ppIO.PUNCH_IN_OUT, '%Y-%m-%d')as PUNCH_DATE, pu.USERNAME,pu.LAST_NAME,pu.FIRST_NAME,pl.COUNTRY,pl.CITY,pl.ADDRESS_LINE1,pl. ADDRESS_LINE2,pl.ADDRESS_LINE3,pl.ADDRESS_LINE4 FROM PRIN_PUNCH_IN_OUT ppIO INNER JOIN PRIN_LOCATION pl ON ppIO.LOCATION_ID = pl.LOCATION_ID INNER JOIN PRIN_USER pu on pu.USER_ID = ppIO.USER_ID";
		$db = getDB();
		try{
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$bedgeInfo = $stmt->fetchAll(PDO::FETCH_OBJ);
			
			if(!empty($bedgeInfo)) {
				echo '{"status":"success","response": ' . json_encode($bedgeInfo) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No BadgeInfo Found"}}';
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
    
    public static function reportsBadgeIn($id)
    {
        $request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$sql ="SELECT USER_ID, USERNAME, COUNT( PUNCH_IN_OUT ) as COUNT ,DAYNAME( PUNCH_IN_OUT ) as DAY ,DATE( PUNCH_IN_OUT ) as DATE FROM  PRIN_PUNCH_IN_OUT WHERE USER_ID = ".$id." AND STATUS =  'IN' AND MONTH(PUNCH_IN_OUT) = MONTH( SYSDATE( ) ) GROUP BY USERNAME, DATE( PUNCH_IN_OUT )";
           
		$db = getDB();
		try{
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$logs = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!empty($logs)) {
				foreach($logs as $key =>$logval){
					$date = $logval->DATE;
					$inventory_sample = "SELECT COUNT(*) as inventory_sample_count FROM  PRIN_INV_SAMPLES WHERE USER_ID = ".$id." AND ENTERED_DATE <= ('".$date." 23:59:59') AND ENTERED_DATE >= ('".$date." 00:00:00')";
					$stmt1 = $db->prepare($inventory_sample);
					$stmt1->execute();
					$inventory_count = $stmt1->fetchAll(PDO::FETCH_OBJ);
					$logs[$key]->inventory_sample_count=$inventory_count[0]->inventory_sample_count;
					
					$workorder_sample = "SELECT COUNT(*) as inventory_workorder_count FROM  PRIN_WO_SAMPLES WHERE USER_ID = ".$id." AND ENTERED_DATE <= ('".$date." 23:59:50') AND ENTERED_DATE >= ('".$date." 00:00:00')";
					$stmt1 = $db->prepare($workorder_sample);
					$stmt1->execute();
					$workorder_count = $stmt1->fetchAll(PDO::FETCH_OBJ);
					$logs[$key]->workorder_sample_count=$workorder_count[0]->inventory_workorder_count;
				}
				
				echo '{"status":"success","response": ' . json_encode($logs) . '}';
				$db = null;
			} else {
				echo '{"error":{"status":"failure","response":"No badge info Found"}}';
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