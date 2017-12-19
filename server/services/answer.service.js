//const commonService = require('./common.service');

exports.create = function (res, db, question_id, uid, content){
	
	// Get a key for a new question.
	var newKey = question_id;
	
	// A new entry
	var dataEntry = {
		uid: uid,
		content: content
	};
	
	var updates = {};
	updates['/answers/' + newKey] = dataEntry;

	db.ref().update(updates);
	
	this.getById(res, db, newKey);
};

exports.getAll = function (res, db){
	db.ref('answers').once('value').then(function(snapshot) {
		var jsonData = snapshot.val();
		
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(jsonData));
	});
};

exports.getById = function (res, db, id){
	db.ref('answers/' + id).once('value').then(function(snapshot) {
		
		var jsonData = snapshot.val();
		
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(jsonData));
	});
}

exports.getByUserId = function (res, db, id, uid){
	db.ref('answers/' + id).orderByChild("uid").equalTo(uid).once('value').then(function(snapshot) {
		var jsonData = snapshot.val();

		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(jsonData));
	});
};

exports.getByQuestionId = function (db, question_id, uid){
	var arrResult = [];
	
	if (uid){
		db.ref('answers/' + question_id).orderByChild("uid").equalTo(uid).once('value').then(function(snapshot) {
			var jsonData = snapshot.val();
			
			for (var key in jsonData) {
				if (jsonData.hasOwnProperty(key)) {
					arrResult.push({id: key, content: jsonData[key].content, uid: jsonData[key].uid});
				}
			}
			return arrResult;
		});
	}else{
		db.ref('answers/' + question_id).once('value').then(function(snapshot) {
			var jsonData = snapshot.val();
			
			for (var key in jsonData) {
				if (jsonData.hasOwnProperty(key)) {
					arrResult.push({id: key, content: jsonData[key].content, uid: jsonData[key].uid});
				}
			}
			return arrResult;
		});
	}
};
