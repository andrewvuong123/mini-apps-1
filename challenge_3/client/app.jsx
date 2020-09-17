// main component

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // start at homepage
      currentStep: 0,
      name: '',
      email: '',
      password: '',
      line_1: '',
      line_2: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      credit: '',
      expiry: '',
      cvv: '',
      zip: ''
    }
    // hold initial state
    this.initialState = this.state;
    // bind functions to handle clicks
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    // bind functions to handle next/prev steps
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
  }

  // use submitted form data to set the state
  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  // return to homepage
  handleSubmit(event) {
    // reset all values
    this.setState(this.initialState)
  }

  // go to first form and create a new record to db
  handleCheckout(event) {
    // send ajax request to create a new record
    $.ajax({
      url: '/api/create',
      type: 'POST',
      data: {
        name: '',
        email: '',
        password: '',
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        credit: '',
        expiry: '',
        cvv: '',
        zip: ''
      },
      success: function(data) {
        console.log('New Record Created');
      }
    })
    this.setState({
      currentStep: 1
    })
  }

  // increment current page step
  _next() {
    let currentStep = this.state.currentStep;
    // send ajax request to update data into db
    if (currentStep === 1) {
      $.ajax({
        url: '/api/insert',
        type: 'POST',
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        },
        success: function(data) {
          console.log('inserted Step 1', data);
        }
      });
    } else if (currentStep === 2) {
      $.ajax({
        url: '/api/insert',
        type: 'POST',
        data: {
          line_1: this.state.line_1,
          line_2: this.state.line_2,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          phone: this.state.phone
        },
        success: function(data) {
          console.log('inserted Step 2', data);
        }
      });
    } else if (currentStep === 3) {
      $.ajax({
        url: '/api/insert',
        type: 'POST',
        data: {
          credit: this.state.credit,
          expiry: this.state.expiry,
          cvv: this.state.cvv,
          zip: this.state.zip
        },
        success: function(data) {
          console.log('inserted Step 3', data);
        }
      });
    }
    // only increment step if not on confirmation page
    currentStep = currentStep > 3? 4 : currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  // decrements current page step
  _prev() {
    let currentStep = this.state.currentStep;
    // only decrement step if not on first step
    currentStep = currentStep <= 1? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  // get keyword binds an obj property to a fcn
  // renders next/prev button if on the right forms
  get previousButton() {
    if (this.state.currentStep > 1) {
      return (
        <button className='btn' onClick={this._prev}>
          Previous
        </button>
      )
    }
    return null;
  }

  get nextButton() {
    if (this.state.currentStep < 4 && this.state.currentStep !== 0) {
      return (
        <button className='btn' onClick={this._next}>
          Next
        </button>
      )
    }
    return null;
  }

  render() {
    return (
      <div>
        <h1>A Checkout Form!</h1>
        <p>Step {this.state.currentStep}</p>
        <HomePage currentStep={this.state.currentStep} next={this.handleCheckout}/>

        <div>
          <UserForm currentStep={this.state.currentStep} handleChange={this.handleChange} name={this.state.name} email={this.state.email} password={this.state.password}/>

          <AddressForm currentStep={this.state.currentStep} handleChange={this.handleChange} address={this.state.address} phone={this.state.phone}/>

          <CreditForm currentStep={this.state.currentStep} handleChange={this.handleChange} credit={this.state.credit} expiry={this.state.expiry} cvv={this.state.cvv} zip={this.state.zip}/>

          <Confirmation currentStep={this.state.currentStep} handleSubmit={this.handleSubmit} data={this.state}/>

          {this.previousButton}
          {this.nextButton}
        </div>
      </div>
    )
  }
}

// Homepage Component
function HomePage(props) {
  if (props.currentStep !== 0) {
    return null;
  }
  return (
    // homepage has checkout button that leads to first form
    <button className="checkout-btn" onClick={props.next}>
      Checkout!
    </button>
  )
}

// User Form Component
class UserForm extends React.Component {

  render() {
    // current step
    if (this.props.currentStep !== 1) {
      return null
    }
    return (
      <form>
        <label> Name:
          <input name="name" value={this.props.name} onChange={this.props.handleChange} />
        </label>
        <label> Email:
          <input name="email" value={this.props.email} onChange={this.props.handleChange} />
        </label>
        <label> Password:
          <input name="password" value={this.props.password} onChange={this.props.handleChange} />
        </label>
      </form>
    )
  }
}

// Address Form Component
class AddressForm extends React.Component {
  render() {
    // current step
    if (this.props.currentStep !== 2) {
      return null
    }
    return (
      <form>
        <label> Line 1:
          <input name="line_1" value={this.props.line_1} onChange={this.props.handleChange} />
        </label>
        <label> Line 2:
          <input name="line_2" value={this.props.line_2} onChange={this.props.handleChange} />
        </label>
        <label> City:
          <input name="city" value={this.props.city} onChange={this.props.handleChange} />
        </label>
        <label> State:
          <input name="state" value={this.props.state} onChange={this.props.handleChange} />
        </label>
        <label> Zipcode:
          <input name="zipcode" value={this.props.zipcode} onChange={this.props.handleChange} />
        </label>
        <label> Phone Number:
          <input name="phone" value={this.props.phone} onChange={this.props.handleChange} />
        </label>
      </form>
    )
  }
}

// Credit Form Component
class CreditForm extends React.Component {
  render() {
    // current step
    if (this.props.currentStep !== 3) {
      return null
    }
    return (
      <form>
        <label> Credit Card Number:
          <input name="credit" value={this.props.credit} onChange={this.props.handleChange} />
        </label>
        <label> Expiration Date:
          <input name="expiry" value={this.props.expiry} onChange={this.props.handleChange} />
        </label>
        <label> CVV:
          <input name="cvv" value={this.props.cvv} onChange={this.props.handleChange} />
        </label>
        <label> Billing Zipcode:
          <input name="zip" value={this.props.zip} onChange={this.props.handleChange} />
        </label>
      </form>
    )
  }
}

// Confirmation Page Component
function Confirmation(props) {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <div>
      <h1> Confirm Your Information! </h1>
      <p>Name: {props.data.name}</p>
      <p>Email: {props.data.email}</p>
      <p>Password: {props.data.password}</p>
      <p>Address:
        <p>Line 1: {props.data.line_1}</p>
        <p>Line 2: {props.data.line_2}</p>
        <p>State: {props.data.state}</p>
        <p>City: {props.data.city}</p>
        <p>Zipcode: {props.data.zipcode}</p>
      </p>
      <p>Phone Number: {props.data.phone}</p>
      <p>Credit Card Info:
        <p>Number: {props.data.credit}</p>
        <p>Expiration Date: {props.data.expiry}</p>
        <p>CVV: {props.data.cvv}</p>
        <p>Billing Zipcode: {props.data.zip}</p>
      </p>
      <button className="purchase-btn" onClick={props.handleSubmit}>
        Purchase!
      </button>
    </div>
  )
}

// render app to index html
ReactDOM.render( <App />, document.getElementById('app'));

