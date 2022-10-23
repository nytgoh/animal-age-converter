# Animal Age Converter
A simple app that can be used to compare the ages of a set list of animals. Made with a react front end and asp.net backend.

The design was done as part of the #DailyUI challenge, you can see more designs I've done for this challenge in another repository: https://github.com/nytgoh/DailyUI-Challenge

## How to run it
### Hosted Site
This project has been deployed through Azure. You can view the site here: https://animal-age-converter.azurewebsites.net. The yaml file for the pipeline used has been included in the repo.
### Locally
You should be able to just clone the repository and run it straight from Visual Studio. You may need to set the start-up projects up via right clicking the solution and setting both the front and backend to 'Start'. Ensure the backend is above the front-end.

## Preview
![image](https://user-images.githubusercontent.com/54729791/197370060-c35f26a2-5b67-4987-9f4b-475367b37e2a.png)

## Calculations
The conversion rates for animals are set as follows:
* Rabbit: 1st human year = 20 rabbit years. Each subsequent human year equates to 6 rabbit years.
* Cat: First 2 human years = 25 years. Each subsequent human year = 4 cat years.
* Dog: 1st human year = 15 dog years. 2nd human year = 9 dog years. 3rd human year = 5 dog years. Each subsequent human year = 4 dog years.
* Pig: 1st human year = 18 pig years. Each subsequent human year = 4 pig years.
* Horse: First 3 human years = 18 horse years. Each subsequent human year = 2.5 horse years.
* Monkey: First 3 human years = 12 human years. Each subsequent human year = 3 monkey years.
* Hamster: One human year = 26 hamster years.

These values were collected across the internet from several sites including pet shop sites, thesis' and so on. These should not be taken as super scientific. 

This will give a general approximate to the age conversion; however, there are several other variables such as breed, size of animal, environment... etc. that should be taken into consideration for an accurate result.