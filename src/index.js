import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

class Car extends React.Component{
  render(){
    return(
        <table className="table table-dark">
          <thead>
            <th scope="col">ID</th>
            <th>Car Name</th>
            <th>Horse Power</th>
            <th>Price</th>
            </thead>
            <tbody>
              <tr scope="row">
                <td>{this.props.car.id}</td>
                <td>{this.props.car.name}</td>
                <td>{this.props.car.horsepower}/</td>
                <td>{this.props.car.price}</td>
              </tr>
            </tbody>
          </table>
    )
  }
}

class Background extends React.Component{
  constructor(){
    super();
    this.state = { 
      cars: [],
      isLoading: true
    };
  }
  componentDidMount(){
    fetch('http://localhost:3001/api/v1/cars')
    .then(results => {
      return results.json();
    }).then(data => {
      let carss = data;
      this.setState({cars: carss.data});
      this.setState({isLoading: false})
    })
  }

  render(){
    if(this.state.isLoading){
      return(
        <div> 
          isLoading...
        </div>
        
      )
    }
    const carsList = this.state.cars.map( car => {
        return <Car car={car}/> 
      }
    )

    return(
      <div className="table-div"> 
        {carsList}
      </div>
      
    )
  }
}


class FormCar extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      horsepower: '',
      price: ''
    }
  }

  add_car(){
    console.log(this.state.name);
    fetch('http://localhost:3001/api/v1/cars', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ApiKey' : 'ApiKey key=8aWV5WE5CsFsv2oPwwQmVE7i',
        'Access-Control-Allow-Origin' : 'ALLOW-ALL'
      },
      body: JSON.stringify({
        car: {
          name: this.state.name,
          horsepower: this.state.horsepower,
          price: this.state.price
        }
      })
    }).then(results => {
      return results.json();
    }).then(data => {
      alert("Success");
    })
  }
  
  render() {
      return (
        <div className="game">
          <div> <Background /> </div>
          <div className="form-car">
            <form>
              <div className="form-group">
                <label htmlFor="name">Car Name</label>
                <input type="text" className="form-control" id="name" valueLink={this.state.name} placeholder="Car Name"/>
              </div>
              <div className="form-group">
                <label htmlFor="horsepower">Horse Power</label>
                <input type="text" className="form-control" id="horsepower" valueLink={this.state.horsepower} placeholder="Horse Power"/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" valueLink={this.state.price} placeholder="Price"/>
              </div>
              <button onClick={this.add_car} className="btn btn-primary"> Add Car </button>
            </form>
          </div>
        </div>
      );
    }
    
  }
  

  ReactDOM.render(
    <FormCar />,
    document.getElementById('root')
  ); 