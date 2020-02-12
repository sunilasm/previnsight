<?php
require 'db.php';
require 'vendor/autoload.php';

$app = new \Slim\Slim();
$app->get('/', 'App\IndexController:index');
$app->get('/hello/:name', 'App\IndexController:hello');
// Push alert data from python
$app->post('/getalerts','App\AlertsController:GetAlertsData');
// Display the alert data in the UI
$app->get('/PostAlerts2UI','App\AlertsController:PostAlerts2UI');
// Log Activity services
$app->get('/totalCountofAlerts/:id/:fid','App\AlertsController:totalCountofAlerts');
$app->group('/logs', function () use ($app) {
	$app->post('/addlog','App\LogactivityController:addLogactivity');
	$app->post('/addqualification','App\LogactivityController:addQualification');
	$app->get('/logliberarymachid/:id','App\LogactivityController:logLiberarymachid');
	$app->get('/qualificationbymachid/:id','App\LogactivityController:qualificationBymachid');
    $app->get('/logliberarymaterialsid/:id', 'App\LogactivityController:logLiberarymaterialsid');
});
// Users services
$app->post('/users/login', 'App\LoginController:login');
$app->group('/user', function () use ($app) {
	$app->post('/adduser','App\UserController:addUser');
    /* @ Created by :5838 @get password of user */
	$app->post('/forgetpassword','App\UserController:forgetPassword');
	//Get all Users
	$app->get('/getallusers','App\UserController:getAllUsers');
    $app->get('/getuserbyid/:id', 'App\UserController:getUserbyId');
	/* @ Created by :5838 @get all  user profile list from table  */
	$app->get('/getuserprofile','App\UserController:getUserProfiles');
	/* @ Created by :5838 @save record in user profile table  */
	$app->post('/adduserprofile','App\UserController:addUserProfile');
	/* @ Created by :5838 @update record in user profile table  */
	$app->post('/edituserprofile/:id','App\UserController:editUserProfile');	
	/* @ Created by :5838 @get record of user profile by id  */
	$app->get('/getuserprofilebyid/:id', 'App\UserController:getUserProfilebyId');
	$app->get('/deleteuserprofile/:id', 'App\UserController:deleteUserProfile');
	/* @ Created by :5838 @check profile name exist or not in table  */
	$app->get('/checkprofilenameexits/:name','App\UserController:checkProfilenameexits');
	$app->get('/checkusernameexits/:name','App\UserController:checkUsernameexits');
	
});
//Group of Work Order services
$app->group('/master', function () use ($app) {
	$app->post('/addmaterial','App\MasterController:addMaterial');
	$app->post('/editmaterial/:id','App\MasterController:editMaterial');
	$app->get('/getmaterial','App\MasterController:getMaterial');
	$app->get('/materialdelete/:id','App\MasterController:materialDelete');
    $app->get('/checkmaterialnameexits/:name','App\MasterController:checkMaterialnameexits');
    
	
	$app->post('/adduom','App\MasterController:addUom');
	$app->post('/edituom/:id','App\MasterController:editUom');
	$app->get('/getuom','App\MasterController:getUom');
	$app->get('/uomdelete/:id','App\MasterController:uomDelete');
	$app->get('/checkuomnameexits/:name','App\MasterController:checkUomnameexits');
	
	$app->post('/addmanufacturer','App\MasterController:addManufacturer');
	$app->post('/editmanufacturer/:id','App\MasterController:editManufacturer');
	$app->get('/getmanufacturer','App\MasterController:getManufacturer');
	$app->get('/getmanufacturercode','App\MasterController:getManufactureCode');
	$app->get('/manufacturerdelete/:id','App\MasterController:manufacturerDelete');
	$app->get('/checkmanufacturenameexits/:name','App\MasterController:checkManufacturenameexits');
	
	$app->post('/addmodel','App\MasterController:addModel');
	$app->post('/editmodel/:id','App\MasterController:editModel');
	$app->get('/getmodel','App\MasterController:getModel');
	$app->get('/modeldelete/:id','App\MasterController:modelDelete');
	$app->get('/checkmodelnumberexits/:name','App\MasterController:checkModelnumberexits');
	
	$app->post('/addlocation','App\MasterController:addLocation');
	$app->post('/editlocation/:id','App\MasterController:editLocation');
	$app->get('/getlocation','App\MasterController:getLocation');
	$app->get('/locationdelete/:id','App\MasterController:locationDelete');
});
//Group of add Supplier services
$app->group('/supplier', function () use ($app) {
	// Add or Update Work order details
	$app->post('/addsupplier','App\SupplierController:addSupplier');
    $app->get('/getallsupplier', 'App\SupplierController:getAllSupplier');
	$app->get('/checksuppliernameexits/:name','App\SupplierController:checkSuppliernameexits');
});
//Group of add Supplier services
$app->group('/badge', function () use ($app) {
	// Add or Update Work order details
	$app->get('/badgelibrary', 'App\BadgeController:badgeLiberary');
	$app->post('/addbadge','App\BadgeController:addBadge');
    $app->get('/reportsbadgein/:id', 'App\BadgeController:reportsBadgeIn');
	
});

