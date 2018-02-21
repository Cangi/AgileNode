/*A page that deals with creating a form and asking for confirmation before
sending it to a database*/
/*The basics of this code is taken from https://reactjs.org/docs/forms.html */

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    if(confirm('Are you sure you want the name ' + this.state.value))
    {
      <HashRouter>
        <NavLink exact to="./projectPage">
        </NavLink>
        <Route path="./projectPage" component={ProjectPage}/>
      </HashRouter>
    }
    //It also needs to collect the date from the server/browser when it was created
    //This function will ask for confirmation that the name is correct
    //and then check the name for any bad characters, and then submit to database
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm;
