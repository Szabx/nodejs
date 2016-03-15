// Join collections in mongoDB

// Set schemas
var testSchema = mongoose.Schema
var personSchema = testSchema({
	name    : String,
	age     : Number,
	stories : [{ type: testSchema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = testSchema({
	_creator : { type: testSchema.Types.ObjectId, ref: 'Person' },
	title    : String,
	fans     : [{ type: Number, ref: 'Person' }]
});

// Set models from schemas
var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

// Create new person
var aaron = new Person({ name: 'Aaron', age: 100 });

// Save new person to mongoDB
aaron.save(function (err) {
	if (err) console.error("Error: ", err);

	var story1 = new Story({
		title: "Once upon a timex.",
		_creator: aaron._id    // assign the _id from the person
	});

	// Save story to person
	story1.save(function (err) {
		if (err) return handleError(err);
		console.log("aaron saved");
	});
});

// Select with join in db
Story
.findOne({ title: 'Once upon a timex.' })
.populate('_creator')
.exec(function (err, story) {
	if (err) console.error(err);
	console.log('The creator is %s', story._creator.name);
});