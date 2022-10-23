using Microsoft.AspNetCore.Mvc;

namespace animal_age_converter_backEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnimalAgeController : ControllerBase
    {
        /*
         * One human year is equal to the stored years in animal
         * if there are multiple, each item will count for 1 year at the start of their life
         * the last item will count for the rest of the years post the others
         * E.g. if Dog = [15, 9, 4]
         * 15 dog year = 1st human year
         * 9 dog year = 2nd human year
         * 4 dog year = each 1 human year after the 2nd year
         */
        private Dictionary<string, IList<double>> ConversionPerHumanYearBracket = new Dictionary<string, IList<double>>()
        {
            { "human", new List<double>() {1} },
            { "rabbit", new List<double>() { 20, 6 }},
            { "cat", new List<double>() { 12.5, 12.5, 4 } },
            { "dog", new List<double>() { 15, 9 , 5, 4 } },
            { "pig", new List<double>() { 18, 4 } },
            { "horse", new List<double>() { 6, 6, 6, 2.5 } },
            { "monkey", new List<double>() { 4, 4, 4, 3 } },
            { "hamster", new List<double>() { 26 } }
        };

        // If human age is input, another animal name should be input to convert the human age into
        // If an animal age is input, then the corresponding animal name should be input to return the human age
        private double ConvertAgesBetweenAnimalAndHuman(string animalName, double animalAge, bool isHumanAgeInput)
        {
            if (!ConversionPerHumanYearBracket.ContainsKey(animalName)) return -1;

            double humanAge = 0;
            double trackingAge = animalAge;

            for (var year = 0; year < ConversionPerHumanYearBracket[animalName].Count; year++)
            {
                // Handles partial years and final age rates
                double yearInThisBracket = trackingAge < 1 || (year == ConversionPerHumanYearBracket[animalName].Count - 1)
                                           ? trackingAge 
                                           : 1;

                double currentRate = ConversionPerHumanYearBracket[animalName][year];
                humanAge += (isHumanAgeInput ? currentRate : (1/currentRate)) * yearInThisBracket;

                trackingAge -= yearInThisBracket;
            }

            return Math.Round(humanAge, 2);
        }

        private double GetAnimalAgeFromHumanAge(string animalNameToGetAgeFor, double humanAge)
        {
            return 0;
        }

        /*  ----------------------------------------------
         *  Convert animal 1's age in years, to animal 2
         *  ----------------------------------------------
         *  Calculation steps:
         *  1. Input animal1Age, animal1Name. Output Human years that = animal1Age.
         *  2. Input Human years, animal2Name. Output Animal2Age that = Human years.
         */
        [HttpGet(Name = "GetAnimalsWithAges")]
        public IEnumerable<Animal> Get([FromQuery] string animal1Name, [FromQuery] double animal1Age, [FromQuery] string animal2Name)
        {
            double humanAgeFromAnimalAge = ConvertAgesBetweenAnimalAndHuman(animal1Name, animal1Age, false);
            double animal2Age = ConvertAgesBetweenAnimalAndHuman(animal2Name, humanAgeFromAnimalAge, true);

            return new List<Animal>()
            {
                new Animal() { Name = animal1Name, Age = animal1Age },
                new Animal() { Name = animal2Name, Age = animal2Age }
            }
            .ToArray();
        }
    }
}