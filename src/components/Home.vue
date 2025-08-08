<template>
    
    <div class="container">
        <h5>please be aware that this is a prototype</h5>

        <h3>Store</h3>
        <div class="row">
          <div class="col">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Damge</th>
                  <th scope="col">value</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(weapon, index) in paginatedWeapons" :key="index">
                  <th scope="row">{{ weapon.name }}</th>
                  <td>{{ weapon.type }}</td>
                  <td>{{ weapon.damage }}</td>
                  <td>{{ weapon.value }}</td>
                  <td><button @click="buyItem(weapon)" type="button" class="btn btn-primary">Buy</button></td>
                </tr>
              </tbody>
            </table>
            <div class="pagination">
              <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
              <span>Page {{ currentPage }} of {{ totalPages }}</span>
              <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
            </div>
          </div>
          <div class="col">
           <h3>Cart</h3>
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Damge</th>
                    <th scope="col">value</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedCart" :key="index">
                    <th scope="row">{{ item.name }}</th>
                    <td>{{ item.type }}</td>
                    <td>{{ item.damage }}</td>
                    <td>{{ item.value }}</td>
                    <td><button @click="removeItem(item)" type="button" class="btn btn-danger">Remove</button></td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination" v-show="itemBought.length >= 10">
                <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <span>Page {{ currentPage }} of {{ totalItemPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
              </div>
          </div>
        </div>
      
      
    </div>
</template>
<script setup>
import { onMounted, ref, computed  } from 'vue';
const weapons = ref([]);
const currentPage = ref(1);
const pageSize = 10;
const itemBought = ref([]);
onMounted(()=>{
  const url = new URL('../assets/rpg_weapons.json', import.meta.url).href;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    weapons.value = data;
  });
}); 

const paginatedWeapons = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return weapons.value.slice(start, end);
});
const paginatedCart = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return itemBought.value.slice(start, end);
});
const totalPages = computed(() => {
  return Math.ceil(weapons.value.length / pageSize);
});

const totalItemPages = computed(() => {
  return Math.ceil(weapons.value.length / pageSize);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function buyItem(weapon){
  itemBought.value.push(weapon)
}

function removeItem(weapon) {
  itemBought.value.pop(weapon);
}

</script>