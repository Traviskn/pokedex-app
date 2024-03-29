import { getRandomInt } from "./randomInt";
import { generateRandomPoint, GeoPoint } from "./randomGeo";

const RADIUS = 300; // meters

const pokemonImages: { [key: number]: any } = {
  1: require("../../assets/pokemon/1.png"),
  2: require("../../assets/pokemon/2.png"),
  3: require("../../assets/pokemon/3.png"),
  4: require("../../assets/pokemon/4.png"),
};

export function getRandomPokemon(count: number, location: GeoPoint) {
  let pokemon = [];

  for (let i = 0; i < count; i++) {
    pokemon.push(
      Object.assign(
        {
          image: pokemonImages[getRandomInt(1, 5)],
        },
        generateRandomPoint(location, RADIUS),
      ),
    );
  }

  return pokemon;
}
