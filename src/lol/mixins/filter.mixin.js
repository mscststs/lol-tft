import { seconds2str, formatTime } from "../utils"

export default {
  filters:{
    time(val) {
      return seconds2str(val);
    },
    date(value) {
      if (!value) return '';
      return formatTime(new Date(parseInt(value)));
    },
    gameScore(value){
      if(!value) return '';
      return (value / 10000).toFixed(1);
    }
    
  }
}