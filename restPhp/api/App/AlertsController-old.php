<?php
namespace App;
use PDO;
use stdClass;
class AlertsController
{
    // Optional properties
    protected $app;
    protected $request;
    protected $response;
	
    public function GetAlertsData(){	
		$request = \Slim\Slim::getInstance()->request();
		$data = $request->getBody();
		$memcache = memcache_connect('localhost', 11211);
		if(!empty($data)) {
			$jsonString = $request->getBody();
			
			$cacheKey = 'getalertsmemcache';
			$cacheLifetime = 2592000;
			$fileData = $memcache->get($cacheKey);
			if($fileData != "") {
				$fileData .= ",".$jsonString;
				$memcache->set($cacheKey, $fileData, false, $cacheLifetime) or die ("Failed to save data at the server");
				echo "Store data in the cache (data will expire in ".$cacheLifetime." seconds)<br/>\n";
				echo file_put_contents("alerts_changes.txt","Hello World. Testing!");
			}
			else {
				$fileData = $jsonString;
				$memcache->set($cacheKey, $fileData, false, $cacheLifetime) or die ("Failed to save data at the server");
				echo "Store data in the cache (data will expire in ".$cacheLifetime." seconds)<br/>\n";
				echo file_put_contents("alerts_changes.txt","Hello World. Testing!");
		}
		$fileData = $memcache->get($cacheKey);
		echo "Data from the cache:<br/>\n";
		var_dump($fileData);
		}
	}
	public function PostAlerts2UI(){	
		$memcache = memcache_connect('localhost', 11211);
		$cacheKey = 'getalertsmemcache';
		$fileData = "[".$memcache->get($cacheKey)."]";
		$fileData = json_decode($fileData);
		$this->setResponse($this->json(array("message"=>"Got Content Sucessfully","data"=>$fileData)), 200);
	}
	/*
	 *	Encode array into JSON
	*/
	public function json($data){
		if(is_array($data)){
			return json_encode($data);
		}
	}
	
	public function setResponse($response)
    {
        echo $this->response = $response;
    }
	public function setRequest($request)
    {
        $this->request = $request;
    }
}