<?php
namespace App;
use PDO;
class MasterController
{
    // Optional properties
    protected $app;
    public function addMaterial()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "INSERT INTO PRIN_MATERIAL (MATERIAL_NAME,DESCRIPTION) VALUES (:material_name, :description)";
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($insertSql);
		  $stmt1->bindParam("material_name", $input->MATERIAL_NAME);
		  $stmt1->bindParam("description", $input->DESCRIPTION);
		  $stmt1->execute();
		  $materialId = $db->lastInsertId();
		  $materialCode = "M-".$db->lastInsertId();
		  $insertCode = "UPDATE PRIN_MATERIAL SET MATERIAL_CODE = :material_code WHERE MATERIAL_ID = ".$materialId;
		  $stmt = $db->prepare($insertCode);
		  $stmt->bindParam("material_code", $materialCode);
		  $stmt->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function editMaterial($material_id)
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "UPDATE PRIN_MATERIAL SET MATERIAL_NAME = :material_name,DESCRIPTION = :description WHERE MATERIAL_ID=".$material_id;
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($updateSql);
		  $stmt1->bindParam("material_name", $input->MATERIAL_NAME);
		  $stmt1->bindParam("description", $input->DESCRIPTION);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function getMaterial()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT * FROM PRIN_MATERIAL";
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
    
