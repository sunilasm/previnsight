(function () {

     //window.environment = document.location.origin+"/UXEprojects/Projects/Clients/previnsight/previnsight1/previnsight/phase2/restPhp/api";
	window.environment = document.location.origin+"/admin/restPhp/api";
	//window.environment = "http://13.233.40.197/previnsight/admin/restPhp/api";

    var SERVICE_ROOT_URL = window.environment;
    var METRIC_API_URL = "http://198.199.116.245/api/0.1";

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

    angular.module('tracehive.services', [])
        .constant('SERVICE', {
            getAlertsData: SERVICE_ROOT_URL + '/PostAlerts2UI',
            loginData:SERVICE_ROOT_URL+'/users/login',
            modelList: SERVICE_ROOT_URL + '/equipment/modellist',
            manufacturerList: SERVICE_ROOT_URL + '/equipment/manufacturerlist',
            sensorNameList: SERVICE_ROOT_URL + '/equipment/sensorlist',
            addSensor: SERVICE_ROOT_URL + '/equipment/sensor',
            sensorLibrary: SERVICE_ROOT_URL + '/equipment/getsensorlibrary',
            sensorLibraryById: SERVICE_ROOT_URL + '/equipment/getsensorlibrarybyid',
            sensorCode: SERVICE_ROOT_URL + '/equipment/getsensercode',
            parameter: SERVICE_ROOT_URL + '/equipment/parameterlist',
            parameterLibrary: SERVICE_ROOT_URL + '/equipment/getparameterlibrary',
            parameterLibraryById: SERVICE_ROOT_URL + '/equipment/getparameterbyid',
            parameterCode: SERVICE_ROOT_URL + '/equipment/getparametercode',
            parameterTargetValue: SERVICE_ROOT_URL + '/equipment/gettarget',
            addParameter:SERVICE_ROOT_URL+'/equipment/parameter',
            machinery: SERVICE_ROOT_URL + '/equipment/machinerylist',
            machineryLibrary: SERVICE_ROOT_URL + '/equipment/getmachinerylibrary',
            machineryLibraryById: SERVICE_ROOT_URL + '/equipment/getmachinerylibrarybyid',
            addmachinery:SERVICE_ROOT_URL+'/equipment/machinery',
            editmachinery:SERVICE_ROOT_URL+'/equipment/getmachinerylibrarybyid',
            materialList:SERVICE_ROOT_URL+'/equipment/materiallist',
            addReceipe:SERVICE_ROOT_URL+'/recipe/addrecipe',
            getRecipelibrary:SERVICE_ROOT_URL+'/recipe/getrecipelibrary',
            getRecipelibrarybyId:SERVICE_ROOT_URL+'/recipe/getrecipelibrarybyid',
            getProductProfileById:SERVICE_ROOT_URL+'/recipe/getproductprofilebyid',
            WorkorderOperators:SERVICE_ROOT_URL+'/workorder/getworkorderoperators',
            addWorkorder:SERVICE_ROOT_URL+'/workorder/addworkorder',
            WorkorderLibrary: SERVICE_ROOT_URL + '/workorder/getworkorderlibrary',
            editWorkorderlibrarybyId:SERVICE_ROOT_URL+'/workorder/getworkorderlibrarybyid',
            editWorkorderProductReferencebyId:SERVICE_ROOT_URL+'/workorder/getworkorderproductreferencebyid',
            getLocations:SERVICE_ROOT_URL+'/location/getlocations',
            addInventory:SERVICE_ROOT_URL+'/inventory/addinventory',
            editinventory:SERVICE_ROOT_URL+'/inventory/getinventorylibrarybyid',
            getinventorylibrary:SERVICE_ROOT_URL+'/inventory/getinventorylibrary',
            getinventoryCode:SERVICE_ROOT_URL+'/inventory/getinventorycode',
            getCities:SERVICE_ROOT_URL+'/location/getallcities',
            setTopology:SERVICE_ROOT_URL+'/toplogy/settoplogy,',
            deleteSensorById:SERVICE_ROOT_URL+'/equipment/deletesensor',
            deleteMachineryById:SERVICE_ROOT_URL+'/equipment/deletemachinery',
            deleteParameterById:SERVICE_ROOT_URL+'/equipment/deleteparameter',
            deleteRecipeById:SERVICE_ROOT_URL+'/recipe/recipedelete',
            deleteWorkOrderById:SERVICE_ROOT_URL+'/workorder/workorderdelete',
            deleteInventoryById:SERVICE_ROOT_URL+'/inventory/inventorydelete',
            getsupplier:SERVICE_ROOT_URL+'/supplier/getallsupplier',
            addsupplier:SERVICE_ROOT_URL+'/supplier/addsupplier',
            getUsers:SERVICE_ROOT_URL+'/user/getallusers',
            addUser:SERVICE_ROOT_URL+'/user/adduser',
            userById:SERVICE_ROOT_URL+'/user/getuserbyid',
            addQualification:SERVICE_ROOT_URL+'/logs/addqualification',
            addLogActivity:SERVICE_ROOT_URL+'/logs/addlog',
            getLogLibrary:SERVICE_ROOT_URL+'/logs/logliberarymachid',
            getQualificationLibrary:SERVICE_ROOT_URL+'/logs/qualificationbymachid',
            getLogActivityMaterial:SERVICE_ROOT_URL+'/logs/logliberarymaterialsid',
            addmaterial:SERVICE_ROOT_URL+'/master/addmaterial',
            addmanufacturer:SERVICE_ROOT_URL+'/master/addmanufacturer',
            addmodel:SERVICE_ROOT_URL+'/master/addmodel',
            addlocation:SERVICE_ROOT_URL+'/master/addlocation',
            adduom:SERVICE_ROOT_URL+'/master/adduom',
            editmaterial:SERVICE_ROOT_URL+'/master/editmaterial',
            editmanufacturer:SERVICE_ROOT_URL+'/master/editmanufacturer',
            editmodel:SERVICE_ROOT_URL+'/master/editmodel',
            editlocation:SERVICE_ROOT_URL+'/master/editlocation',
            edituom:SERVICE_ROOT_URL+'/master/edituom',
            getmaterial:SERVICE_ROOT_URL+'/master/getmaterial',
            getmanufacturer:SERVICE_ROOT_URL+'/master/getmanufacturer',
            getmodel:SERVICE_ROOT_URL+'/master/getmodel',
            getlocation:SERVICE_ROOT_URL+'/master/getlocation',
            getuom:SERVICE_ROOT_URL+'/master/getuom',
            uomdelete:SERVICE_ROOT_URL+'/master/uomdelete',
            materialdelete:SERVICE_ROOT_URL+'/master/materialdelete',
            manufacturerdelete:SERVICE_ROOT_URL+'/master/manufacturerdelete',
            modeldelete:SERVICE_ROOT_URL+'/master/modeldelete',
            locationdelete:SERVICE_ROOT_URL+'/master/locationdelete',
            getbadgeinfo:SERVICE_ROOT_URL+'/badge/badgelibrary',
            addbadge:SERVICE_ROOT_URL+'/badge/addbadge',
            getbadgegraphdata:SERVICE_ROOT_URL+'/badge/reportsbadgein',
            createSampleWorkorder:SERVICE_ROOT_URL+'/workorder/createsample',
            createSampleInventory:SERVICE_ROOT_URL+'/inventory/createsample',
            getworkordersamplesbyid:SERVICE_ROOT_URL+'/workorder/getworkordersamplesbyid',
            getworkorderparametersamplesbyid:SERVICE_ROOT_URL+'/workorder/getworkorderparametersamplesbyid',
            getsampledatabyid:SERVICE_ROOT_URL+'/workorder/getsampledatabyid',
            getinventorysamplesbyid:SERVICE_ROOT_URL+'/inventory/getinventorysamplesbyid',
            getinventoryparametersamplesbyid:SERVICE_ROOT_URL+'/inventory/getinventoryparametersamplesbyid',
            getinventorysampledatabyid:SERVICE_ROOT_URL+'/inventory/getinventorysampledatabyid',
            deleteinvsamplesbyid:SERVICE_ROOT_URL+'/inventory/invsampledeletebyid',
            deletewosamplesbyid:SERVICE_ROOT_URL+'/workorder/wosampledeletebyid',
            fData:SERVICE_ROOT_URL+'/user/forgetpassword',
			addProfile:SERVICE_ROOT_URL+'/user/adduserprofile',
			getprofile:SERVICE_ROOT_URL+'/user/getuserprofile',
			editProfile:SERVICE_ROOT_URL+'/user/edituserprofile',
			editUserprofileId:SERVICE_ROOT_URL+'/user/getuserprofilebyid',
			removeUserprofile:SERVICE_ROOT_URL+'/user/deleteuserprofile',
            getAlertsCountData:SERVICE_ROOT_URL + '/totalCountofAlerts',
			getInvCategoryCountData:SERVICE_ROOT_URL +'/inventory/getinvlistandcount',
            getAllLocationData:SERVICE_ROOT_URL +'/location/getalllocationdropdown',
			
        })
    
     .service('LoginService',  function ($rootScope, $state) {
            var _user ={};
            this.setLogin = function (userObj) {
                //console.log(JSON.stringify(userObj));
                _user = userObj;
            };
            this.isLoggedIn = function () {
                //console.log(JSON.stringify(_user));
                return _user.USERNAME ? true : false;
            };
            this.getUser = function () {
                return _user;
            };
            
        })
       
    .service('PagerService',  function () {
        var service = {};
        service.GetPager = GetPager;
        return service;

        function GetPager(totalItems, currentPage, pageSize) {
            currentPage = currentPage || 1;
            pageSize = pageSize || 10;
            var totalPages = Math.ceil(totalItems / pageSize);
            var startPage, endPage;
            if (totalPages <= 10) {
                startPage = 1;
                endPage = totalPages;
            } else {
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            var pages = _.range(startPage, endPage + 1);

            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    })

    .factory('getService', function ($http, SERVICE) {
        return {
            getAlerts: function () {
                return $http.get(SERVICE.getAlertsData).then(function (result) {
                    return result.data;
                });
            },
            getBadgeInfo: function () {
                return $http.get(SERVICE.getbadgeinfo).then(function (result) {
                    return result.data;
                });
            },
            addBadge: function (dataSet) {
                return $http.post(SERVICE.addbadge, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            
            login: function (dataSet) {
                return $http.post(SERVICE.loginData, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getSensorList: function () {
                return $http.get(SERVICE.sensorLibrary).then(function (result) {
                    return result.data;
                });
            },
            getSensorNameList:function(){
               return $http.get(SERVICE.sensorNameList).then(function (result) {
                    return result.data;
                }); 
            },
            getModelList: function (manufactur_id) {
                return $http.get(SERVICE.modelList + '/' + manufactur_id).then(function (result) {
                    return result.data;
                });
            },
            getManufacturerList: function () {
                return $http.get(SERVICE.manufacturerList).then(function (result) {
                    return result.data;
                });
            },
            getMachineryList: function () {
                return $http.get(SERVICE.machinery).then(function (result) {
                    return result.data;
                });
            },
            getParameterList: function () {
                return $http.get(SERVICE.parameter).then(function (result) {
                    return result.data;
                });
            },
            getParameterTargetValue: function (parameter_id) {
                return $http.get(SERVICE.parameterTargetValue + '/' + parameter_id).then(function (result) {
                    return result.data;
                });
            },
            getSenserCode: function () {
                return $http.get(SERVICE.sensorCode).then(function (result) {
                    return result.data;
                });
            },
            addSenser: function (dataSet) {
                return $http.post(SERVICE.addSensor, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editSenser: function (sensorId) {
                return $http.get(SERVICE.sensorLibraryById + '/' + sensorId).then(function (result) {
                    return result.data;
                });
            },
            getParameterLibrary: function (){
                 return $http.get(SERVICE.parameterLibrary).then(function (result) {
                    return result.data;
                });
            },
            getMachinaryLibrary:function(){
                return $http.get(SERVICE.machineryLibrary).then(function (result) {
                    return result.data;
                });
            },
            getParameterCode:function(){
                return $http.get(SERVICE.parameterCode).then(function(result){
                    return result.data                                         
                });
            },
            addParameter:function(dataSet)
            {
               return $http.post(SERVICE.addParameter, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editParameter:function(parameterID)
            {
                return $http.get(SERVICE.parameterLibraryById + '/' + parameterID).then(function (result) {
                    return result.data;
                });
            },
            addMachinery: function (dataSet) {
                return $http.post(SERVICE.addmachinery, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editMachinery: function (machineryID) {
                return $http.get(SERVICE.editmachinery + '/' + machineryID).then(function (result) {
                    return result.data;
                });
            },
            getMaterialList: function(){
               return $http.get(SERVICE.materialList).then(function (result) {
                    return result.data;
                }); 
            },
            addReceipe: function (dataSet) {
                return $http.post(SERVICE.addReceipe, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editReceipe: function (receipeId) {
                return $http.get(SERVICE.getRecipelibrarybyId + '/' + receipeId).then(function (result) {
                    return result.data;
                });
            },
            editProductProfileById:function(receipeId)
            {
                return $http.get(SERVICE.getProductProfileById + '/' + receipeId).then(function (result){
                    return result.data;
                });
            },
            getAllReceipes: function () {
                return $http.get(SERVICE.getRecipelibrary).then(function (result) {
                    return result.data;
                });
            },
            
            getWorkorderOperators: function(){
               return $http.get(SERVICE.WorkorderOperators).then(function (result) {
                    return result.data;
                }); 
            },
            addWorkorder: function (dataSet) {
                return $http.post(SERVICE.addWorkorder, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getAllWorkorder: function () {
                return $http.get(SERVICE.WorkorderLibrary).then(function (result) {
                    return result.data;
                });
            },
            editWorkorder: function (workorderID) {
                return $http.get(SERVICE.editWorkorderlibrarybyId + '/' + workorderID).then(function (result) {
                    return result.data;
                });
            },
            editWorkorderReferenceByID: function (workorderID) {
                return $http.get(SERVICE.editWorkorderProductReferencebyId + '/' + workorderID).then(function (result) {
                    return result.data;
                });
            },
            
            getAllLocations: function (){

               return $http.get(SERVICE.getLocations).then(function (result) {
                    return result.data;
                }); 
            },
            getAllCities:function(){
                return $http.get(SERVICE.getCities).then(function (result) {
                    return result.data;
                }); 
            },
            addInventory: function (dataSet){
              return $http.post(SERVICE.addInventory, dataSet, config).then(function (result) {
                    return result.data;
                });
            },

            editInventory: function (inventoryID) {
                return $http.get(SERVICE.editinventory + '/' + inventoryID).then(function (result) {
                    return result.data;
                });
            },
            getAllinventory: function () {
                return $http.get(SERVICE.getinventorylibrary).then(function (result) {
                    return result.data;
                });
            },
            getinventoryCode: function () {
                return $http.get(SERVICE.getinventoryCode).then(function (result) {
                    return result.data;
                });
            },
            setTopologyData: function(dataSet){
              return $http.post(SERVICE.setTopology, dataSet, config).then(function (result) {
                    return result.data;
                });  
            },
            deleteSensor: function (sensorId) {
                return $http.get(SERVICE.deleteSensorById + '/' + sensorId).then(function (result) {
                    return result.data;
                });
            },
            deleteMachinery: function (machineryId) {
                return $http.get(SERVICE.deleteMachineryById + '/' + machineryId).then(function (result) {
                    return result.data;
                });
            },
            deleteParameter: function (paramId) {
                return $http.get(SERVICE.deleteParameterById + '/' + paramId).then(function (result) {
                    return result.data;
                });
            },
            deleteInventory: function (InvId) {
                return $http.get(SERVICE.deleteInventoryById + '/' + InvId).then(function (result) {
                    return result.data;
                });
            },
            deleteWorkOrder: function (WorkorderId) {
                return $http.get(SERVICE.deleteWorkOrderById + '/' + WorkorderId).then(function (result) {
                    return result.data;
                });
            },
            deleteRecipe: function (recipeId) {
                return $http.get(SERVICE.deleteRecipeById + '/' + recipeId).then(function (result) {
                    return result.data;
                });
            },
            
            getAllSupplier: function () {
                return $http.get(SERVICE.getsupplier).then(function (result) {
                    return result.data;
                });
            },
            addSupplier: function (dataSet) {
                return $http.post(SERVICE.addsupplier, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getAllUser: function () {
                return $http.get(SERVICE.getUsers).then(function (result) {
                    return result.data;
                });
            },
            addUser: function (dataSet) {
                return $http.post(SERVICE.addUser, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getUserById:function(userId){
                return $http.get(SERVICE.userById + '/' + userId).then(function (result) {
                    return result.data;
                });
            },
            addMachineryQualification: function (dataSet) {
                return $http.post(SERVICE.addQualification, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            
            addMachineryLogActivity: function (dataSet) {
                return $http.post(SERVICE.addLogActivity, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            
            getLogActivityLibrary: function (machinery_id) {
                return $http.get(SERVICE.getLogLibrary + '/' + machinery_id).then(function (result) {
                    return result.data;
                });
            },
            
            getQualificationDetailsLibrary: function (machinery_id) {
                return $http.get(SERVICE.getQualificationLibrary + '/' + machinery_id).then(function (result) {
                    return result.data;
                });
            },
            
            getLogActivityMaterialById: function (activity_id) {
                return $http.get(SERVICE.getLogActivityMaterial + '/' + activity_id).then(function (result) {
                    return result.data;
                });
            },
            
            addMaterial: function (dataSet) {
                return $http.post(SERVICE.addmaterial, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editMaterial: function (materialID, dataSet) {
                return $http.post(SERVICE.editmaterial + '/' + materialID, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getMaterial: function (){
                 return $http.get(SERVICE.getmaterial).then(function (result) {
                    return result.data;
                });
            },
            deleteMaterial: function (materialId) {
                return $http.get(SERVICE.materialdelete + '/' + materialId).then(function (result) {
                    return result.data;
                });
            },
            
            addUom: function (dataSet) {
                return $http.post(SERVICE.adduom, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editUom: function (uomID, dataSet) {
                return $http.post(SERVICE.edituom + '/' + uomID, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getUom: function (){
                 return $http.get(SERVICE.getuom).then(function (result) {
                    return result.data;
                });
            },
            deleteUom: function (UomID) {
                return $http.get(SERVICE.uomdelete + '/' + UomID).then(function (result) {
                    return result.data;
                });
            },
            
            addManufacturer: function (dataSet) {
                return $http.post(SERVICE.addmanufacturer, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editManufacturer: function (manufacturerID, dataSet) {
                return $http.post(SERVICE.editmanufacturer + '/' + manufacturerID, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getManufacturer: function (){
                 return $http.get(SERVICE.getmanufacturer).then(function (result) {
                    return result.data;
                });
            },
            deleteManufacturer: function (manufacturerID) {
                return $http.get(SERVICE.manufacturerdelete + '/' + manufacturerID).then(function (result) {
                    return result.data;
                });
            },
            
            addModel: function (dataSet) {
                return $http.post(SERVICE.addmodel, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editModel: function (modelID, dataSet) {
                return $http.post(SERVICE.editmodel + '/' + modelID, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getModel: function (){
                 return $http.get(SERVICE.getmodel).then(function (result) {
                    return result.data;
                });
            },
            
            deleteModel: function (modelID) {
                return $http.get(SERVICE.modeldelete + '/' + modelID).then(function (result) {
                    return result.data;
                });
            },
            
            
            addLocation: function (dataSet) {
                return $http.post(SERVICE.addlocation, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            editLocation: function (locationID, dataSet) {
                return $http.post(SERVICE.editlocation + '/' + locationID, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            getLocation: function (){
                 return $http.get(SERVICE.getlocation).then(function (result) {
                    return result.data;
                });
            },
            
            deleteLocation: function (locationID) {
                return $http.get(SERVICE.locationdelete + '/' + locationID).then(function (result) {
                    return result.data;
                });
            },
            
            getBadgeGraphData: function (userId){
                 return $http.get(SERVICE.getbadgegraphdata+'/'+userId).then(function (result) {
                    return result.data;
                });
            },
            
            
            CreateSampleWorkorder:function(dataSet){
                return $http.post(SERVICE.createSampleWorkorder, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            
            CreateSampleInventory:function(dataSet){
                return $http.post(SERVICE.createSampleInventory, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
            
            
            getWorkorderSamplesById: function (workorderId){
                 return $http.get(SERVICE.getworkordersamplesbyid+'/'+workorderId).then(function (result) {
                    return result.data;
                });
            },
            
            getWorkorderParameterSamplesById: function(sampleId){
                return $http.get(SERVICE.getworkorderparametersamplesbyid+'/'+sampleId).then(function (result) {
                    return result.data;
                });
                
            },
            
            getSampleDataById: function(sampleId){
                return $http.get(SERVICE.getsampledatabyid+'/'+sampleId).then(function (result) {
                    return result.data;
                });
                
            },
            
            
            getInventorySamplesById: function (inventoryId){
                 return $http.get(SERVICE.getinventorysamplesbyid+'/'+inventoryId).then(function (result) {
                    return result.data;
                });
            },
            
            getInventoryParameterSamplesById: function(sampleId){
                return $http.get(SERVICE.getinventoryparametersamplesbyid+'/'+sampleId).then(function (result) {
                    return result.data;
                });
                
            },
            
             getInventorySampleDataById: function(sampleId){
                return $http.get(SERVICE.getinventorysampledatabyid+'/'+sampleId).then(function (result) {
                    return result.data;
                });
                
            },
            
            deleteInvSampleById: function (sampleId) {
                return $http.get(SERVICE.deleteinvsamplesbyid + '/' + sampleId).then(function (result) {
                    return result.data;
                });
            },
            
            deleteWoSampleById: function (sampleId) {
                return $http.get(SERVICE.deletewosamplesbyid + '/' + sampleId).then(function (result) {
                    return result.data;
                });
            },
            
           
            
                        
            getSeries1: function (entityName, start, end) {

                return $http.get(METRIC_API_URL+'/series?name=' +entityName+ '&start=' + start+'&end='+end).then(function (result) {
                    return result.data;
                });
            },
            getSeries2: function (entityName, start, end) {

                return $http.get(METRIC_API_URL+'/series?name=' +entityName+ '&start=' + start+'&end='+end).then(function (result) {
                    return result.data;
                });
            },
            getQuery: function () {

                return $http.get(METRIC_API_URL+'/query').then(function (result) {
                    return result.data;
                });
            },
            
            /****************
				@Created By:- 5838
				@Created date :- 12-12-2016
				@get password when click forgot passwod from this function 
				***/
            forgotpassword: function (dataSet) {
                return $http.post(SERVICE.fData, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
			/******* end *******/
			
			/****************************
				@Created By:- 5838
				@Created date :- 14-12-2016
				@ add user profile in table
				************************/
			 addProfileRecord: function (dataSet) {
                return $http.post(SERVICE.addProfile, dataSet, config).then(function (result) {
                    return result.data;
                });
            },
			/****************************
				@Created By:- 5838
				@Created date :- 14-12-2016
				@ get user profile from  table
				************************/
			getProfileData: function (){
                 return $http.get(SERVICE.getprofile).then(function (result) {
                    return result.data;
                });
            },
			/****************************
				@Created By:- 5838
				@Created date :- 14-12-2016
				@ update user profile roles inside table
				************************/
			editProfileData: function (userProfileId, dataSet) {
                return $http.post(SERVICE.editProfile + '/' + userProfileId, dataSet, config).then(function (result) {
				return result.data;
                });
            },
			/****************************
				@Created By:- 5838
				@Created date :- 15-12-2016
				@ get user profile record from user_profile_id
				************************/
			getUserProfileById: function (userProfileID) {

                return $http.get(SERVICE.editUserprofileId + '/' + userProfileID).then(function (result) {

                return result.data;

                });

            },
            
			removeUserProfile: function (userProfileID) {

                return $http.get(SERVICE.removeUserprofile + '/' + userProfileID).then(function (result) {

                return result.data;

                });

            },
            
            getAlertsCount: function (metricTypeValue,menuvalue) {
                return $http.get(SERVICE.getAlertsCountData + '/' + metricTypeValue +'/'+ menuvalue).then(function (result) {
                    return result.data;
                });
            },
         /*******************************************************
			@Created by: 5838
			@Message :- getting category count from inventory table 
			*******************************************************/
            getInventoryCategoryCount: function () {
                return $http.get(SERVICE.getInvCategoryCountData).then(function (result) {
                    return result.data;
                });
            },
			
			/*******************************************************
			@Created by: 5838
			@Message :- getting category count from inventory table 
			*******************************************************/
            getAllLocationList: function () {
                return $http.get(SERVICE.getAllLocationData).then(function (result) {
                    return result.data;
                });
            },
			
			
            
        }
    })

    .factory("poollingFactory", function ($timeout) {

        var timeIntervalInSec = 1;

        function callFnOnInterval(fn, timeInterval) {

            var promise = $timeout(fn, 1000 * timeIntervalInSec);

            return promise.then(function () {
                callFnOnInterval(fn, timeInterval);
            });
        };

        return {
            callFnOnInterval: callFnOnInterval
        };
    })

    .filter("reverse", function () {
        return function (items) {
             if (!items) {
                   return;
               }
            return items.slice().reverse();
        };
    })
    
    .filter("dateOnly", function () {
        return function (date) {
            return date.substring(0,4)+'-'+date.substring(5,7)+'-'+date.substring(8,10); 
        };
    })

    
    .filter("timeOnly", function () {
        return function (date) {
            return date.substring(11,13)+':'+date.substring(14,16);
        };
    })
    
    .filter('dateRange', function() {
    return function(records, from, to) {
        return records.filter(function(record) {
            if(from && to)
                return record.PUNCH_DATE >= from && record.PUNCH_DATE <= to;
            else
                return record.PUNCH_DATE;
        });
    }
})
    .filter("ZoneConversion", function () {
        return function (item) {
            var unixTimeStamp = moment(item).unix()*1000;
            var convertedDate = moment(unixTimeStamp).format('MMMM Do YYYY, h:mm:ss a')
            return convertedDate;
        };
    })
    
    .filter("criticalAlerts", function(){
        return function(items){
            if (!angular.isUndefined(items)){
                var tempAlerts=[];
                    angular.forEach(items, function(obj){
                            if(angular.lowercase(obj.entityname) == 'dht1_humidity')
                                {
                                    var minValue = 50
                                    var maxValue = 63
                                    if(obj.metricvalue < (minValue-(minValue*0.10)) || obj.metricvalue > (maxValue+(maxValue*0.10)))
                                        tempAlerts.push(obj)
                                }
                                if(angular.lowercase(obj.entityname) == 'dht1_temperature')
                                {
                                    var minValue = 24.5
                                    var maxValue = 26.0
                                    if(obj.metricvalue < (minValue-(minValue*0.10)) || obj.metricvalue > (maxValue+(maxValue*0.10)))
                                        tempAlerts.push(obj)
                                }
                                
                    })
                    return tempAlerts.slice().reverse();
            }
            else{
                 if (!items) {
                   return;
               }
                return items.slice().reverse();
            }
          
        };
    })
    
    
    .filter("severeAlerts", function(){
        return function(items){
            if (!angular.isUndefined(items)){
                var tempAlerts=[];
                    angular.forEach(items, function(obj){
                            if(angular.lowercase(obj.entityname) == 'dht1_humidity')
                                {
                                    var minValue = 50
                                    var maxValue = 63
                                    if (obj.metricvalue >= (minValue - minValue*(0.1/100)) && obj.metricvalue <= (minValue + minValue*(0.1/100)) || obj.metricvalue >= (maxValue - maxValue*(0.1/100)) && obj.metricvalue <= (maxValue + maxValue*(0.1/100)))
                                        tempAlerts.push(obj)
                                }
                                if(angular.lowercase(obj.entityname) == 'dht1_temperature')
                                {
                                    var minValue = 24.5
                                    var maxValue = 26.0
                                    if (obj.metricvalue >= (minValue - minValue*(0.1/100)) && obj.metricvalue <= (minValue + minValue*(0.1/100)) || obj.metricvalue >= (maxValue - maxValue*(0.1/100)) && obj.metricvalue <= (maxValue + maxValue*(0.1/100)))
                                        tempAlerts.push(obj)
                                }
                                
                    })
                    return tempAlerts.slice().reverse();
            }
            else{
                 if (!items) {
                   return;
               }
                return items.slice().reverse();
            }
          
        };
    })
    
    
    .filter("warningAlerts", function(){
        return function(items){
            if (!angular.isUndefined(items)){
                var tempAlerts=[];
                    angular.forEach(items, function(obj){
                            if(angular.lowercase(obj.entityname) == 'dht1_humidity')
                                {
                                    var minValue = 50
                                    var maxValue = 63
                                    if ((obj.metricvalue >= (minValue*(90/100)) && obj.metricvalue < minValue) || (obj.metricvalue >= (maxValue*(90/100)) && obj.metricvalue < maxValue) )
                                        tempAlerts.push(obj)
                                }
                                if(angular.lowercase(obj.entityname) == 'dht1_temperature')
                                {
                                    var minValue = 24.5
                                    var maxValue = 26.0
                                    if ((obj.metricvalue >= (minValue*(90/100)) && obj.metricvalue < minValue) || (obj.metricvalue >= (maxValue*(90/100)) && obj.metricvalue < maxValue) )
                                        tempAlerts.push(obj)
                                }
                                
                    })
                    return tempAlerts.slice().reverse();
            }
            else{
                 if (!items) {
                   return;
               }
                return items.slice().reverse();
            }
          
        };
    })
    
     .directive('myTarget', function () {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                  var href = element.href;
                  if(true) {  // replace with your condition
                    element.attr("target", "_blank");
                  }
                }
            };
        })
    
    
        .directive('myTarget', function () {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                  var href = element.href;
                  if(true) {  // replace with your condition
                    element.attr("target", "_blank");
                  }
                }
            };
        })
    
        .directive('fileDropzone', function () {
    return {
        restrict: 'A',
        scope: {
            file: '=',
            fileName: '='
        },
        link: function (scope, element, attrs) {
            var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
            processDragOverOrEnter = function (event) {
                if (event != null) {
                    event.preventDefault();
                }
                event.dataTransfer.effectAllowed = 'copy';
                return false;
            };
            validMimeTypes = attrs.fileDropzone;
            checkSize = function (size) {
                var _ref;
                if ((_ref = attrs.maxFileSize) === void 0 || _ref === '' || size / 4000 / 4000 < attrs.maxFileSize) {
                    return true;
                } else {
                    alert('File must be smaller than ' + attrs.maxFileSize + ' MB');
                    return false;
                }
            };
            isTypeValid = function (type) {
                if (validMimeTypes === void 0 || validMimeTypes === '' || validMimeTypes.indexOf(type) > -1) {
                    return true;
                } else {
                    alert('Invalid file type.  File must be one of following types ' + validMimeTypes);
                    return false;
                }
            };
            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragenter', processDragOverOrEnter);
            return element.bind('drop', function (event) {
                var file, name, reader, size, type;
                if (event != null) {
                    event.preventDefault();
                }
                reader = new FileReader();
                reader.onload = function (evt) {
                    if (checkSize(size) && isTypeValid(type)) {
                        return scope.$apply(function () {
                            scope.file = evt.target.result;
                            if (angular.isString(scope.fileName)) {
                                return scope.fileName = name;
                            }
                        });
                    }
                };
                file = event.dataTransfer.files[0];
                name = file.name;
                type = file.type;
                size = file.size;
                reader.readAsDataURL(file);
                return false;
            });
        }
    };
}).directive('fileread', [function () {
        return {
            scope: { fileread: '=' },
            link: function (scope, element, attributes) {
                element.bind('change', function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                            
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }])
    
    .directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })
    
    .directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
})
    
    .directive("directiveWhenScrolled", function() {
  return function(scope, elm, attr) {
    var raw = elm[0];

    elm.bind('scroll', function() {
      if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
        scope.$apply(attr.directiveWhenScrolled);
      }
    });
  };
})
    
    .directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }])
    
    
     //unique field   --creating directive
    //angular.module('uniqueField', [])
    .directive('uniqueField', function($http, SERVICE) {
      var toId;
      return {
        restrict: 'A',
        require: 'ngModel',
          
        link: function(scope, elem, attr, ctrl) { 
          //when the scope changes, check the field.
            
          scope.$watch(attr.ngModel, function(value) {
            // if there was a previous attempt, stop it.
            if(toId) clearTimeout(toId);

            // start a new attempt with a delay to keep it from
            toId = setTimeout(function(){
              // call to some API that echo "1" or echo "0"
                //console.log(attr.servicename)
				
				  /********************************************
					@Created By :- 5838
					@Message :- sending in base64 encode format
					***************************************/
			   
			   var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }
}
				
			  var editId = $.urlParam('id');
				console.log(editId);			  
              $http.get(SERVICE_ROOT_URL+'/'+attr.servicename+'/'+Base64.encode(value)).success(function(data) {
				//alert(data);
                //set the validity of the field
				ctrl.$setValidity('uniqueField', true);
				if(editId){
						ctrl.$setValidity('uniqueField', true);
				}
				else{
					if (data>= 1){
						ctrl.$setValidity('uniqueField', false);
					}
					else if (data == "0"){
						ctrl.$setValidity('uniqueField', true);
					}
				}
              });
            }, 200);
          })
        }
      }
    })
    
   
    .directive('myModal', function() {
   return {
     restrict: 'A',
     link: function(scope, element, attr) {
       scope.dismiss = function() {
           element.modal('hide');
       };
     }
   } 
})
    
   .directive('myIframe', function(){
    var linkFn = function(scope, element, attrs) {
        element.find('iframe').bind('load', function (event) {
          event.target.contentWindow.scrollTo(0,400);
        });
    };
    return {
      restrict: 'EA',
      scope: {
        src:'&src',
        height: '@height',
        width: '@width',
        scrolling: '@scrolling'
      },
      template: '<iframe class="frame" height="{{height}}" width="{{width}}" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" src="{{src()}}"></iframe>',
      link : linkFn
    };
  }).directive('dragable', function(){   
  return {
    restrict: 'A',
    link : function(scope,elem,attr){
      $(elem).draggable();
    }
  }  
});
    
    
    
    
    
})();
