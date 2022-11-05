<template>
  <img :src="src" :alt="type">
</template>

<script>
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
      }
      return "https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/items/0.png"
    }
  }
}
</script>