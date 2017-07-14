//Create, Read, Write, Query Database

class Database {

	constructor() {

		this.dbAssess = new PouchDB('http://localhost:5984/bcassessment');
		this.dbComplex = new PouchDB('http://localhost:5984/complex');
		this.dbStrataPlanSummary = new PouchDB('http://localhost:5984/strataplansummary');
		this.dbAssess.info().then(function (info) {
			console.log(info);
		});
		this.dbComplex.info().then(function (info) {
			console.log(info);
		});
		this.dbStrataPlanSummary.info().then(function (info) {
			console.log(info);
		});
		this.assess = null;
		this.complex = null;
		this.strataPlan = null;
	}

	readAssess(PID, callback) {

		console.log(">>>this in Database Assess is: ", this);
		var self = this;

		self.dbAssess.get(PID).then(function (doc) {

			self.assess = doc;
			console.log(">>>read the tax info in database is: ", self.assess);

			chrome.storage.sync.set({
				landValue: doc.landValue,
				improvementValue: doc.improvementValue,
				totalValue: doc.totalValue,
				_id: doc._id,
				from: 'assess' + Math.random().toFixed(8)
			});
			callback(self.assess);

		}).catch(function (err) {
			console.log(">>>read database error: ", err);

			self.assess = null;
			callback(self.assess);

		})


	}

	writeAssess(assess) {

		var PID = assess._id;
		var self = this;

		self.dbAssess.put(assess).then(function () {
			return self.dbAssess.get(PID);
		}).then(function (doc) {
			console.log(">>>bc assessment has been saved to db: ", doc);
		}).catch(function (err) {
			console.log(">>>save bc assessment error: ", err);
			self.dbAssess.get(PID).then(function (doc) {
				return self.dbAssess.remove(doc);
			}).catch(function (err) {
				console.log(">>>remove bc assess error: ", err);
			})
		});

	}

	readStrataPlanSummary(strataPlan, callback) {

		console.log(">>>this in Database is: ", this);
		var self = this;

		self.dbStrataPlanSummary.get(strataPlan).then(function (doc) {

			self.strataPlan = doc;
			console.log(">>>read the strataPlanSummary in database is: ", self.strataPlan);

			chrome.storage.sync.set({
				active: doc.active,
				sold: doc.sold,
				count: doc.count,
				searchDate: doc.searchDate,
				complex: doc.complex,
				strataPlan: doc._id,
				from: 'strataPlanSummary' + Math.random().toFixed(8)
			});
			callback(self.strataPlan);

		}).catch(function (err) {
			console.log(">>>read database strataPlanSummary error: ", err);

			self.strataPlan = null;
			callback(self.strataPlan);

		})


	}

	writeStrataPlanSummary(strataplan) {

		var strataPlan = strataplan._id;
		var self = this;

		self.dbStrataPlanSummary.put(strataplan).then(function () {
			return self.dbStrataPlanSummary.get(strataPlan);
		}).then(function (doc) {
			console.log(">>>StrataPlan Summary has been saved to dbComplex: ", doc);
		}).catch(function (err) {
			console.log(">>>save StrataPlan Summary error: ", err);
			self.dbStrataPlanSummary.get(strataPlan).then(function (doc) {
				return self.dbStrataPlanSummary.remove(doc);
			}).catch(function (err) {
				console.log(">>>remove StrataPlan Summary error: ", err);
			})
		});

	}

	readComplex(complexID, callback) {

		console.log(">>>this in Database is: ", this);
		var self = this;

		self.dbComplex.get(complexID).then(function (doc) {

			self.complex = doc;
			console.log(">>>read the Complex info in database is: ", self.complex);

			chrome.storage.sync.set({
				complexID: doc._id,
				complexName: doc.name+'*',
				strataPlan: doc.strataPlan,
				addDate: doc.addDate,
				subArea: doc.subArea,
				neighborhood: doc.neighborhood,
				postcode: doc.postcode,
				streetName: doc.streetName,
				streetNumber: doc.streetNumber,
				dwellingType: doc.dwellingType,
				totalUnits: doc.totalUnits,
				devUnits: doc.devUnits,
				from: 'complex' + Math.random().toFixed(8)
			});
			callback(self.complex);

		}).catch(function (err) {
			console.log(">>>read database Complex error: ", err);

			self.complex = null;
			callback(self.complex);

		})


	}

	writeComplex(complex) {

		var complexID = complex._id;
		var self = this;

		self.dbComplex.get(complexID).then(function (doc) {
			console.log('writeComplex...the complex has been already in the database');
		}).catch(function (err) {

			self.dbComplex.put(complex).then(function () {
				console.log('SAVED the complex info to database:', complex.name);
				return self.dbComplex.get(complexID);
			}).then(function (doc) {
				console.log(">>>Complex Info has been saved to dbComplex: ", doc);
			}).catch(function (err) {
				console.log(">>>save Complex info error: ", err);
			});
		})
	}
}

export default Database;