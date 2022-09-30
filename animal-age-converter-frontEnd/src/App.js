import React, { Component } from "react";

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = { animals: [{ rabbit: 0 }, { human: 0 }], loading: true };
  }

  /* 
  * Summary: creates the img element for the animals that have been selected
  * Parameters:
  *   animalName: as selected
  *   isFront: each image is comprised of a front and back
  *   toFlip: animal 1 is not flipped (top left image), animal 2 is flipped (bottom right). So both animals face inwards.
  * Returns: img element to display
  */
  getAnimalImage(animalName, isFront, toFlip) {
    if (animalName === undefined) {
      return;
    }

    var classAttributeName = (toFlip ? "flipped" : "") + (isFront ? "" : " back");
    var imageId = animalName + "Img";
     var imageFileName = animalName + "-" + (isFront ? "front" : "back") + ".png";

    return (
      <img
        id={imageId}
        className={classAttributeName}
        src={require("./resource/" + imageFileName)}
        alt={animalName}
      />
    );
  }

  /* 
  * Summary: retrieves input values, validates and sends the information off to be processed in the backend
  * The animals data state is set with the retrieved data
  */
  async populateAnimalData() {
    const animal1name = document.getElementById("animal1-name").value === undefined ? "rabbit" : document.getElementById("animal1-name").value;
    const animal1age = document.getElementById("animal1-age").value === undefined ? 0 : document.getElementById("animal1-age").value;
    const animal2name = document.getElementById("animal2-name").value === undefined ? "human" : document.getElementById("animal2-name").value;
    const response = await fetch(
      `animalage?animal1name=${animal1name}&animal1age=${animal1age}&animal2name=${animal2name}`
    );
    const data = await response.json();
    this.setState({ animals: data, loading: false });
  }

  /* 
  * Summary: Generate the page
  */
  render() {
    const reload = (event) => {
      event.preventDefault();
      this.populateAnimalData();
    };

    // handle defaults
    var noData = this.state.animals.length === undefined;
    var animal1Name = noData ? "rabbit" : this.state.animals[0]?.name;
    var animal1Age = noData ? 0 : this.state.animals[0]?.age;
    var animal2Name = noData ? "human" : this.state.animals[1]?.name;
    var animal2Age = noData ? 0 : this.state.animals[1]?.age;

    return (
      <div>
        <div id="innerHeader">
          <h1>
            Animal to Animal <br></br> Age Conversion
          </h1>
          <h2>(years)</h2>
        </div>

        <div id="innerBody">
          <form id="inputForm">
            <div id="animal1">
              <select
                id="animal1-name"
                onChange={reload}
                defaultValue={animal1Name}
              >
                <option value="rabbit">Rabbit</option>
                <option value="human">Human</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="pig">Pig</option>
                <option value="horse">Horse</option>
                <option value="monkey">Monkey</option>
                <option value="hamster">Hamster</option>
              </select>

              {this.getAnimalImage(animal1Name, true, false)}
              <input
                type="text"
                onChange={reload}
                name="animal1"
                id="animal1-age"
                defaultValue={animal1Age}
              />
              {this.getAnimalImage(animal1Name, false, false)}
            </div>

            <img id="arrow" src={require("./resource/arrow.png")} alt="arrow" />

            <div id="animal2">
              <select
                id="animal2-name"
                onChange={reload}
                defaultValue={animal2Name}
              >
                <option value="human">Human</option>
                <option value="rabbit">Rabbit</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="pig">Pig</option>
                <option value="horse">Horse</option>
                <option value="monkey">Monkey</option>
                <option value="hamster">Hamster</option>
              </select>

              {this.getAnimalImage(animal2Name, true, true)}
              <input
                type="text"
                onChange={reload}
                name="animal2"
                id="ageInput-age"
                readOnly="readonly"
                defaultValue={[animal2Age]}
              />
              {this.getAnimalImage(animal2Name, false, true)}
            </div>

            <p>made with react + asp.net core</p>
          </form>
        </div>
      </div>
    );
  }
}