    public function checkMaterialnameexits($name){
		$sql = "SELECT count(*) FROM PRIN_MATERIAL WHERE MATERIAL_NAME= '".base64_decode($name)."'";
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
   public function addUom()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "INSERT INTO PRIN_UOM(NAME,DESCRIPTION) VALUES (:name,:description)";
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($insertSql);
		  $stmt1->bindParam("name", $input->NAME);
		  $stmt1->bindParam("description", $input->DESCRIPTION);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   
   public function editUom($uom_id)
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "UPDATE PRIN_UOM SET NAME = :name,DESCRIPTION = :description WHERE UOM_ID=".$uom_id;
		try {
		  $db = getDB();
		 $stmt1 = $db->prepare($updateSql);
		  $stmt1->bindParam("name", $input->NAME);
		  $stmt1->bindParam("description", $input->DESCRIPTION);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function getUom()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT * FROM PRIN_UOM";
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
   public function addManufacturer()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "INSERT INTO PRIN_MANUFACTURER (MANUFACTURER_CODE,MANUFACTURER_NAME,DESCRIPTION) VALUES (:manufacturer_code, :manufacturer_name, :description)";
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($insertSql);
		  $stmt1->bindParam("manufacturer_code", $input->MANUFACTURER_CODE);
		  $stmt1->bindParam("manufacturer_name", $input->MANUFACTURER_NAME);
		  $stmt1->bindParam("description", $input->DESCRIPTION);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function editManufacturer($manf_id)
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "UPDATE PRIN_MANUFACTURER SET MANUFACTURER_CODE = :manufacturer_code,MANUFACTURER_NAME = :manufacturer_name,DESCRIPTION =:description WHERE MANUFACTURER_ID= ".$manf_id;
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($updateSql);
		  $stmt1->bindParam("manufacturer_code", $input->MANUFACTURER_CODE);
		  $stmt1->bindParam("manufacturer_name", $input->MANUFACTURER_NAME);
		  $stmt1->bindParam("description", $input->DESCRIPTION);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function getManufacturer()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT * FROM PRIN_MANUFACTURER";
		try {
		  $db = getDB();
		  $stmt = $db->prepare($updateSql);
		  $stmt->execute();
		  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
	      echo json_encode($data);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function addModel()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "INSERT INTO PRIN_MODEL (MODEL_NUMBER,MODEL_NAME,MANUFACTURER_ID) VALUES (:model_number,:model_name,:manufacturer_id)";
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($insertSql);
		  $stmt1->bindParam("model_number", $input->MODEL_NUMBER);
		  $stmt1->bindParam("model_name", $input->MODEL_NAME);
		  $stmt1->bindParam("manufacturer_id", $input->MANUFACTURER_ID);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function editModel($model_id)
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "UPDATE PRIN_MODEL SET MODEL_NUMBER = :model_number,MODEL_NAME = :model_name,MANUFACTURER_ID = :manufacturer_id WHERE MODEL_ID=".$model_id;
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($updateSql);
		  $stmt1->bindParam("model_number", $input->MODEL_NUMBER);
		  $stmt1->bindParam("model_name", $input->MODEL_NAME);
		  $stmt1->bindParam("manufacturer_id", $input->MANUFACTURER_ID);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function getModel()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT * FROM PRIN_MODEL";
		try {
		  $db = getDB();
		  $stmt = $db->prepare($updateSql);
		  $stmt->execute();
		  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
	      echo json_encode($data);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function addLocation()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "INSERT INTO PRIN_LOCATION (ADDRESS_LINE1,ADDRESS_LINE2,ADDRESS_LINE3,ADDRESS_LINE4,CITY,COUNTRY) VALUES (:address_line1,:address_line2,:address_line3,:address_line4,:city,:country)";
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($insertSql);
		  $stmt1->bindParam("address_line1", $input->ADDRESS_LINE1);
		  $stmt1->bindParam("address_line2", $input->ADDRESS_LINE2);
		  $stmt1->bindParam("address_line3", $input->ADDRESS_LINE3);
		  $stmt1->bindParam("address_line4", $input->ADDRESS_LINE4);
		  $stmt1->bindParam("city", $input->CITY);
		  $stmt1->bindParam("country", $input->COUNTRY);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function editLocation($loc_id)
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$insertSql = "UPDATE PRIN_LOCATION SET ADDRESS_LINE1=:address_line1,ADDRESS_LINE2=:address_line2,ADDRESS_LINE3=:address_line3,ADDRESS_LINE4=:address_line4,CITY=:city,COUNTRY=:country WHERE LOCATION_ID=".$loc_id;
		try {
		  $db = getDB();
		  $stmt1 = $db->prepare($insertSql);
		  $stmt1->bindParam("address_line1", $input->ADDRESS_LINE1);
		  $stmt1->bindParam("address_line2", $input->ADDRESS_LINE2);
		  $stmt1->bindParam("address_line3", $input->ADDRESS_LINE3);
		  $stmt1->bindParam("address_line4", $input->ADDRESS_LINE4);
		  $stmt1->bindParam("city", $input->CITY);
		  $stmt1->bindParam("country", $input->COUNTRY);
		  $stmt1->execute();
		  $response_array['status'] = 'success';
		  echo json_encode($response_array);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function getLocation()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT LOCATION_ID,ADDRESS_LINE1,ADDRESS_LINE2,ADDRESS_LINE3,ADDRESS_LINE4,CITY,COUNTRY FROM PRIN_LOCATION";
		try {
		  $db = getDB();
		  $stmt = $db->prepare($updateSql);
		  $stmt->execute();
		  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
	      echo json_encode($data);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function getManufactureCode()
   {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$updateSql = "SELECT MANUFACTURER_ID,MANUFACTURER_CODE,DESCRIPTION FROM PRIN_MANUFACTURER";
		try {
		  $db = getDB();
		  $stmt = $db->prepare($updateSql);
		  $stmt->execute();
		  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
	      echo json_encode($data);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   public function materialDelete($material_id)
   {	
		$table = "PRIN_MATERIAL";
		$id = "MATERIAL_ID";
		$db = getDB();
		try{
				$deleteSql = "DELETE FROM $table WHERE $id='$material_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function uomDelete($uom_id)
   {	
		$table = "PRIN_UOM";
		$id = "UOM_ID";
		$db = getDB();
		try{
				$deleteSql = "DELETE FROM $table WHERE $id='$uom_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function manufacturerDelete($manufacturer_id)
	{	
		$table = "PRIN_MANUFACTURER";
		$id = "MANUFACTURER_ID";
		$db = getDB();
		try{
				$deleteSql = "DELETE FROM $table WHERE $id='$manufacturer_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function modelDelete($model_id)
	{	
		$table = "PRIN_MODEL";
		$id = "MODEL_ID";
		$db = getDB();
		try{
				$deleteSql = "DELETE FROM $table WHERE $id='$model_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function locationDelete($location_id)
	{	
		$table = "PRIN_LOCATION";
		$id = "LOCATION_ID";
		$db = getDB();
		try{
				$deleteSql = "DELETE FROM $table WHERE $id='$location_id'";
				$stmt = $db->prepare($deleteSql);
				$stmt->execute();
			
			$response_array['status'] = 'success';    
			echo json_encode($response_array);
		}
		catch(PDOException $e){
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	/************************************************
		@Created by :- 5838
		@Comment	:- check UOM name exist or not 
		**********************************************/
	 public function checkUomnameexits($name){
		$sql = "SELECT count(*) FROM PRIN_UOM WHERE NAME= '".base64_decode($name)."'";
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
		@Comment	:- check Manufacture name exist or not 
		**********************************************/
	 public function checkManufacturenameexits($name){
		$sql = "SELECT count(*) FROM PRIN_MANUFACTURER WHERE MANUFACTURER_NAME= '".base64_decode($name)."'";
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
		@Comment	:- check Model Number exist or not 
		**********************************************/
	 public function checkModelnumberexits($name){
		 
		$sql = "SELECT count(*) FROM PRIN_MODEL WHERE MODEL_NUMBER= '".base64_decode($name)."'";
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