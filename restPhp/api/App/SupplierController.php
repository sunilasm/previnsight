<?php
namespace App;
use PDO;
class SupplierController
{
    // Optional properties
    protected $app;
	public function addSupplier()
    {
		$request = \Slim\Slim::getInstance()->request();
		$input = json_decode($request->getBody());
		$supplierCount = count((array)$input);
		$qut="";
		for($i=0;$i<$supplierCount;$i++){
			$qut .= "?,";
		}
		
		$quts=rtrim($qut,',');
		$sql = "CALL PRIN_SUPPLIER_PROC(".$quts.")";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->bindParam(1,$input->i_SUPPLIER_CODE);
			$stmt->bindParam(2,$input->i_SUPPLIER_NAME);
			$stmt->bindParam(3,$input->i_ADDRESS_LINE1);
			$stmt->bindParam(4,$input->i_ADDRESS_LINE2);
			$stmt->bindParam(5,$input->i_ADDRESS_LINE3);
			$stmt->bindParam(6,$input->i_ADDRESS_LINE4);
			$stmt->bindParam(7,$input->i_CITY);	
			$stmt->bindParam(8,$input->i_COUNTRY);
			$stmt->bindParam(9,$input->i_PHONE_NUMBER);
			$stmt->bindParam(10,$input->i_EMAIL_ADDRESS);
			$stmt->bindParam(11,$input->i_CONTACT_PERSON);
			$stmt->bindParam(12,$input->i_ATTRIBUTE1);
			$stmt->bindParam(13,$input->i_ATTRIBUTE2);
			$stmt->bindParam(14,$input->i_ATTRIBUTE3);
            $stmt->bindParam(15,$input->i_ATTRIBUTE4);
			$stmt->bindParam(16,$input->i_ATTRIBUTE5);
			$stmt->bindParam(17,$input->i_ATTRIBUTE6);
			$stmt->bindParam(18,$input->i_ATTRIBUTE7);
			$stmt->bindParam(19,$input->i_ATTRIBUTE8);
			$stmt->bindParam(20,$input->i_ATTRIBUTE9);
			$stmt->bindParam(21,$input->i_CREATION_DATE);
			$stmt->bindParam(22,$input->i_CREATED_BY);
			$stmt->bindParam(23,$input->i_LAST_UPDATE_DATE);
			$stmt->bindParam(24,$input->i_LAST_UPDATED_BY);
			$stmt->execute();
			$response_array['status'] = 'success';
			echo json_encode($response_array);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
    public function getAllSupplier(){
			$sql = "SELECT * FROM PRIN_SUPPLIER";
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
	   
	/************************************************
		@Created by :- 5838
		@Comment	:- check Supplier name exist or not 
		**********************************************/
	 public function checkSuppliernameexits($name){
		 
		$sql = "SELECT count(*) FROM PRIN_SUPPLIER WHERE SUPPLIER_NAME= '".base64_decode($name)."'";
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