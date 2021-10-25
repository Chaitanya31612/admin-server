const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";

const changeTopicName = async () => {
	let client = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).catch(err => {
		console.log(err);
	});

	const db = client.db("dcrustadmin");

	let sitedatas = db.collection("sitedatas");
	let doc = await sitedatas
		.find()
		.toArray()
		.catch(err => {
			console.log(err);
		});
	console.log("Data Collected");

	for (let itr = 0; itr < doc.length; itr++) {
        // for(let itr2 = 0; itr2 < doc[itr].subjects.length; itr2++) {
        //     console.log(doc[itr].subjects[itr].topics);
        //     // db.sitedatas.updateMany( {}, { $rename: { "nmae": "name" } } )
        // }
        await sitedatas.updateOne({UnivName: "dcrust"}, {$rename: { "subjects.topics.topic": "subjects.topics.name" }})
		// if (doc[itr].sub`jects[itr].topics.length > 0 && doc[itr].availability) {
		// 	await sitedatas
		// 		.updateOne(
		// 			{
		// 				_id: doc[itr]._id
		// 			},
		// 			{
		// 				$set: {
		// 					availableFor: {
		// 						internship: true,
		// 						traineeship: false,
		// 						job: false
		// 					}
		// 				}
		// 			},
		// 			{
		// 				upsert: false
		// 			}
		// 		)
		// 		.then(data => {
		// 			console.log("AvailableFor Inserted");
		// 		})
		// 		.catch(err => {
		// 			console.log(err);
		// 		});
		// } else {
		// 	console.log("error");
		// }`
	}
	client.close();
};

changeTopicName().then(() => console.log("Collection updated!"));
