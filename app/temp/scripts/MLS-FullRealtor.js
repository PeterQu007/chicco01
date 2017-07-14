/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _LegalDescription = __webpack_require__(2);

	var _LegalDescription2 = _interopRequireDefault(_LegalDescription);

	var _AddressInfo = __webpack_require__(3);

	var _AddressInfo2 = _interopRequireDefault(_AddressInfo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var curTabID = null;
	var topPosition = 7;

	// get the currently selected Chrome tab
	var getCurrentTab = function getCurrentTab() {

		chrome.storage.sync.set({ 'curTabID': curTabID });

		chrome.runtime.sendMessage({ todo: 'readCurTabID', from: 'mls-fullrealtor' }, function (response) {

			console.log('current Tab ID is: ', response);
		});
	};

	var getToday = function getToday() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd;
		}

		if (mm < 10) {
			mm = '0' + mm;
		}

		today = yyyy + mm + dd;
		return today;
	};

	var fullrealtor = {

		init: function init() {

			getCurrentTab();

			this.calculateSFPrice();
			this.addMLSNo();
			this.addStrataPlan();
			this.addBCAssessment();
			this.addRemarks();
			this.addDataEvents();
			this.searchTax();
			this.addComplexInfo();

			this.addStrataEvents();
			this.searchStrataPlanSummary();
		},

		//elements on the page

		div: $('div.mls0'),
		lp: $('div[style="top:7px;left:571px;width:147px;height:13px;"]'),
		sp: $('div[style="top:23px;left:571px;width:147px;height:15px;"]'),
		finishedFloorArea: $('div[style="top:698px;left:120px;width:50px;height:16px;"]'),
		report: $('div#divHtmlReport'),
		pid: $('div[style="top:194px;left:355px;width:82px;height:15px;"]'),
		complex: $('div[style="top:236px;left:381px;width:383px;height:14px;"]'), //complex name
		mlsNo: $('div[style="top:18px;left:4px;width:123px;height:13px;"] a'),
		legal: $('div[style="top:426px;left:75px;width:593px;height:24px;"]'),
		realtorRemarks: $('div[style="top:860px;left:53px;width:710px;height:35px;"]'),
		publicRemarks: $('div[style="top:897px;left:4px;width:758px;height:75px;"]'),
		keyword: $('div#app_banner_links_left input.select2-search__field', top.document),

		//complex info:
		address: $('div[style="top:4px;left:134px;width:481px;height:17px;"]'),
		subArea: $('div[style="top:20px;left:134px;width:480px;height:13px;"]'),
		neighborhood: $('div[style="top:33px;left:134px;width:479px;height:13px;"]'),
		postcode: $('div[style="top:46px;left:306px;width:130px;height:13px;"]'),
		dwellingType: $('div[style="top:46px;left:4px;width:137px;height:15px;"]'),
		totalUnits: $('div[style="top:326px;left:659px;width:101px;height:16px;"'),
		devUnits: $('div[style="top:326px;left:470px;width:95px;height:15px;"'),

		averagePrice: $('<div style="top:7px;left:471px;width:147px;height:13px;" id="averagePrice" class="mls18"></div>'),
		legalDesc: null,
		strataPlan: null, //new strataPlan field, to be added
		strataPlanLink: null, //new strataPlan search link, to be added
		complexSummary: null, //new complex summary data, to be added
		bcAssess: null,
		bcLand: null,
		bcImprovement: null,
		valueChange: null,
		valueChangePercent: null,
		street: null,
		streetNumber: null,
		curTabID: null,

		calculateSFPrice: function calculateSFPrice() {

			console.log(this.lp.text(), this.sp.text(), this.finishedFloorArea.text());
			var listPrice = convertStringToDecimal(this.lp.text());
			var soldPrice = convertStringToDecimal(this.sp.text());
			var finishedFloorArea = convertStringToDecimal(this.finishedFloorArea.text());
			var sfPriceList = listPrice / finishedFloorArea;
			var sfPriceSold = soldPrice / finishedFloorArea;

			this.lp.text(this.lp.text() + ' [$' + sfPriceList.toFixed(0) + '/sf]');
			if (sfPriceSold > 0) {
				this.sp.text(this.sp.text() + ' [$' + sfPriceSold.toFixed(0) + '/sf]');
			}
		},

		addMLSNo: function addMLSNo() {
			var newDivMLS = $('<div style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;">MLS #</div>');
			newDivMLS.appendTo(this.report);
			var lineBreak = $('<br>');
			lineBreak.appendTo(this.report);
			topPosition += 13 + 1;

			var mlsNO = this.mlsNo.text();

			newDivMLS.text(mlsNO);
		},

		addStrataPlan: function addStrataPlan() {

			var legal = this.legal.text(); //get legal description from the Report
			var legalDesc = this.legalDesc = new _LegalDescription2.default(legal);
			var complexName = this.complex.text();
			var newDivStrPlan = $('<div id="strataPlan" style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;"></div>');
			topPosition += 13 + 1;
			var lineBreak = $('<br>');
			var strPlanLink = $('<a href="http://bcres.paragonrels.com/ParagonLS/Home/Page.mvc#HomeTab" target="HomeTab" id="strataPlanLink" ></a>');
			var complexSummary = $('<div id="complexSummary" style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;">re:</div>');
			if (complexName) {
				complexSummary.text(complexName + ": ");
			}
			topPosition += 26 + 1;
			this.strataPlan = legalDesc.strataPlan1;
			strPlanLink.text(legalDesc.strataPlan1);
			strPlanLink.appendTo(newDivStrPlan);
			newDivStrPlan.appendTo(this.report);
			lineBreak.appendTo(this.report);
			complexSummary.appendTo(this.report);
			lineBreak.appendTo(this.report);

			this.strataPlanLink = $('#strataPlanLink');
			this.complexSummary = $('#complexSummary');

			chrome.storage.sync.set({
				strataPlan1: legalDesc.strataPlan1,
				strataPlan2: legalDesc.strataPlan2,
				strataPlan3: legalDesc.strataPlan3,
				strataPlan4: legalDesc.strataPlan4
			});
		},

		addComplexInfo: function addComplexInfo() {
			var self = this;
			var subArea = self.subArea.text();
			var neighborhood = self.neighborhood.text();
			var postcode = self.postcode.text();
			var dwellingType = self.dwellingType.text();
			var complexName = self.complex.text().trim();
			var address = new _AddressInfo2.default(self.address.text()); //todo list...
			var strataPlan = self.strataPlan;
			var totalUnits = self.totalUnits.text();
			var devUnits = self.devUnits.text();

			var complexInfo = {

				_id: strataPlan + '-' + address.streetNumber + '-' + address.streetName + '-' + address.streetType,
				name: complexName,
				strataPlan: strataPlan,
				addDate: getToday(),
				subArea: subArea,
				neighborhood: neighborhood,
				postcode: postcode,
				streetNumber: address.streetNumber,
				streetName: address.streetName + address.streetType,
				dwellingType: dwellingType,
				totalUnits: totalUnits,
				devUnits: devUnits,
				todo: 'searchComplex'

			};
			if (complexName.length > 0) {
				complexInfo.todo = 'saveComplex';
				chrome.runtime.send;
			};
			chrome.runtime.sendMessage(complexInfo, function (response) {
				if (response) {
					self.complex.text(response);
					self.complexSummary.text(response);
				}
			});
		},

		addBCAssessment: function addBCAssessment() {

			//get bc assessment
			var newDivLandValue = $('<div id="landValue" style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;"></div>');
			topPosition += 13 + 1;
			var newDivImprovementValue = $('<div id="improvementValue" style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;"></div>');
			topPosition += 13 + 1;
			var newDivTotalValue = $('<div id="totalValue" style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;"></div>');
			topPosition += 13 + 1;
			var newDivValueChange = $('<div id="changeValue" style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;"></div>');
			topPosition += 13 + 1;
			var newDivValueChangePercent = $('<div id="changeValuePercent" style="position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:147px;height:13px;"></div>');
			topPosition += 13 + 1;

			newDivLandValue.appendTo(this.report);
			newDivImprovementValue.appendTo(this.report);
			newDivTotalValue.appendTo(this.report);
			newDivValueChange.appendTo(this.report);
			newDivValueChangePercent.appendTo(this.report);

			this.bcAssess = $("#totalValue");
			this.bcLand = $("#landValue");
			this.bcImprovement = $("#improvementValue");
			this.valueChange = $("#changeValue");
			this.valueChangePercent = $("#changeValuePercent");
		},

		addRemarks: function addRemarks() {

			//get realtor remarks

			var realtorRemarks = this.realtorRemarks.text();
			var newDivRealtorRemarks = $('<div style = "position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:160px;height:130px;"></div>');
			newDivRealtorRemarks.text(realtorRemarks);
			newDivRealtorRemarks.appendTo(this.report);
			topPosition += 130 + 1;
			//get public remarks

			var publicRemarks = this.publicRemarks.text();
			var newDivPublicRemarks = $('<div style = "position: absolute; top:' + topPosition.toString() + 'px;left:771px;width:160px;height:150px;"></div>');
			newDivPublicRemarks.text(publicRemarks);

			highlight_words(this.keyword.val(), newDivPublicRemarks);

			newDivPublicRemarks.appendTo(this.report);
			topPosition += 150 + 1;
		},

		searchTax: function searchTax() {

			var PID = this.pid.text();
			var self = this;

			if (!PID) {
				return;
			};

			chrome.storage.sync.set({ 'PID': PID });

			chrome.storage.sync.get('PID', function (result) {

				console.log(">>>PID saved for tax search: ", result.PID);

				chrome.runtime.sendMessage({ from: 'ListingReport', todo: 'taxSearch' }, function (response) {

					console.log('>>>mls-fullpublic got tax response:', response);
				});
			});
		},

		searchStrataPlanSummary: function searchStrataPlanSummary() {

			console.log('mls-fullrealtor.search strataPlanSummary listings: ');
			var strataPlan = this.legalDesc.strataPlan1;
			var complexName = this.complex.text();
			chrome.storage.sync.set({ 'strataPlan': strataPlan, 'complexName': complexName }, function (e) {
				console.log('mls-fullrealtor.searchComplex.callback parameters: ', e);
				chrome.runtime.sendMessage({ from: 'ListingReport', todo: 'searchStrataPlanSummary', showResult: true, saveResult: true }, function (response) {

					console.log('mls-fullrealtor got search strataPlanSummary response: ', response);
				});
			});
		},

		addStrataEvents: function addStrataEvents() {

			this.strataPlanLink.click(function (e) {

				e.preventDefault();
				var homeTab = $('#HomeTabLink', top.document);

				homeTab[0].click();
				console.log("strata plan Link Clicked!");

				var mlsDateLow = $("#f_33_Low__1-2-3-4");
				var mlsDateHigh = $("#f_33_High__1-2-3-4");

				var divTab = $('div' + curTabID, top.document);

				console.log(divTab);

				divTab.removeAttr("style");

				chrome.runtime.sendMessage({ from: 'ListingReport', todo: 'switchTab', showResult: false, saveResult: true }, function (response) {

					console.log('mls-fullrealtor got response: ', response);
				});
			});
		},

		addDataEvents: function addDataEvents() {

			(function onEvents(self) {

				chrome.storage.onChanged.addListener(function (changes, area) {

					console.log("====>fullrealtor: got a message: !", changes);

					if (area == "sync" && "from" in changes) {

						if (changes.from.newValue.indexOf('assess') > -1) {
							self.updateAssess();
						};

						if (changes.from.newValue.indexOf('strataPlanSummary') > -1) {
							self.updateStrataPlanSummary(changes);
						}

						if (changes.from.newValue.indexOf('complex') > -1) {
							self.updateComplexInfo();
						}
						console.log("this: ", self);
					}

					if (area == "sync" && "curTabID" in changes) {

						if (changes.curTabID.newValue) {

							if (changes.curTabID.oldValue) {
								//remove the old style of the div
								var oldTabID = changes.curTabID.oldValue;
								console.log("mls-fullrealtor: my old tab ID is: ", oldTabID);

								var oldDivTab = $('div' + oldTabID, top.document);

								oldDivTab.removeAttr("style");
							}

							curTabID = changes.curTabID.newValue;
							console.log("mls-fullrealtor: my tab ID is: ", curTabID);

							var divTab = $('div' + curTabID, top.document);
							var divTab1 = $('div#tab1', top.document);
							console.log(divTab);

							divTab.attr("style", "display: block!important");
							divTab1.attr("style", "display: none!important");
						}
					}
				});
			})(this);
		},

		updateAssess: function updateAssess() {

			var self = this;
			var listPrice = convertStringToDecimal(self.lp.text());
			var soldPrice = convertStringToDecimal(self.sp.text());

			chrome.storage.sync.get(['totalValue', 'improvementValue', 'landValue'], function (result) {
				var totalValue = result.totalValue;
				var improvementValue = result.improvementValue;
				var landValue = result.landValue;
				console.log("mls-fullpublic got total bc assessment: ", landValue, improvementValue, totalValue);

				if (totalValue != 0) {

					if (soldPrice > 0) {

						var intTotalValue = convertStringToDecimal(totalValue);
						var changeValue = soldPrice - intTotalValue;
						var changeValuePercent = changeValue / intTotalValue * 100;
					} else {
						var intTotalValue = convertStringToDecimal(totalValue);
						var changeValue = listPrice - intTotalValue;
						var changeValuePercent = changeValue / intTotalValue * 100;
					}
				}
				self.bcAssess.text(removeDecimalFraction(totalValue));
				self.bcLand.text(removeDecimalFraction(landValue));
				self.bcImprovement.text(removeDecimalFraction(improvementValue));
				self.valueChange.text("$" + numberWithCommas(changeValue.toFixed(0)) + " [ " + changeValuePercent.toFixed(0).toString() + '% ]   ');
			});
		},

		updateStrataPlanSummary: function updateStrataPlanSummary(changes) {
			var self = this;
			console.log("update strataPlanSummary:");
			chrome.storage.sync.get('count', function (result) {
				var complexName = self.complex.text().length > 0 ? self.complex.text() : 'Complex';
				var summary = self.complex.text() + ': [ ' + result.count + ' ]';
				self.complexSummary.text(summary);
			});
		},

		updateComplexInfo: function updateComplexInfo() {
			var self = this;
			console.log('update Complex info:');
			chrome.storage.sync.get('complexName', function (result) {
				self.complex.text(result.complexName);
				self.complexSummary.text(result.complexName);
			});
		}

		//star the app
	};$(function () {
		fullrealtor.init();
	});

	function getDecimalNumber(strNum) {

		var result = 0,
		    numbers = '';

		strNum = strNum.replace(/,/g, '');
		//remove the fraction
		strNum = strNum.substring(0, strNum.indexOf('.') == -1 ? strNum.length : strNum.indexOf('.'));

		for (var i = 0, len = strNum.length; i < len; ++i) {

			if (!isNaN(strNum[i])) {
				numbers += strNum[i];
			}
		}

		result = Number(numbers);
		return result.toFixed(0);
	};

	function convertStringToDecimal(strNum) {

		var result = 0,
		    numbers = '';

		strNum = strNum.replace(/,/g, '');
		//remove the fraction
		strNum = strNum.substring(0, strNum.indexOf('.') == -1 ? strNum.length : strNum.indexOf('.'));
		//remove the [] 
		strNum = strNum.substring(0, strNum.indexOf('[') == -1 ? strNum.length : strNum.indexOf('['));
		//remove the unit

		for (var i = 0, len = strNum.length; i < len; ++i) {

			if (!isNaN(strNum[i])) {
				numbers += strNum[i];
			}
		}

		result = Number(numbers);
		return result.toFixed(0);
	};

	function removeDecimalFraction(strNum) {

		var result = 0,


		//remove the fraction
		result = strNum.substring(0, strNum.indexOf('.') == -1 ? strNum.length : strNum.indexOf('.'));

		return result;
	};

	function convertUnit(sf) {

		sf = convertStringToDecimal(sf);
		var result = parseInt(sf) / 10.76;
		return result.toFixed(1);
	};

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	function highlight_words(keywords, element) {
		if (keywords) {
			var textNodes;
			keywords = keywords.replace(/\W/g, '');
			var str = keywords.split(" ");
			$(str).each(function () {
				var term = this;
				var textNodes = $(element).contents().filter(function () {
					return this.nodeType === 3;
				});
				textNodes.each(function () {
					var content = $(this).text();
					var regex = new RegExp(term, "gi");
					content = content.replace(regex, '<span class="highlight">' + term + '</span>');
					$(this).replaceWith(content);
				});
			});
		}
	};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// get strata plan number

	var strataPlanPrefix = ['EPS', 'BCS', 'LMS', 'BCP', 'LMP', 'NWS', 'EPP', 'PLAN', 'PL'];

	var LegalDescription = function () {
		function LegalDescription(legal) {
			_classCallCheck(this, LegalDescription);

			this.legal = legal.replace(/\./g, ' ');
			this.strataPlan1 = '';
			this.strataPlan2 = '';
			this.strataPlan3 = '';
			this.strataPlan4 = '';
			this.LotNumber = '';
			this.blockNumber = '';
			this.ldNumber = '';
			this.secNumber = '';
			this.rngNumber = '';

			this.getNumbers(this.legal);
		}

		_createClass(LegalDescription, [{
			key: 'getNumbers',
			value: function getNumbers(legal) {

				for (var j = 0; j < strataPlanPrefix.length; j++) {
					var start = legal.indexOf(strataPlanPrefix[j]);
					if (start >= 0) {

						var subPlan = legal.substring(start + strataPlanPrefix[j].length).trim();

						var plan = '';

						for (var i = 0; i < subPlan.length; i++) {

							if (!isNaN(subPlan[i])) {
								plan += subPlan[i];
							} else {
								break;
							}
						}
						this.strataPlan1 = strataPlanPrefix[j] + plan.trim();
						this.strataPlan2 = strataPlanPrefix[j] + plan.trim() + ' ';
						this.strataPlan3 = strataPlanPrefix[j] + ' ' + plan.trim();
						this.strataPlan4 = strataPlanPrefix[j] + ' ' + plan.trim() + ' ';
						return;
					}
				}

				this.strataPlan1 = 'strata plan not found';
			}
		}]);

		return LegalDescription;
	}();

	exports.default = LegalDescription;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Analyse the address information

	var AddressInfo = function () {
	    function AddressInfo(address) {
	        _classCallCheck(this, AddressInfo);

	        this.streetNumber = this.getStreetNumber(address);
	        this.streetName = this.getStreetName(address);
	        this.streetType = this.getStreetType(address);
	    }

	    _createClass(AddressInfo, [{
	        key: 'getStreetNumber',
	        value: function getStreetNumber(address) {
	            //split the address
	            var addressParts = address.split(' ');
	            return addressParts[1].trim();
	        }
	    }, {
	        key: 'getStreetName',
	        value: function getStreetName(address) {
	            var addressParts = address.split(' ');
	            return addressParts[2].trim();
	        }
	    }, {
	        key: 'getStreetType',
	        value: function getStreetType(address) {
	            var addressParts = address.split(' ');
	            var addressType = '';
	            for (var i = 3; i < addressParts.length; i++) {
	                addressType += addressParts[i].trim();
	            }
	            return addressType;
	        }
	    }]);

	    return AddressInfo;
	}();

	;

	exports.default = AddressInfo;

/***/ })
/******/ ]);