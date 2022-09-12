<template>
  <div>
    <div v-if="favourites.length">
      <h2>Your Favourites</h2>
      <div class="pokemon-list">
        <PokemonCard
          :key="pokemon.id"
          v-for="pokemon in favourites"
          :type="pokemon.types.join(', ')"
          :name="pokemon.name"
          :id="pokemon.id"
          :sprite-url="pokemon.spriteUrl"
          :is-favourite="true"
        />
      </div>
    </div>
    <div class="layout">
      <button id="prev-btn" @click="previous" :disabled="isBeginning">
        Previous Page
      </button>
      <div class="pokemon-list">
        <PokemonCard
          :key="pokemon.id"
          v-for="pokemon in pokemonData"
          :type="pokemon.types.join(', ')"
          :name="pokemon.name"
          :id="pokemon.id"
          :sprite-url="pokemon.spriteUrl"
        />
      </div>
      <button id="next-btn" @click="next" :disabled="isEnd">Next Page</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import PokemonCard from "@/components/PokemonCard.vue";

const LAST_PAGE = 1140;
const FIRST_PAGE = 0;

@Component({
  components: {
    PokemonCard,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$props.pokemonData.length === 0) {
        vm.$emit("start");
      }
    });
  },
})
export default class PaginatedListView extends Vue {
  @Prop({ required: true }) pokemonData!: object;
  @Prop({ required: true }) readonly favourites!: object;
  @Prop({ required: true }) offset!: number;

  @Emit("next-page")
  next() {
    return;
  }

  @Emit("previous-page")
  previous() {
    return;
  }

  get isBeginning(): boolean {
    return this.offset <= FIRST_PAGE;
  }

  get isEnd(): boolean {
    return this.offset >= LAST_PAGE;
  }
}
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  column-gap: 5%;

  button {
    height: 2rem;
    margin: 2rem;
    flex-basis: 10%;
    white-space: nowrap;
  }
}
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  flex-basis: 80%;
  column-gap: 5%;
}
</style>
