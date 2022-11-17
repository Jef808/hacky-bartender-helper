<script setup lang="ts">
import { ref, computed } from "vue";

export interface CocktailProps {
  id: string;
  name: string;
  category: string;
  ibaCategory: string;
  instructions: string;
  imageUrl: string;
  ingredients: [string, string][];
  favorite: boolean;
}

interface CocktailState {
  hidden: boolean;
  expanded: boolean;
}

const props = defineProps<{ drinks: CocktailProps[] }>();
const emits = defineEmits(["toggleFav"]);
const state = ref(
  new Map(
    props.drinks.map((drink) => {
      return [drink.id, { hidden: false, expanded: false }];
    })
  )
);
function toggleHidden(drink: CocktailProps) {
  const { hidden, expanded } = state.value.get(drink.id);
  state.value.set(drink.id, { hidden: !hidden, expanded });
}

function toggleExpanded(drink: CocktailProps) {
  const { hidden, expanded } = state.value.get(drink.id);
  state.value.set(drink.id, { hidden, expanded: !expanded });
}

function isExpanded(drink: CocktailProps) {
  return state.value.get(drink.id).expanded;
}

function isHidden(drink: CocktailProps) {
  return state.value.get(drink.id).hidden;
}

export interface cocktailState {
  hidden: boolean;
  expanded: boolean;
}
</script>

<template>
  <v-card
    v-for="drink in drinks"
    :key="drink.id"
    class="mx-auto"
    max-width="344"
  >
    <v-div v-show="!isHidden(drink)">
      <v-img class="align-end" height="200px" :src="drink.imageUrl"> </v-img>
      <v-row>
        <v-col cols="auto">
          <v-card-title v-text="drink.name"></v-card-title>
          <v-card-subtitle>{{ drink.ibaCategory }}</v-card-subtitle>
        </v-col>
        <v-col cols="2">
          <v-card-actions>
            <v-btn icon @click="toggleHidden(drink)">
              <v-icon>mdi-eye-off</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-star-outline</v-icon>
            </v-btn>
            <v-btn icon @click="toggleExpanded(drink)">
              <v-icon v-if="!isExpanded(drink)">mdi-chevron-down</v-icon>
              <v-icon v-else>mdi-chevron-up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-div v-show="isExpanded(drink)">
        <v-row>
          <v-col cols="auto">
            <v-card-text class="pb-0">
              <v-row
                v-for="ingredient in drink.ingredients"
                :key="ingredient[0]"
              >
                <v-col cols="auto">
                  {{ ingredient[0] }}
                </v-col>
                <v-col>
                  {{ ingredient[1] }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="auto">
                  {{ drink.instructions }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-div>
    </v-div>
  </v-card>
</template>
