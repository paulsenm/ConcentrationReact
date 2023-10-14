import { Component } from 'react';
import './App.css';
import Status from './components/Status';

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
    let images = Array(20).fill(null);
    let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    let suits = ['h', 's'];
    let index = 0;
    for (let value = 0; value < values.length; value++){
        for (let suit = 0; suit < suits.length; suit ++) {
            images[index] = "card" + values[value] + suits[suit] + ".jpg";
            console.log("Card image name: " + images[index]);
            index++;
        }
    }
    return images;
  }

  shuffleImages(images){
    console.log("Images shuffled.");
    for (let i = 0; i < images.length; i++) {
      let rnd = Math.floor(Math.random() * images.length);
      [images[i], images[rnd]] = [images[rnd], images[i]];
  }
  }

  renderCard(i){
    console.log("Card rendered." + i);
    const image = (this.state.images[i] == null) ? 'none' : 
      ( this.state.firstPick == i || this.state.secondPick == i) ? 
      'url(' + this.state.imagePath + this.state.images[i] + ')' : 
      'url(' + this.state.imagePath + 'black_back.jpg)';
    let imagesNull = this.state.images == null;
    let iNotPicked = i != this.state.firstPick && i != this.state.secondPick;
    let notBothPicked = this.state.firstPick == -1 || this.state.secondPick == -1;
    let gameNotOver = this.state.matches < 10;
    console.log("image null? " + (imagesNull ? "yes" : "no"));
    console.log("iNotPicked?" + (iNotPicked ? "yes" : "no"));
    console.log("Not two picked?" + (notBothPicked  ? "yes" : "no"));
    console.log("Game not over? " + (gameNotOver  ? "yes" : "no"));
    const enabled = (this.state.images[i] != null && 
    (i != this.state.firstPick && i != this.state.secondPick) &&
    (this.state.firstPick == -1 || this.state.secondPick == -1) &&
    (this.state.matches < 10)) ? true : false;
    const eventHandler = (enabled) ? () => this.handleClick(i) : () => {};
    //const eventHandler = () => this.handleClick(i); 
    const cursor = (enabled) ? "pointer" : "none";
    //const cursor = "pointer";
    const output = 
      <div 
          id={i} key={i} 
          name="card" 
          className="col-sm-2 card"
          style={{backgroundImage: image, cursor: cursor}}
          onClick={eventHandler}
          >
          &nbsp;
      </div>
    ;
  return output;
  }

  handleClick(i){
    console.log("Click handled." + i);
    const index = parseInt(i);

    if (this.state.firstPick == -1)
      this.setState({firstPick : index});
        //this.state.firstPick = index;
    else {
      this.setState({secondPick: index});
        setTimeout(this.checkCards, 2000);
    }
  }

  isMatch(){
    console.log("Match is'ed.");
    const firstPickIndex = this.state.firstPick;
    const secondPickIndex = this.state.secondPick;
    if(firstPickIndex >= 0 && secondPickIndex >= 0){
      if (this.state.images[this.state.firstPick].substr(4, 1) == this.state.images[this.state.secondPick].substr(4, 1))
        return true;
      else
        return false;
    }
  }

  checkCards(){
    console.log("Cards checked.");
    this.setState({tries: this.state.tries + 1});
    if (this.isMatch()) {
      console.log("IT WAS A MATCH");
      const {firstPick, secondPick, images} = this.state;
      const updatedImages = [...images];
      updatedImages[firstPick] = null;
      updatedImages[secondPick] = null;

      this.setState({ images : updatedImages});
      this.setState({ matches: this.state.matches + 1});
    }
    this.state.firstPick = -1;
    this.state.secondPick = -1;
  }

  render(){
    console.log("Rendered.");
    let status = (this.state.matches < 10) ?
      'Matches: ' + this.state.matches + " Tries: " + this.state.tries :
      "Congratulations!  You found all 10 matches in " + this.state.tries + " tries!";
    console.log("Status is: "+ status);
    const output = 
       <div className="container" id="board">
            < Status status = {status} />
            <div className="row">
                <div className="col-sm-1"></div>
                {this.renderCard(0)}
                {this.renderCard(1)}
                {this.renderCard(2)}
                {this.renderCard(3)}
                {this.renderCard(4)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {this.renderCard(5)}
                {this.renderCard(6)}
                {this.renderCard(7)}
                {this.renderCard(8)}
                {this.renderCard(9)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {this.renderCard(10)}
                {this.renderCard(11)}
                {this.renderCard(12)}
                {this.renderCard(13)}
                {this.renderCard(14)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {this.renderCard(15)}
                {this.renderCard(16)}
                {this.renderCard(17)}
                {this.renderCard(18)}
                {this.renderCard(19)}
                <div className="col-1"></div>
            </div>
        </div>
        ;
    
    //document.getElementById("root").innerHTML = output;


     return output;
  }

}

export default App;


// import { useState } from 'react';
// import './App.css';
// import Status from './components/Status';


// function App(){

// }