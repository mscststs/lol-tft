<template>
  <img :src="src" :title="title">
</template>

<script>
import {rune} from "../const/asyncValues";
export default {
  props:[
    "type",
    "id"
  ],
  computed:{
    src(){
      if(this.type === "usericon"){
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/${this.id}.png`
      }else if (this.type === "champions"){
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/champions/${this.id}.png`
      }else if (this.type === "rune"){
        return rune[this.id].icon;
      }else if (this.type === "summonSpell"){
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/summonability/${this.id}.png`
      }else if (this.type === "item"){
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/items/${this.id}.png`
      }
      return "https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/items/0.png"
    },
    title(){
      if(this.type === "rune"){
        return rune[this.id].name
      }

      return ""
    }
  }
}
</script>