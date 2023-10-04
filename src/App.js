import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      imagePath: 'Cards/',
      firstPick: -1,
      secondPick: -1,
      matches: 0,
      tries: 0,
      images: this.fillImages(),
      
    };
    this.shuffleImages(this.state.images);

    this.handleClick = this.handleClick.bind(this);
    this.checkCards = this.checkCards.bind(this);
    this.isMatch = this.isMatch.bind(this);


  }

  fillImages(){
    console.log("Images filled.");
  }

  shuffleImages(images){
    console.log("Images shuffled.");
  }

  renderCard(i){
    console.log("Card rendered.")
  }

  handleClick(event){
    console.log("Click handled.");
  }

  isMatch(){
    console.log("Match is'ed.");
  }

  checkCards(){
    console.log("Cards checked.");
  }

  render(){
    console.log("Rendered.");
    let output = 
      <div>
        Rendered
      </div>
      ;

    return output;
  }

}

export default App;
