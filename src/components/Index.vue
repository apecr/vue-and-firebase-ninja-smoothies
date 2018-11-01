<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

const smoothiesCollection = "smoothies";
export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    };
  },
  methods: {
    deleteSmoothie({ id }) {
      // delete doc from firestore
      db.collection(smoothiesCollection).doc(id).delete()
      .then(_ => {
        this.smoothies = this.smoothies.filter(smoothie => smoothie.id !== id);  
      });
      
    }
  },
  created() {
    //fetch data from Firestore
    db.collection(smoothiesCollection)
      .get()
      .then(
        snaphot =>
          (this.smoothies = snaphot.docs.map(el => {
            const obj = el.data();
            obj.id = el.id;
            return obj;
          }))
      );
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaaa;
  font-size: 1.4em;
}
</style>
