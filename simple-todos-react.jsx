if (Meteor.isClient) {
    // this code is executed on the client only
    
    Meteor.startup(function () {
       
       // use Meteor.startup to render the compoent after the page is rendered
       
       React.render(<App />, document.getElementById("render-target"));
       
    });
}