//Group of ToplogyController Order services
$app->group('/toplogy', function () use ($app) {
	// Push alert data from python
	$app->post('/settoplogy','App\ToplogyController:setTopplogy');
	// Display the alert data in the UI
	$app->get('/gettoplogy','App\ToplogyController:getTopplogy');
});

//Group of Work Order services
$app->group('/location', function () use ($app) {
	// Get locations
	$app->get('/getlocations','App\LocationController:getLocations');
	// Get locations two levels
	$app->get('/getlocationslevel','App\LocationController:getLocationslevel');
	// Get locations two levels
	$app->get('/getallcities','App\LocationController:getAllcities');
	
	$app->get('/getalllocationdropdown','App\LocationController:getAllLocationDropdown');
	
});

//Group of Work Order services
$app->group('/inventory', function () use ($app) {
	// Add or Update Work order details
	$app->post('/addinventory','App\InventoryController:AuInventory');
	// Get Inventory order Library
	$app->get('/getinventorylibrary','App\InventoryController:getInventorylibrary');
	// Get Inventory order Library by Id
	$app->get('/getinventorylibrarybyid/:id','App\InventoryController:getInventorylibrarybyId');
	// Get Inventory order Library by Id
	$app->get('/getinventorylibrarybymaterial/:id','App\InventoryController:getmaterialInventorylist');
	// Get Inventory CODE
	$app->get('/getinventorycode','App\InventoryController:getInventorycode');
	// Delete inventory details
	$app->get('/inventorydelete/:id', 'App\InventoryController:inventoryDelete');
	
	$app->post('/createsample', 'App\InventoryController:createSample');
    
    $app->get('/getinventorysamplesbyid/:id', 'App\InventoryController::getInventorySamplesById');
    
    $app->get('/getinventoryparametersamplesbyid/:id', 'App\InventoryController::getInventoryParameterSamplesById');
    
    $app->get('/getinventorysampledatabyid/:id', 'App\InventoryController:getInventorySampleDataById');
    
	$app->get('/invsampledeletebyid/:id', 'App\InventoryController:invSampleDelete');
	
	$app->get('/checkinventorynameexits/:name','App\InventoryController:checkInventorynameexits');
	
	$app->get('/getinvlistandcount','App\InventoryController:getInvListAndCount');
});

//Group of Work Order services
$app->group('/workorder', function () use ($app) {
	// Add or Update Work order details
	$app->post('/addworkorder','App\WorkorderController:AuWorkorder');
	// Get Work order Library
	$app->get('/getworkorderlibrary','App\WorkorderController:getWorkorderlibrary');
	// Get Work order Library by Id
	$app->get('/getworkorderlibrarybyid/:id','App\WorkorderController:getWorkorderlibrarybyId');
	// Get Work order Reference Product by Id 
	$app->get('/getworkorderproductreferencebyid/:id','App\WorkorderController:getWorkorderProductReferencebyId');
	// Get Work order Operators
	$app->get('/getworkorderoperators','App\WorkorderController:getOperators');
	// Delete Work order details
	$app->get('/workorderdelete/:id', 'App\WorkorderController:workorderDelete');
	
	$app->post('/createsample', 'App\WorkorderController::createSample');
    
    $app->get('/getworkordersamplesbyid/:id', 'App\WorkorderController::getWorkorderSamplesById');
    
    $app->get('/getworkorderparametersamplesbyid/:id', 'App\WorkorderController::getWorkorderParameterSamplesById');
    
    $app->get('/getsampledatabyid/:id', 'App\WorkorderController:getSampleDataById');
    
    $app->get('/wosampledeletebyid/:id', 'App\WorkorderController:woSampleDelete');
    
});

