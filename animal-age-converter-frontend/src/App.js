import React, { Component } from "react";
import rabbit from "./resource/rabbit.png";
import human from "./resource/human.png";
import dog from "./resource/dog.png";
import hamster from "./resource/hamster.png";
import horse from "./resource/horse.png";
import monkey from "./resource/monkey.png";
import cat from "./resource/cat.png";
import pig from "./resource/pig.png";

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { animals: [{ human: 0 }, { rabbit: 0 }] };
    }

    /* 
    * Summary: creates the img element for the animals that have been selected
    * Parameters:
    *   animalName: as selected
    *   isFront: each image is comprised of a front and back
    *   toFlip: animal 1 is not flipped (top left image), animal 2 is flipped (bottom right). So both animals face inwards.
    * Returns: img element to display
    */
    getAnimalImage(animalName, toFlip) {
        if (animalName === undefined) animalName = toFlip ? "rabbit" : "human"; // defaults

        var image;
        switch (animalName) {
            case "rabbit": image = rabbit; break;
            case "human": image = human; break;
            case "cat": image = cat; break;
            case "dog": image = dog; break;
            case "hamster": image = hamster; break;
            case "horse": image = horse; break;
            case "monkey": image = monkey; break;
            case "pig": image = pig; break;
            default: image = "human";
        }

        return (
            <img
                id={animalName + "Img"}
                className={toFlip ? "flipped" : ""}
                src={image}
                alt={animalName}
            />
        );
    }

    /* 
    * Summary: retrieves input values, validates and sends the information off to be processed in the backend
    * The animals data state is set with the retrieved data
    */
    async populateAnimalData() {
        const animal1name = document.getElementById("animal1-name").value === undefined
                            ? "human" : document.getElementById("animal1-name").value;
        const animal1age = document.getElementById("animal1-age").value === undefined || document.getElementById("animal1-age").value === ''
                            ? 0 : document.getElementById("animal1-age").value;
        const animal2name = document.getElementById("animal2-name").value === undefined
                            ? "rabbit" : document.getElementById("animal2-name").value;
        const response = await fetch(
            `animalage?animal1name=${animal1name}&animal1age=${animal1age}&animal2name=${animal2name}`
        );
        const data = await response.json();
        this.setState({ animals: data});
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
        var animal1Name = noData ? "human" : this.state.animals[0]?.name;
        var animal1Age = noData ? 0 : this.state.animals[0]?.age;
        var animal2Name = noData ? "rabbit" : this.state.animals[1]?.name;
        var animal2Age = noData ? 0 : this.state.animals[1]?.age;

        return (
            <div>
                <div id="innerHeader">
                    <h1>
                        Animal <br></br> Age Conversion
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
                                <option value="human">Human</option>
                                <option value="rabbit">Rabbit</option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                                <option value="pig">Pig</option>
                                <option value="horse">Horse</option>
                                <option value="monkey">Monkey</option>
                                <option value="hamster">Hamster</option>
                            </select>

                            {this.getAnimalImage(animal1Name, false)}
                            <input
                                type="text"
                                onChange={reload}
                                name="animal1"
                                id="animal1-age"
                                defaultValue={animal1Age}
                            />
                            {this.getAnimalImage(animal1Name, false)}
                        </div>

                        <img id="arrow" src={require("./resource/arrow.png")} alt="arrow" />

                        <div id="animal2">
                            <select
                                id="animal2-name"
                                onChange={reload}
                                defaultValue={animal2Name}
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

                            {this.getAnimalImage(animal2Name, true)}
                            <input
                                type="text"
                                onChange={reload}
                                name="animal2"
                                id="ageInput-age"
                                readOnly="readonly"
                                defaultValue={[animal2Age]}
                            />
                            {this.getAnimalImage(animal2Name, true)}
                        </div>

                        <p>made with react + asp.net core</p>
                    </form>
                </div>
            </div>
        );
    }
}
