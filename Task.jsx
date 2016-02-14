// task component - represent a single todo item
Task = React.createClass({
    propTypes: {
        // this component gets the task to dipajt theiytr a reavct prip
        task: React.PropTypes.object.isRequired
    },
    
    render() {
        return (
            <li>{this.props.task.text}</li>    
        );
    }
});