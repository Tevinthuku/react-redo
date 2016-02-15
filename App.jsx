// App component - represents the whole app

App = React.createClass({
  // mixin makes the getMeteorData method work
  
  mixins: [ReactMeteorData],
 // load items from task collection and puts 
 
getInitialState() {
   return {
       hideCompleted: false
    }    
 },
 
  getMeteorData() {
      let query = {};
      
      if (this.state.hideCompleted) {
        query = {checked: {$ne: true}};    
      }
      
      return {
          tasks: Tasks.find({query}, {sort: {createdAt: -1}}).fetch(),
          incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
          currentUser: meteor.user()
      };
  },
    
    renderTasks() {
        // get tasks from this.data.tasks
        return this.data.tasks.map((task) => {
            const currentUserId = this.data.currentUser && this.data.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;
            return <Task key = {task._id} task = {task} showPrivateButton = {showPrivateButton}/>;
        });
    },
    // the hanlde submit
    
    handleSubmit(event) {
        event.preventDefault();
        
        // find the text field via the React ref
        var text = React.findDOMNode(this.refs.textInput).value.trim();
        
        Metoer.call("addTask", text);
        //clear the form
        
        React.findDOMNode(this.refs.textInput).value =  "";
    },
    
    
    toggleHideCompleted() {
        this.setState({
           hideCompleted: ! this.state.hideCompleted 
        });
    },
    
    
    render() {
       
        return (
          <div className = ""container>
            <header>
               <h1>Todo List ({this.data.incompleteCount})</h1>
               
               <label className="hide-completed">
                 <input 
                   type="checkbox"
                   readOnly={true}
                   checked={this.state.hideCompleted}
                   onClick={this.toggleHideCompleted} />
               </label>
               
               <AccountsUIWrapper />
            { this.data.currentUser ?  
               <form className="new-task" onSubmit={this.handleSubmit}>
               <input  
               type="text"
               ref="textInput"
               placeholder="Type to add new Task" />
               </form> : ''
            }   
            </header>
            
            <ul>
               {this.renderTasks()}
            </ul>
          </div>  
        );
    }
})