<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="editSmoothie">
        <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="smoothie.title">
        </div>
        <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
          <label for="ingredient">Ingredient:</label>
          <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
          <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
        </div>
        <div class="field add-ingredient">
            <label for="add-ingredient">Add an ingredient:</label>
            <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another"> 
        </div>
        <div class="field center-align">
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
            <button class="pink btn">Update Smoothie</button>
        </div>
    </form>
  </div>    
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      slug: this.$route.params.smoothie_slug,
      smoothie: null,
      feedback: null,
      another: null
    };
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.slug)
      .get()
      .then(snapshot => {
        this.smoothie = snapshot.docs[0].data();
        this.smoothie.id = snapshot.docs[0].id;
      });
  },
  methods: {
    editSmoothie() {
      console.log(this.smoothie);
      if (!this.smoothie.title) {
        return (this.feedback = "You must enter a smoothie title");
      }
      this.feedback = null;
      // create a slug
      this.smoothie.slug = slugify(this.smoothie.title, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true
      });
      db.collection("smoothies")
        .doc(this.smoothie.id)
        .update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        })
        .then(_ => {
          this.$router.push({ name: "Index" });
        })
        .catch(error => console.log(error));
    },
    addIngredient() {
      if (!this.another) {
        return (this.feedback = "You must introduce a valid ingredient");
      }
      this.smoothie.ingredients.push(this.another);
      this.another = null;
      this.feedback = null;
    },
    deleteIngredient(ingredient) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ing => ing !== ingredient
      );
    }
  }
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

