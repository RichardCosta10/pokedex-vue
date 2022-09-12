# pokedex-vue

App.vue is doing most of the work in making the API call to fetch the data and process that into a pokemon object. I didn't want to use Vuex as this seems like overkill for an application this small, so instead relied on events and passing props down.
### Search
I didn't implement the search but to do that I was just going to grab all the
pokemon names and urls by setting the `offset` parameter in the URL to 1154 to get all the pokemon
names and then using a regex to search for either the start or anywhere within the pokemon name. With the results I would then use the url for that pokemon to get its data.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Run your unit tests
```
yarn test:unit
```