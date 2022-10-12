using Microsoft.AspNetCore.Mvc;

namespace animal_age_converter_backEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnimalAgeController : ControllerBase
    {
        // One human year is equal to the stored years in animal
        private Dictionary<string, double> HumanToAnimalConversion = new Dictionary<string, double>()
        {
            { "human", 1 },
            { "rabbit", 8.89 },
            { "cat", 3.2 },
            { "dog", 3.64 },
            { "pig", 3.2 },
            { "horse", 2 },
            { "monkey", 3.2 },
            { "hamster", 20 }
        };

        /*  ----------------------------------------------
         *  Convert animal 1's age in years, to animal 2
         *  ----------------------------------------------
         *  Logic example:
         *  1 human year = 2 horse years
         *  1 human year = 3.64 dog years
         *  so 2 horse years = 3.64 dog years
         *
         *  To find how many dog years is 3 horse years? We have two statements
         *  2x = 3.64x and 2x = 3
         *  -> 3/2 = x = 1.5 
         *  -> 3.64 * 1.5 = 5.46 dog years
         */
        [HttpGet(Name = "GetAnimalsWithAges")]
        public IEnumerable<Animal> Get([FromQuery] string animal1Name, [FromQuery] double animal1Age, [FromQuery] string animal2Name)
        {
            double ratio = animal1Age / HumanToAnimalConversion[animal1Name];
            double animal2Age = Math.Round(HumanToAnimalConversion[animal2Name] * ratio, 2);

            return new List<Animal>()
            {
                new Animal() { Name = animal1Name, Age = animal1Age },
                new Animal() { Name = animal2Name, Age = animal2Age }
            }
            .ToArray();
        }
    }
}