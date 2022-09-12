<template>
  <div class="layout">
    <h2>{{ pokemonData.name }}</h2>
    <carousel :perPage="1">
      <slide :key="spriteUrl" v-for="spriteUrl in getSpriteUrls()">
        <img class="sprite" :src="spriteUrl" alt="" />
      </slide>
    </carousel>
    <p style="text-align: center">{{ flavourText }}</p>
    <button @click="addToFavourites">Add to favourites</button>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Carousel, Slide } from "vue-carousel";

@Component({
  components: { Carousel, Slide },
})
export default class PokemonDetailView extends Vue {
  @Prop({ required: true }) id!: number;

  pokemonData = [];
  flavourText = "";

  async mounted() {
    const data: Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`
    );
    this.pokemonData = await data.json();
    const speciesData = await fetch(this.pokemonData.species.url);
    const speciesJson = await speciesData.json();
    this.flavourText = speciesJson.flavor_text_entries[0].flavor_text;
  }

  getSpriteUrls() {
    if (this.pokemonData.sprites) {
      return Object.values(this.pokemonData?.sprites).filter((value) => {
        if (typeof value === "string") {
          return value;
        }
      });
    }
    return [];
  }

  @Emit("add-favourite")
  addToFavourites() {
    return this.id;
  }
}
</script>
<style lang="less" scoped>
h2 {
  text-transform: capitalize;
}

.sprite {
  width: 192px;
  height: 192px;
}
</style>
