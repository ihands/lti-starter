var async = require("async");
var Promise = require('promise');
//const commonService = require('./common.service');

exports.addGroupMember = function (db, group_id, uid, callback){
	// A Group Member entry.
	var groupMemberData = {
		group_id: group_id,
		uid: uid,
		status: 'active'
	};
	
	// Get a key for a new group member.
	//var newKey = admin.database().ref().child('group_members').push().key;
	var newKey = group_id;
	
	var updates = {};
	updates['/group_members/' + newKey] = groupMemberData;

	db.ref().update(updates);
};


exports.getGroupMembers = function (db, group_id, callback){
	db.ref('group_members/' + group_id).once('value').then(function(snapshot) {
		console.log("getMembersByGroupID: "+JSON.stringify(snapshot.val()));
		//..
	});
};

exports.getGroupMemberByID = function (db, group_id, uid, callback){
	db.ref('group_members/' + group_id).orderByChild("uid").equalTo(uid).once('value').then(function(snapshot) {
		console.log("getMembersByGroupID: "+JSON.stringify(snapshot.val()));
		//..
	});
};

// Requires NodeJS version 7.6 or later
/*exports.isInstructor = async function (db, uid){
	const data = await db.ref('instructors').orderByChild("uid").equalTo(uid).once('value').then(function(snapshot) {
		
		if (!snapshot){
			return false;
		}
		var jsonData = snapshot.val();
		
		if (typeof(jsonData.uid) != "undefined"){
			if (jsonData.uid == uid && jsonData.isInstructor == true){
				return true;
			}
		}
		
		for (var key in jsonData) {
			if (jsonData.hasOwnProperty(key)) {
				console.log("value: " + jsonData[key].uid);
				if (jsonData[key].uid == uid && jsonData[key].isInstructor == true){
					return true;
				}
			}
		}
		return false;
	});
	
	return data;
}*/

// Using Promise for NodeJS < 7.6
exports.isInstructor = function (db, uid){

	const data = new Promise(function (resolve, reject) {

		db.ref('instructors').orderByChild("uid").equalTo(uid).once('value').then(function(snapshot) {

			var jsonData = snapshot.val();
			
			if (!jsonData){
				resolve(false);
			}
			
			
			/*if (typeof(jsonData.uid) != "undefined"){
				if (jsonData.uid == uid && jsonData.isInstructor == true){
					resolve(true);
					//return true;
				}
			}*/
			
			for (var key in jsonData) {
				if (jsonData.hasOwnProperty(key)) {
					//console.log("value: " + jsonData[key].uid);
					if (jsonData[key].uid == uid && jsonData[key].isInstructor == true){
						resolve(true);
						break;
					}
				}
			}
			
			resolve(false);
		}).catch(function(err){
			console.log("Rejected: " + err);
			reject(err);
		});
	});
	
	return data;
}