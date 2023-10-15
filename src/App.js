import { Component, useState } from 'react';
import './App.css';
import Status from './components/Status';
import Card  from './components/Card';


const imagePath = 'Cards/';

const fillAndShuffle = () => {
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
  console.log("Shuffling images...");
  for (let i = 0; i < images.length; i++) {
    let rnd = Math.floor(Math.random() * images.length);
    [images[i], images[rnd]] = [images[rnd], images[i]];
  }
  return images;
}

const isMatch = (firstPick, secondPick, images) => {
  console.log("Match is'ed.");
  if(firstPick >= 0 && secondPick >= 0){
    if (images[firstPick].substr(4, 1) == images[secondPick].substr(4, 1))
      return true;
    else
      return false;
  }
}



function App() {
  const [picks, setPicks] = useState({first: -1, second: -1});
  const [matches, setMatches] = useState(0);
  const [tries, setTries] = useState(0);
  const [images, setImages] = useState(fillAndShuffle);


  const handleClick = (i) => {
    console.log("Click handled." + i);
    const index = parseInt(i);
    let localPicks = {...picks};
    if (localPicks.first == -1){
      localPicks.first = index;
    }
    else {
      localPicks.second = index;
      //this.setState({secondPick: index});
      let localImages = images;
      setTimeout(checkCards, 2000, localPicks.first, localPicks.second, localImages, matches );
    }
    setPicks(localPicks);
  }

  const checkCards = (firstPick, secondPick, images, matches) => {

    console.log("Checking cards... firstPick is: " + picks.first + ", secondPick is: " + picks.second);
    
    setTries(tries + 1);
    //this.setState({tries: this.state.tries + 1});
    if (isMatch(firstPick, secondPick, images)) {
      console.log("IT WAS A MATCH");
      //const {firstPick, secondPick, images} = this.state;
      images[firstPick] = null;
      images[secondPick] = null;
      // const updatedImages = [...images];
      // updatedImages[firstPick] = null;
      // updatedImages[secondPick] = null;
      setImages(images);
      setMatches(matches + 1);
      // this.setState({ images : updatedImages});
      // this.setState({ matches: this.state.matches + 1});
    }
    setPicks({first: -1, second: -1});
    // this.state.firstPick = -1;
    // this.state.secondPick = -1;
  }




  const renderCard = (i) => {
    console.log("Card rendered." + i);
    console.log("firstPick is: " + picks.first + ", secondPick is: " + picks.second);
    const image = (images[i] == null) ? 'none' : 
      (picks.first == i || picks.second == i) ? 
      'url(' + imagePath + images[i] + ')' : 
      'url(' + imagePath + 'black_back.jpg)';
    let imagesNull = images == null;
    let iNotPicked = i != picks.first && i != picks.second;
    let notBothPicked = picks.first == -1 || picks.second == -1;
    let gameNotOver = matches < 10;
    console.log("image null? " + (imagesNull ? "yes" : "no"));
    console.log("iNotPicked?" + (iNotPicked ? "yes" : "no"));
    console.log("Not two picked?" + (notBothPicked  ? "yes" : "no. firstPick is: " + picks.first + ", secondPick is: " + picks.second));
    console.log("Game not over? " + (gameNotOver  ? "yes" : "no"));
    const enabled = (images[i] != null && 
    (i != picks.first && i != picks.second) &&
    (picks.first == -1 || picks.second == -1) &&
    (matches < 10)) ? true : false;
    const eventHandler = (enabled) ? () => handleClick(i) : () => {};
    //const eventHandler = () => this.handleClick(i); 
    const cursor = (enabled) ? "pointer" : "none";
    const style = {backgroundImage: image, cursor: cursor};
    //const cursor = "pointer";
    // const output = 
    //   <div 
    //       id={i} key={i} 
    //       name="card" 
    //       className="col-sm-2 card"
    //       style={{backgroundImage: image, cursor: cursor}}
    //       onClick={eventHandler}
    //       >
    //       &nbsp;
    //   </div>
    // ;
    return(
     < Card 
      style = {style}
      index = {i}
      eventHandler = {eventHandler}
       />
       );
  }

  let status = (matches < 10) ?
    'Matches: ' + matches + " Tries: " + tries :
    "Congratulations!  You found all 10 matches in " + tries + " tries!";
  console.log("Status is: "+ status);
  return(
      <div className="container" id="board">
          < Status status = {status} />
          <div className="row">
              <div className="col-sm-1"></div>
              {renderCard(0)}
              {renderCard(1)}
              {renderCard(2)}
              {renderCard(3)}
              {renderCard(4)}
              <div className="col-1"></div>
          </div>
          <div className="row">
              <div className="col-sm-1"></div>
              {renderCard(5)}
              {renderCard(6)}
              {renderCard(7)}
              {renderCard(8)}
              {renderCard(9)}
              <div className="col-1"></div>
          </div>
          <div className="row">
              <div className="col-sm-1"></div>
              {renderCard(10)}
              {renderCard(11)}
              {renderCard(12)}
              {renderCard(13)}
              {renderCard(14)}
              <div className="col-1"></div>
          </div>
          <div className="row">
              <div className="col-sm-1"></div>
              {renderCard(15)}
              {renderCard(16)}
              {renderCard(17)}
              {renderCard(18)}
              {renderCard(19)}
              <div className="col-1"></div>
          </div>
      </div>)
      ;





  // render(){
  //   console.log("Rendered.");
  //   let status = (this.state.matches < 10) ?
  //     'Matches: ' + this.state.matches + " Tries: " + this.state.tries :
  //     "Congratulations!  You found all 10 matches in " + this.state.tries + " tries!";
  //   console.log("Status is: "+ status);
  //   const output = 
  //      <div className="container" id="board">
  //           < Status status = {status} />
  //           <div className="row">
  //               <div className="col-sm-1"></div>
  //               {this.renderCard(0)}
  //               {this.renderCard(1)}
  //               {this.renderCard(2)}
  //               {this.renderCard(3)}
  //               {this.renderCard(4)}
  //               <div className="col-1"></div>
  //           </div>
  //           <div className="row">
  //               <div className="col-sm-1"></div>
  //               {this.renderCard(5)}
  //               {this.renderCard(6)}
  //               {this.renderCard(7)}
  //               {this.renderCard(8)}
  //               {this.renderCard(9)}
  //               <div className="col-1"></div>
  //           </div>
  //           <div className="row">
  //               <div className="col-sm-1"></div>
  //               {this.renderCard(10)}
  //               {this.renderCard(11)}
  //               {this.renderCard(12)}
  //               {this.renderCard(13)}
  //               {this.renderCard(14)}
  //               <div className="col-1"></div>
  //           </div>
  //           <div className="row">
  //               <div className="col-sm-1"></div>
  //               {this.renderCard(15)}
  //               {this.renderCard(16)}
  //               {this.renderCard(17)}
  //               {this.renderCard(18)}
  //               {this.renderCard(19)}
  //               <div className="col-1"></div>
  //           </div>
  //       </div>
  //       ;
    
    //document.getElementById("root").innerHTML = output;




}

export default App;


// import { useState } from 'react';
// import './App.css';
// import Status from './components/Status';


// function App(){

// }