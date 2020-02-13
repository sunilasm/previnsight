<?php
namespace App;
use PDO;
class InventoryController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
    public static function proc_qoutes($input) {
		$qts = "";
		foreach($input as $key) {
			$qts .= "?,";
		}
		return rtrim($qts,",");
    }
    public function AuInventory()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$inventory_array = array("i_INVENTORY_CODE",
								 "i_INVENTORY_NAME",
								 "i_CATEGORY",
								 "i_ITEM",
								 "i_COUNTRY",
								 "i_CITY",
								 "i_ADDR1",
								 "i_ADDR2",
								 "i_ADDR3",
								 "i_ADDR4",
								 "i_MACHINERY_ID",
								 "i_SENSOR_ID",
								 "i_PARAMETER_ID",
								 "i_GOAL",
								 "i_STOCK",
								 "i_DESCRIPTION",
								 "i_SUPPLIER",
								 "i_IMAGE",
								 "i_CREATED_BY",
								 "i_LAST_UPDATED_BY");
		$qut="";
		for($i=0;$i<count($inventory_array);$i++){
			$qut .= "?,";
		}
		$quts = rtrim($qut,',');
		$sql = "CALL PRIN_INVENTORY_PROC(".$quts.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		$inv = 1;
		try{
			foreach($input as $key => $value) {
				$stmt->bindParam($inv,$input->$key);
				$inv++;
			}
			$stmt->execute();
			$stmt1 = $db->prepare('SELECT INVENTORY_ID FROM PRIN_INVENTORY ORDER BY INVENTORY_ID DESC LIMIT 1');
			$stmt1->execute();
			$data = $stmt1->fetchAll(PDO::FETCH_ASSOC);
			$inv_id = $data[0]['INVENTORY_ID'];
			//$response_array = array();
			$response_array['status'] = 'success';
			$response_array['inventory_id'] = $inv_id;
			
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getInventorylibrary(){
		$sql = "SELECT ps.SENSOR_NAME,pp.PARAMETER_NAME,pm.NAME AS MACHINERY_NAME,pw.WORK_ORDER_ID,pw.WO_NUMBER,a.*,b.LOCATION_ID,b.ADDRESS_LINE1,		b.ADDRESS_LINE2,b.ADDRESS_LINE3,b.ADDRESS_LINE4,b.CITY,b.STATE,b.COUNTRY FROM PRIN_INVENTORY a INNER JOIN PRIN_LOCATION b ON a.location_id=b.location_id LEFT JOIN  PRIN_WORKORDER pw ON a.INVENTORY_ID = pw.INVENTORY_ID LEFT JOIN PRIN_SENSOR ps ON ps.SENSOR_ID = a.SENSOR_ID LEFT JOIN PRIN_PARAMETER pp on pp.PARAMETER_ID = a.PARAMETER_ID LEFT JOIN PRIN_MACHINERY pm on pm.MACHINERY_ID = a.MACHINERY_ID";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getInventorylibrarybyId($Id){
		//$sql = "SELECT a.*,b.* FROM PRIN_INVENTORY a INNER JOIN PRIN_LOCATION b ON a.location_id=b.location_id AND INVENTORY_ID=".$Id;
        $sql ="SELECT ps.SENSOR_NAME,pp.PARAMETER_NAME,pm.NAME AS MACHINERY_NAME,pw.WORK_ORDER_ID,pw.WO_NUMBER,a.*,b.LOCATION_ID, b.LOCATION_CODE, b.ADDRESS_LINE1, b.ADDRESS_LINE2, b.ADDRESS_LINE3, b.ADDRESS_LINE4, b.CITY, b.STATE,b.COUNTRY FROM PRIN_INVENTORY a INNER JOIN PRIN_LOCATION b ON a.location_id=b.location_id AND a.INVENTORY_ID=".$Id." LEFT JOIN PRIN_WORKORDER pw ON a.INVENTORY_ID = pw.INVENTORY_ID LEFT JOIN PRIN_SENSOR ps ON ps.SENSOR_ID = a.SENSOR_ID LEFT JOIN PRIN_PARAMETER pp on pp.PARAMETER_ID = a.PARAMETER_ID LEFT JOIN PRIN_MACHINERY pm on pm.MACHINERY_ID = a.MACHINERY_ID";
		
		
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getmaterialInventorylist($material){
		$sql = "SELECT * FROM PRIN_INVENTORY WHERE ITEM=".'"'.$material.'"';
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function getInventorycode(){
		$sql = "SELECT INVENTORY_ID FROM PRIN_INVENTORY ORDER BY INVENTORY_ID DESC LIMIT 0 , 1";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll();
			if(empty($data)) {
				echo '[{"INVENTORY_ID":"001"}]';
				exit;
			}
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function inventoryDelete($inventory_id)
    {
		$tables = array("PRIN_INVENTORY");
		$db = getDB();
		try{
			foreach($tables as $table) {
				$deleteSql = "DELETE FROM $table WHERE INVENTORY_ID='$inventory_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			}
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public function createSample()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		
		$quotes = $this->proc_qoutes($input);
		$sql = "CALL PRIN_INV_SAMPLE_PROC(".$quotes.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		$i=1;
		try{
			foreach($input as $key => $value){
				//echo $i ."," .$key."<br>";
				
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
    
     public static function getInventorySamplesById($Id){
		$sql = "SELECT * FROM PRIN_INV_SAMPLES WHERE INVENTORY_ID=".$Id." ORDER BY SAMPLE_ID";
		try{
			$db = getDB();
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if(!empty($data)) {
			echo json_encode($data);
			}
			else {
			echo '{"Message":{"text":"No data found"}}';
			}
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    
    public static function getInventoryParameterSamplesById($Id){
		$sql = "SELECT * FROM PRIN_INV_SAMPLE_PARAMTERS WHERE SAMPLE_ID=".$Id."";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    
    public function getInventorySampleDataById($Id){
		$sql = "SELECT * FROM PRIN_INV_SAMPLES WHERE SAMPLE_ID=".$Id." ORDER BY SAMPLE_ID";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	
	public function invSampleDelete($sample_id)
    {
		$tables = array("PRIN_INV_SAMPLES","PRIN_INV_SAMPLE_PARAMTERS");
		$db = getDB();
		try{
			foreach($tables as $table) {
				$deleteSql = "DELETE FROM $table WHERE SAMPLE_ID='$sample_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			}
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function checkInventorynameexits($name){
       // echo base64_decode($name);die;
		$sql = "SELECT count(*) FROM PRIN_INVENTORY WHERE INVENTORY_NAME= '".base64_decode($name)."'";
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
	
	  /*******************************************************
		@Created by: 5838
		@Message :- getting category count from inventory table 
		*******************************************************/
		public function getInvListAndCount(){
		$sql = "SELECT CATEGORY,COUNT(*) AS TOTALCAT_COUNT FROM PRIN_INVENTORY GROUP BY CATEGORY";
		$db = getDB();
		$stmt = $db->prepare($sql);
		
		$sql1 = "SELECT CATEGORY,COUNT(*) AS TOTALCAT_COUNT FROM PRIN_INVENTORY";
		$db1 = getDB();
		$stmt1 = $db1->prepare($sql1);
		
		try{
			$stmt->execute();
			$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			$stmt1->execute();
			$data1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);

			$allcategory[]=array("CATEGORY"=>'All Inventory',"TOTALCAT_COUNT"=>$data1[0]['TOTALCAT_COUNT']);
			
			array_splice($data, 0, 0, $allcategory );
			
			echo json_encode($data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
		
}