//Group of recipe services
$app->group('/recipe', function () use ($app) {
	
	// Delete recipe details
	$app->get('/recipedelete/:id', 'App\RecipeController:recipeDelete');
	
	// Delete recipe product profile details
	$app->get('/recipeproductdelete/:id', 'App\RecipeController:recipeProductDelete');
	 
	// Add or Update recipe details
	$app->post('/addingrecipe','App\RecipeController:AddRecipe');
	
	// Add or Update recipe details
	$app->post('/addrecipe','App\RecipeController:AuRecipe');
	
	// Get Recipe Library
	$app->get('/getrecipelibrary','App\RecipeController:getRecipelibrary');
	
	// Get Recipe Library by Id
	$app->get('/getrecipelibrarybyid/:id','App\RecipeController:getRecipelibrarybyId');
	
	// Get Recipe Product profile by Id 
	$app->get('/getproductprofilebyid/:id','App\RecipeController:getProductProfilebyId');
});
//Group of equipment services
$app->group('/equipment', function () use ($app) {
	 // Add or Update machinery details
	 $app->post('/machinery','App\EquipmentController:machinery');
	
	 // Delete machinery details
	 $app->get('/deletemachinery/:id', 'App\EquipmentController:machineryDelete');
	
	 // Add or Update parameter details
	$app->post('/parameter','App\EquipmentController:parameter');

	 // Add or Update sensors details
	$app->post('/sensor', 'App\EquipmentController:sensor');
	
	// Delete sensors details
	$app->get('/deletesensor/:id', 'App\EquipmentController:sensorDelete');
	
	// List Sensor
	$app->get('/sensorlist', 'App\EquipmentController:listSensors');
	
	// List Manufacturer
	$app->get('/manufacturerlist', 'App\EquipmentController:listManufacturer');
	
	// List Model
	$app->get('/modellist/:id', 'App\EquipmentController:listModel');
	
	// List Machinery
	$app->get('/machinerylist', 'App\EquipmentController:listMachinery');
	
	// List Parameter
	$app->get('/parameterlist', 'App\EquipmentController:listParameter');
	
	// Delete Parameter details
	$app->get('/deleteparameter/:id', 'App\EquipmentController:parameterDelete');
	
	// List Material
	$app->get('/materiallist', 'App\EquipmentController:listMaterial');
	
	// Get Sensor code
	$app->get('/getsensercode', 'App\EquipmentController:getSensercode');
	
	// Get Parameter code
	$app->get('/getparametercode', 'App\EquipmentController:getParametercode');
	
	// Get Target value
	$app->get('/gettarget/:id', 'App\EquipmentController:getTargetValue');
	
	// Get Sensor library
	$app->get('/getsensorlibrary', 'App\EquipmentController:getSenserlibrary');
	
	// Get Parameter library
	$app->get('/getparameterlibrary', 'App\EquipmentController:getParameterlibrary');
	
	// Get Parameter library
	$app->get('/getmachinerylibrary', 'App\EquipmentController:getMachinerylibrary');
	
	// Get Sensor library
	$app->get('/getsensorlibrarybyid/:id', 'App\EquipmentController:getSenserlibrarybyId');
	
	// Get machinery library
	$app->get('/getmachinerylibrarybyid/:id', 'App\EquipmentController:getMachinerylibrarybyId');
	
	// Get parameter library
	$app->get('/getparameterbyid/:id', 'App\EquipmentController:getParameterlibrarybyId');
	
	//Check get locations
	$app->get('/getlocations', 'App\EquipmentController:getLocations');
    //Check parameter name exits or not
	$app->get('/checkparameternameexists/:name', 'App\EquipmentController:checkParameternameexits');
	//Check machinery name exits or not
    $app->get('/checkmachinerynameexits/:name','App\EquipmentController:checkMachinerynameexits');
    //Check sensor name exits or not
    $app->get('/checksensornameexits/:name','App\EquipmentController:checkSensornameexits');
	 //Check recipe name exits or not - created by :- 5838
    $app->get('/checkrecipenameexits/:name','App\RecipeController:checkRecipenameexits');
	
});

$app->run();
?>