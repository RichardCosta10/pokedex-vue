export type ResponseData = {
  id: string;
  types: Array<PokemonType>;
  name: string;
  sprites: PokemonSprite;
  species: PokemonSpecies;
};

export type Pokemon = {
  id: string;
  name: string;
  spriteUrl: string;
  types: Array<string>;
  isFavourite?: boolean;
  flavourText?: string;
};

export type PokemonType = {
  slot: number;
  type: { name: string; url: string };
};

export type PokemonSprite = {
  [key: string]: string;
};

export type PokemonSpecies = {
  name: string;
  url: string;
};
