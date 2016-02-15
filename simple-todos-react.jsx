// define a collection
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    // runs on client only
    
    // this code is executed on the client only
    
    Accounts.ui.config({
       passwordSignupFields: "USERNAME_ONLY" 
    });
    
    Meteor.startup(function () {
        // use meteor startup to render component after page is loaded
        React.render(<App />, document.getElementById("render-target"));
    });
}