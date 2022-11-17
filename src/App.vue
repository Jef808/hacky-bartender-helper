<script setup lang="ts">
import api from "./scripts/cocktailApi";
import { type apiQueryResult, makeCocktailProps } from "@/cocktail"
import { ref, reactive, computed } from 'vue'
import CocktailViewer, { type CocktailProps } from './components/CocktailViewer.vue'

//type RequestType = "" | "drinksByName";

const loading = ref(false)

const showRaw = ref(false)
const drinkNameInput = ref("")
const results = ref({ drinks: [] as CocktailProps[] })

async function getDrinksByName() {
    loading.value = true;
    const name = drinkNameInput.value;
    if (name) {
        const res = await api.getDrinksByName(name);
        results.value.drinks = res.drinks.map((drink: apiQueryResult) => makeCocktailProps(drink))
        console.log("Results updated")
    }
    loading.value = false;
}
</script>

<template>
    <header>
        <v-toolbar light>
            <v-toolbar-title>Search</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-for="item in [
                { label: 'By Cocktail Name' },
                { label: 'By Ingredients' },
                { label: 'By ...' },
            ]" :key="item.label" class="hidden-sm-and-down">
                <v-btn text>
                    {{ item.label }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </header>
    <main>
        <v-form @submit.prevent="getDrinksByName">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="drinkNameInput" label="Cocktail Name" required>
                        </v-text-field>
                        <v-btn color="success" class="mr-4" @click="getDrinksByName">Search</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <hr />
        <div v-if="showRaw">
            <pre v-if="loading">Loading results...</pre>
            <pre v-else>{{ results }}</pre>
        </div>
        <div v-else>
            <pre v-if="loading">Loading results...</pre>
            <CocktailViewer v-else v-bind="results" />
        </div>
    </main>
    <footer>
        <div style="margin-bottom: 1.2em">
            <label for="input-showRaw">Show raw data</label>
            <input id="input-showRaw" type="checkbox" v-model="showRaw" />
        </div>
    </footer>
</template>
