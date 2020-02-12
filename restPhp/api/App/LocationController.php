<?php
namespace App;
use PDO;
class LocationController
{
    // Optional properties
    protected $app;
	
	   public function getAllcities(){
			$sql = "SELECT DISTINCT(CITY) FROM PRIN_LOCATION";
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
	   public function getLocationslevel(){
		$sql = "SELECT DISTINCT(COUNTRY) FROM PRIN_LOCATION";
		$filedata = "";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			//getting array countries
			while ($countries = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
				//print_r($countries);
				for($i=0;$i<count($countries);$i++) {
					$country = $countries[$i]['COUNTRY'];
					$location = "SELECT * FROM PRIN_LOCATION WHERE COUNTRY = '".$country."'";
					$stmt = $db->prepare($location);
					$stmt->execute();
					//getting locations based on countries
					$arr = array();
					while ($locations = $stmt->fetch(PDO::FETCH_ASSOC)) {
						if($locations['COUNTRY'] == $country) {
							$arr[] = array(
								$locations['CITY'] => $locations['COUNTRY'],
								$locations['COUNTRY'] => null
								);
								
						}
					}
					
					$result = $this->array_flatten($arr);
					$locations_result = $this->parseTreelevels($result);
					$filedata .= ",".json_encode($locations_result,JSON_PRETTY_PRINT);
				}
			}
			$data = str_replace('],[', ',',$filedata);
			echo $jsonData = str_replace(',[', '[',$data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
   
   public function getLocations(){
		$sql = "SELECT DISTINCT(COUNTRY) FROM PRIN_LOCATION";
		$filedata = "";
		$db = getDB();
		$stmt = $db->prepare($sql);
		try{
			$stmt->execute();
			//getting array countries
			while ($countries = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
				//print_r($countries);
				for($i=0;$i<count($countries);$i++) {
					$country = $countries[$i]['COUNTRY'];
					$location = "SELECT * FROM PRIN_LOCATION WHERE COUNTRY = '".$country."'";
					$stmt = $db->prepare($location);
					$stmt->execute();
					//getting locations based on countries
					$arr = array();
					while ($locations = $stmt->fetch(PDO::FETCH_ASSOC)) {
						//print_r($locations);
						
						if($locations['COUNTRY'] == $country) {
							if($locations['ADDRESS_LINE3'] !='NULL') {
								$arr[] = array(
									$locations['ADDRESS_LINE3'] => $locations['ADDRESS_LINE2'],
									$locations['ADDRESS_LINE2'] => $locations['ADDRESS_LINE1'],
									$locations['ADDRESS_LINE1'] => $locations['CITY'],
									$locations['CITY'] => $locations['COUNTRY'],
									$locations['COUNTRY'] => null
									);
									
							}
							else {
								$arr[] = array(
								$locations['ADDRESS_LINE2'] => $locations['ADDRESS_LINE1'],
								$locations['ADDRESS_LINE1'] => $locations['CITY'],
								$locations['CITY'] => $locations['COUNTRY'],
								$locations['COUNTRY'] => null
								);
								
							}
						}
						else
						{
							
						}
						//$result = array_flatten($arr);
						//$locations_result = parseTree($result);
						
					}
					
					$result = $this->array_flatten($arr);
					$locations_result = $this->parseTreelevels($result);
					$filedata .= ",".json_encode($locations_result,JSON_PRETTY_PRINT);
				}
			}
			$data = str_replace('],[', ',',$filedata);
			echo $jsonData = str_replace(',[', '[',$data);
		}
		catch(PDOException $e){
		 echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	public function array_flatten($array) {

	   $return = array();
	   foreach ($array as $key => $value) {
		   if (is_array($value)){ 
		   $return = array_merge($return, $this->array_flatten($value));
		   }
		   else {
			   if(!empty($key)) {
				  $return[$key] = $value; 
			   }
			   
			}
	   }
	   return $return;

	}

	public function parseTree($tree, $root = null,$limit=0) {
		$return = array();
		# Traverse the tree and search for direct children of the root
		//echo '<pre>';
		//print_r($tree); exit;
		foreach($tree as $child => $parent) {
			# A direct child is found
			
			if($parent == $root) {
				
				# Remove item from tree (we don't need to traverse this again)
				unset($tree[$child]);
				# Append the child into result array and parse its children
				
				$return[] = array(
					'name' => $child,
					'id'=>'itemId',
					'link'=>'javascript:void(0)',
					'level'=>$limit,
					'menu'=>array('title'=>$child,
					'items' => $this->parseTree($tree, $child,$limit++))
				);
				
			}
			//return empty($return) ? 'test' : $return;
		}
		if(empty($return)) {
					$return[] = array(
					'name' => $child,
					'id'=>'itemId',
					'link'=>'javascript:void(0)');
		}
		return $return;
	}
	
	public function parseTreelevels($tree, $root = null) {
		$return = array();
		# Traverse the tree and search for direct children of the root
		//echo '<pre>';
		//print_r($tree); exit;
		
		$child ="";
		foreach($tree as $child => $parent) {
			# A direct child is found
			
			if($parent == $root) {
				# Remove item from tree (we don't need to traverse this again)
				unset($tree[$child]);
				
				# Append the child into result array and parse its children
				if(empty($this->parseTreelevels($tree, $child))){
					$return[] = array(
					'name' => $child,
					'id'=>'itemId',
					'link'=>'javascript:void(0)'
					);
				}
				else {
				$return[] = array(
					'name' => $child,
					'id'=>'itemId',
					'link'=>'javascript:void(0)',
					'menu'=>array('title'=>$child,
					'items' => $this->parseTreelevels($tree, $child))
				);
				
			}
			
			}
		}
		
		return $return;
	}
	
		/************************************************
		@Created by :- 5838
		@Comment	:- get all location in top drop down country and city 
		**********************************************/
		
	 public function getAllLocationDropdown(){
		 
		$selctSql = "SELECT DISTINCT CITY FROM PRIN_LOCATION";
		
		//$selctcountrySql = "SELECT DISTINCT COUNTRY FROM PRIN_LOCATION";
		
		try {
		  $db = getDB();
		  $stmt = $db->prepare($selctSql);
		  $stmt->execute();
		  $citydata = $stmt->fetchAll(PDO::FETCH_ASSOC);
		  
		  $data=array();
		 /* $db1 = getDB();
		  $stmt1 = $db1->prepare($selctcountrySql);
		  $stmt1->execute();
		  $countrydata = $stmt1->fetchAll(PDO::FETCH_ASSOC);
		  
		 	
			foreach($countrydata as $rescountry){
				$country=$rescountry['COUNTRY'];
				
				$data[]=$country;
			}*/
			
			 foreach($citydata as $getcity){
				$data[]=$getcity['CITY'];
			}
			$allcategory=array("All Locations");
			
			array_splice($data, 0, 0, $allcategory );
			
	      echo json_encode($data);
		} catch(PDOException $e) {
		  echo '{"error":{"text":'. $e->getMessage() .'}}';
		  die();
		}
   }
   
   
}