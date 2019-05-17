# wizzi-mongodb
mongodb document storage component for the wizzi factory.
## fsitems collection
	_id : ObjectId
	parentId : ObjectId
    basename : String
    dirname : String
    path : String
    kind : oneOf(
		0 = folder
		1 = file
	)
## documents collection
    _id : ObjectId
    content : String
    lastModified : ISODate
## The Wizzi Factory - v3 (pre-release)
A set of tools for extreme model driven development.
## Work still in progress
Availability of new features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)
