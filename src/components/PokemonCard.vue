<template>
  <router-link
    :to="{
      name: 'PokemonDetails',
      params: { id },
    }"
    class="pokemon"
  >
    <div style="position: relative">
      <HeartIcon v-if="isFavourite" />
      <img class="pokemon--sprite" :src="spriteUrl" />
      <div class="pokemon--text-content">
        <div class="pokemon--name">#{{ id }} {{ name }}</div>
        <div class="pokemon--type">{{ type }}</div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HeartIcon from "@/components/HeartIcon.vue";

@Component({ components: { HeartIcon } })
export default class PokemonCard extends Vue {
  @Prop({ required: true }) pokemonData!: object;
  @Prop({ required: true }) readonly favourites!: object;

  @Prop() readonly type!: string;
  @Prop() readonly id!: number;
  @Prop() readonly name!: string;
  @Prop() readonly spriteUrl!: string;
  @Prop() readonly isFavourite!: boolean;
}
</script>
<style lang="less" scoped>
.pokemon {
  border: 1px solid grey;
  border-radius: 4px;
  padding: 1rem;
  margin: 2rem;
  min-width: 130px;
  flex: 1 1 0;
  cursor: pointer;

  &--sprite {
    width: 96px;
    height: 96px;
    border-bottom: 1px solid grey;
  }

  &--text-content {
    text-transform: capitalize;
    &--name {
      font-weight: bold;
    }
    &--type {
      font-style: italic;
    }
  }
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
