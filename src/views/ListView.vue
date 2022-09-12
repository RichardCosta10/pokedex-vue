<template>
  <div>
    <div v-if="favourites.length">
      <h2>Your Favourites</h2>
      <div class="layout">
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
    <h2>Pokemon</h2>
    <div class="layout">
      <PokemonCard
        :key="pokemon.id"
        v-for="pokemon in pokemonData"
        :type="pokemon.types.join(', ')"
        :name="pokemon.name"
        :id="pokemon.id"
        :sprite-url="pokemon.spriteUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PokemonCard from "@/components/PokemonCard.vue";

@Component({
  components: { PokemonCard },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.$emit("start"));
  },
})
export default class ListView extends Vue {
  @Prop({ required: true }) readonly pokemonData!: object;
  @Prop({ required: true }) readonly favourites!: object;
}
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 5%;
}
</style>
