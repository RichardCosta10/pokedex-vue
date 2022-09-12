<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/paginate">See All</router-link>
    </nav>
    <router-view
      :key="$route.path"
      @add-favourite="addFavourite"
      @next-page="fetchNextPage"
      @previous-page="fetchPreviousPage"
      @start="fetchFirstPage"
      :pokemonData="orderedPokemonList"
      :favourites="favouritePokemon"
      :offset="offset"
    />
  </div>
</template>

<style lang="less">
#app {
  text-align: center;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Pokemon,
  PokemonSprite,
  PokemonType,
  ResponseData,
} from "@/types/types";

@Component({})
export default class App extends Vue {
  pokemonDataSubset: Array<Pokemon> = [];
  favouritePokemon: Array<Pokemon> = [];
  offset = 0;

  created() {
    this.fetchFavouritePokemonData();
  }

  async fetchOffsetPokemonData() {
    this.pokemonDataSubset = [];
    const data: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}`
    );
    const json = await data.json();
    const results: [{ name: string; url: string }] = json.results;
    results.forEach((result) => {
      fetch(result.url).then((result) => {
        result.json().then((data) => {
          this.pokemonDataSubset.push(this.constructPokemonFromData(data));
        });
      });
    });
  }

  fetchFavouritePokemonData() {
    // iterate over all the keys in local storage and fetch individual pokemon data using key name
    for (let i = 0; i < localStorage.length; i++) {
      this.addToFavouritesList(localStorage.key(i));
    }
  }

  async addToFavouritesList(key: string | null) {
    const data: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${key}`
    );
    const json = await data.json();
    this.favouritePokemon.push(this.constructPokemonFromData(json));
  }

  constructPokemonFromData(pokemonData: ResponseData): Pokemon {
    return {
      id: pokemonData.id,
      types: this.getTypes(pokemonData.types),
      name: pokemonData.name,
      spriteUrl: this.getSprite(pokemonData.sprites),
      isFavourite: this.isFavourite(pokemonData.id),
      flavourText: this.getFlavourText(pokemonData.species),
    } as Pokemon;
  }

  getTypes(typesData: Array<PokemonType>): string[] {
    return typesData.map((data) => data.type.name);
  }

  getSprite(sprites: PokemonSprite) {
    return sprites.front_default;
  }

  async getFlavourText(species: { url: string }): string {
    const data = await fetch(species.url);
    const json = await data.json();
    return json.flavor_text_entries[0].flavor_text;
  }

  get orderedPokemonList(): Array<Pokemon> {
    return this.pokemonDataSubset.sort(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );
  }

  addFavourite(id: string): void {
    if (!localStorage.getItem(id)) {
      window.localStorage.setItem(id, JSON.stringify(true));
      this.addToFavouritesList(id);
    }
  }

  isFavourite(id: string): boolean {
    return window.localStorage.getItem(id) ? true : false;
  }

  fetchNextPage() {
    this.offset += 20;
    this.fetchOffsetPokemonData();
  }

  fetchPreviousPage() {
    this.offset -= 20;
    this.fetchOffsetPokemonData();
  }

  fetchFirstPage() {
    this.offset = 0;
    this.fetchOffsetPokemonData();
  }
}
</script>
