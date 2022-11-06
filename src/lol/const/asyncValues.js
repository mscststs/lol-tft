export let rune = {};

export async function runeInit(){
  let res = await fetch("https://game.gtimg.cn/images/lol/act/img/js/runeList/rune_list.js");
  let result = await res.json();
  rune = result.rune;
}