// define a collection
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    // runs on client only
    
    // this code is executed on the client only
    
    Accounts.ui.config({
       passwordSignupFields: "USERNAME_ONLY" 
    });
    
    Meteor.subscribe("tasks");
    
    Meteor.startup(function () {
        // use meteor startup to render component after page is loaded
        React.render(<App />, document.getElementById("render-target"));
    });
}

if (Meteor.isServer) {
    Meteor.publish("tasks", function () {
        return Tasks.find({
            $or: [
            
            {private: {$ne: true} },
            { owner: this.userId }
            
            ]
        });
    });
}

Meteor.methods({
   addTask(text) {
       
       // Make sure that the user is logged in before insertion
       if (! Meteor.userId()) {
           throw new Meteor.Error("not- authorized");
       }
       
       Tasks.insert({
           text: text,
           createdAt: new Date(),
           owner: Meteor.userId(),
           username: Meteor.user().username
       });
   },
   
   removeTaks(taskId) {
       const task = Tasks.findOne(taskId);
       
       if(task.private && task.owner !== Meteor.userId()) {
           throw new Metoer.Error("not-authorized");
       }
       Tasks.remove(taskId);
   },
   
   setChecked(taskId, setChecked) {
       const task = Tasks.findOne(taskId);
       
       if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
       }
       
       Tasks.update(taskId, {$set: { checked: setChecked}});
   },
   
   setPrivate(taskId, setToPrivate) {
       const task = Tasks.findOne(taskId);
       
       // make sure only the task owner can make a task private
       
       if(task.owner !== Meteor.userId()) {
           throw new Meteor.Error("not-authorized");
       }
       
       Tasks.update(taskId, { $set: { private: setToPrivate } });
   }
});





















