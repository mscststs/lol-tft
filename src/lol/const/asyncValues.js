// 天赋
export let rune = {};

// 装备
export let items = [];


export async function runeInit(){
  let res = await fetch("https://game.gtimg.cn/images/lol/act/img/js/runeList/rune_list.js");
  let result = await res.json();
  rune = result.rune;
}

export async function itemsInit(){
  let res = await fetch("https://game.gtimg.cn/images/lol/act/img/js/items/items.js");
  let result =await res.json();
  items = result.items;
}

export const inits = [
  runeInit,
  itemsInit,
]