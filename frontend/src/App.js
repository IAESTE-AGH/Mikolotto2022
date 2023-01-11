import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email : '',
      wish : ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleChange(event){
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name] : value
    });
  }

  handleSubmit(){

    let errors = this.handleValidation();

    if(errors === "Nie można wysłać listu z powodu."){
      alert("Twój list został wysłany!");
    }
    else{
      alert(errors);
    }
  }

  handleValidation(){
    let errorMessage = "Nie można wysłać listu z powodu:";

    if(this.state.email === "" || this.state.wish === ""){
      errorMessage += " niewypełnione pola,"
    }

    if(this.state.email.search("@iaeste.pl") === -1){
      errorMessage += " nieprawidłowy email,"
    }

    errorMessage = errorMessage.substring(0,errorMessage.length-1);
    return errorMessage + ".";
  }

  render() {
    return (
      <div className="App">
        <h1><div>&#10052;</div> Mikolotto <div>&#10052;</div></h1>
        <form
          onSubmit={this.handleSubmit}
          action="http://chmielecki.pro:4430/"
          method="POST"
        >
          <label htmlFor="email">
            Adres e-mail: <br/>
            <input
              name="email"
              type="email"
              placeholder="E-mail IAESTE"
              required
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="wish">
            Twój list: <br/>
            <textarea
              name="wish"
              placeholder="Drogi Mikolaju,"
              required
              value={this.state.wish}
              onChange={this.handleChange}
            />
          </label>
          <input
            className="submit-btn"
            type="submit"
            value="Wyślij!"
          />
        </form>
        <h3>Zasady</h3>
          <p>1. Należy się zarejestrować za pomocą adresu e-mail z outlooka.</p>
          <p>2. Ponowne wysłanie listu spowoduje zastąpienie nim poprzedniego listu.</p>
          <p>3. Rejestracja trwa do 8 grudnia.</p>
          <p>4. Prezenty przynosimy na wigilijkę.</p>
      </div>
    );
  }
}

export default App;
