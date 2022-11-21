<template>
  <div class="icon-container">
    <img class="icon-img" :src="src" :title="title">
  </div>
</template>

<script>
import {rune, items} from "../const/asyncValues";
export default {
  props:[
    "type",
    "id"
  ],
  computed:{
    src(){
      if(this.type === "usericon"){ // 用户头像
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/${this.id}.png`
      }else if (this.type === "champions"){ // 英雄
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/champions/${this.id}.png`
      }else if (this.type === "rune"){ // 天赋
        return rune[this.id].icon;
      }else if (this.type === "summonSpell"){ // 召唤师技能
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/summonability/${this.id}.png`
      }else if (this.type === "item"){ //装备
        return `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/items/${this.id}.png`
      }
      return "https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/items/0.png"
    },
    title(){
      if(this.type === "rune"){
        return rune[this.id].name
      }

      if(this.type === "item"){
        const itemInfo = items.find(item=>item.itemId == this.id);
        if(itemInfo){
          return `${itemInfo.name}`;
        }
      }

      return ""
    }
  }
}
</script>

<style lang="less" scoped>
  .icon-container{
    display: flex;
    position: relative;
    .icon-img{
      flex: auto;
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: inherit;
    }
  }  
</style>