
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('SendPush', function(request,response) {
  var userMessage = request.params.message;
  var userId = request.params.userId;
  var location = request.params.location;
  var userCount = request.params.count;
  var profileName = request.params.userName;
  var query = new Parse.Query(Parse.Installation);
  query.exists("deviceToken");
  query.withinKilometers('Location', location, 10);
  console.log("user id "+userId);
  query.limit(userCount);
  query.equalTo("isLoggedIn",true);
  query.notEqualTo("installationId",userId);
  //query.whereEqualTo('channels','shubh');
  // here you can add other conditions e.g. to send a push to sepcific users or channel etc.
	console.log("pushToUsernames: Push sent successfully to "+profileName);
    
  var payload = {
    alert: profileName,
    'location': location,
    message: userMessage,
    profile: profileName
      // you can add other stuff here...
  };


  Parse.Push.send({
    data: payload,
	  where: query
    }, {
      useMasterKey: true
    });
	response.success("Push Sent!");
	
});

/*Parse.Cloud.define("removeInstallation", function(request, response) {

  Parse.Cloud.useMasterKey();
  var installationId = request.params.installationId;
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("installationId", installationId);

  query.find(function(installations) {
    installations[0].destroy().then(
      function() {
        response.success("Destroyed");
      },
      function() {
        response.error("Failed");
      });
    });

});*/