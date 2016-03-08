define(['angular', 'javascripts/app/controllers'], function (angular, controllers) {
	controllers.controller('materialSearchItemCtrl',function($scope,$http,modalService,$compile,$resource,$q,$filter,$timeout){
			$scope.items = [];
			$("#repairSet").hide();
			$scope.radioModel = 'Manual';
			$scope.animationsEnabled = true;
			$scope.allItemsSelected = false;
			$scope.noSelectedItems = false;
			$scope.itemList = [];
			$scope.filteredItems = [];
			$scope.itemSelected = "";
			$scope.turnaround = 0;
			$scope.tableLength = 20;
			$scope.tableLimit = 0;
			//$scope.isDeleteAllItems = false;
			var orderBy = $filter('orderBy');
    
			// not mandatory, you can use defaults in directive        
			$scope.overrideOptions = {
				"bStateSave": true,
				"iCookieDuration": 2419200, /* 1 month */
				"bJQueryUI": false,
				"bPaginate": false,
				"bLengthChange": false,
				"bFilter": false,
				"bInfo": false,
				"bDestroy": true,
				"sScrollY": "400px",
				"bScrollCollapse": true
			};
			// dataTable column definations       
			$scope.columnDefs = [
				{ "mDataProp": "id", "aTargets":[0], "sTitle": "<input type='checkbox'></input>", "bSortable": false,
					"fnRender": function (oObj) {
						var id = oObj.aData.itemselected;
						var str = "<input type='checkbox' id=" + "'chk_" + id + "'" + "</input>";
						return str;
					}
				},
				{ "mDataProp": "itemselected", "aTargets":[1],"sTitle": "Item Selected"},
				{ "mDataProp": "itemdelivered", "aTargets":[2],"sTitle": "Item Delivered"},
				{ "mDataProp": "description", "aTargets":[3],"sTitle": "Description"},
				{ "mDataProp": "requestedqty", "aTargets":[4],"sTitle": "Requested Qty"},
				{ "mDataProp": "pickedqty", "aTargets":[5],"sTitle": "Picked Qty"},
				{ "mDataProp": "status", "aTargets":[6],"sTitle": "Status"},
				{ "mDataProp": "requestedsource", "aTargets":[7],"sTitle": "Requested Source"},
				{ "mDataProp": "lastrequesteddate", "aTargets":[8],"sTitle": "Last Requested Date"}
			];
			//  Search items based on search string and return list to typeahead
			$scope.searchItems = function(searchString) {
				var encodedSearchString = encodeURIComponent(searchString);
				$scope.url ='/materialsSearch?search='+encodedSearchString;
				return $http.get($scope.url)
					.then(function(response){
						return response.data;
						
					});
			}
			//clear search  input on click of remove icon
			$scope.clearSearch = function(){
				$scope.itemSearched = "";
				$("#itemSearchInput").val('');
				$("#itemSearchInput").focus();
			};
			//format input text after item is selected from list
			$scope.formatInputLabel = function ($model) {
				if($model){
					return $model.itemNumber+ "("+$model.description+")";
				}
			}
			//Reset uib-typeahead-popup scroll to top
			$scope.$watch('itemSearched',function(){
				$timeout(function(){
					$("[uib-typeahead-popup]")[0].scrollTop = 0;
				}, 0);
			});
			$scope.$watch('typeaheadIsOpen',function(){
				$timeout(function(){
					$("[uib-typeahead-popup]")[0].scrollTop = 0;
				}, 0);
			});
			
			$scope.getShopCart = function() {
				var url = 'assets/javascripts/app/data.json' ;
				$http.get(url).success(function(data){
					$scope.items = data;
					//$scope.loadTableItems();
				});
			}	
			$scope.getShopCart();
					
			$scope.loadTableItems = function() {
				//var i = 0;
				//var tableLength = $scope.tableLength;
				//var turnaround = $scope.turnaround;
				// while($scope.itemList.length<$scope.items.length && i < tableLength ) {
					// $scope.itemList[i+(tableLength*turnaround)] = $scope.items[i+(tableLength*turnaround)];
					// i++;
				// }
				// if($scope.tableLimit < $scope.items.length) {
					// $scope.turnaround++;
					// $scope.tableLimit = $scope.tableLength*$scope.turnaround;
				// }
				// if($scope.tableLimit > $scope.items.length) {
					// $scope.tableLimit = $scope.items.length;
				// }
				 // $('#item-table').DataTable( {
					// "ajax": {
						// "dataSrc":$scope.items
					// },
					// "columns": [
						// { "data": "itemselected" },
						// { "data": "itemdelivered" },
						// { "data": "description" },
						// { "data": "requestedqty" },
						// { "data": "pickedqty" },
						// { "data": "status" },
						// { "data": "requestedsource" },
						// { "data": "lastrequesteddate" }
					// ]
				// });
			}
			

			$scope.order = function(predicate) {
				$scope.predicate = predicate;
				$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
				$scope.items = orderBy($scope.items, predicate, $scope.reverse);
			};
			$scope.order('lastrequesteddate', true);
			
			
			$scope.isCheckboxDisabled = function(item) {
				if(item != undefined){
					return	item.status == "Picked" ? true : false;
				}
			}
			
			function updateParentArray(parentArr,childArr) {
				parentArr.sort()
			}
	
					
			$scope.addItemToCart = function(){
				console.log($scope.itemSelected);
			}
			
			$scope.addItemQuantity = function($item, $model, $label){
				//$scope.isItemSearched = true;
			}			
			$scope.updateItemQty = function() {
				console.log($scope.itemList);
			}
			
			$scope.deleteItems = function(){
				$scope.allItemsSelected ? $scope.triggerDeleteItemModal(): $scope.removeShopCartItem();			
			}
			
			$scope.triggerDeleteItemModal = function() {
				var modalOptions = {
					closeButtonText: 'Cancel',
					headerText: 'Delete All Items',
					bodyText: 'Are you sure want to delete all items from shopcart?',
					actionButtonText: 'Ok'
				};

				modalService.showModal({}, modalOptions).then(function (result) {
					if(result){
						$scope.removeShopCartItem();
					}
				});
			}
			
			$scope.removeShopCartItem = function() {
				$scope.items = $scope.items.filter(function(item) {
					return item.selected !== true;
				});
			}
			// $scope.showItemInfo = function(item) {
				// var uibModalInstance = $uibModal.open({
					// animation: $scope.animationsEnabled,
					// templateUrl: 'showItemInfo.html',
					// resolve: {
						// parentScope: function() {
							// return $scope;
						// },
						// data: function () {
						  // return item;
						// }
					// },
					// controller: function($uibModalInstance,parentScope,data){
						// // $scope = parentScope;
						// // $scope.item = data;
						// $scope.close = function () {
								// $uibModalInstance.close();
							// };			
						// },
				// });
			// }

	});
});
