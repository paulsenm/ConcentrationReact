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
}

export default App;
