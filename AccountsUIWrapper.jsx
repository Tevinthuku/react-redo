AccountsUIWrapper = React.createClass({
   componentDidMount() {
       
       // use Metoer Blaze to render login buttonns
       this.view = Blaze.render(Template.loginButtons,
       React.findDOMNode(this.refs.container));
   },
   componentWillUnmount() {
       
       // clean up blaze view
       Blaze.remove(this.view);
   },
   
   render() {
       // just render a placeholder container to be filled in
       return <span ref="container" />
   }
});