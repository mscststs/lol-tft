export default {
  props:[
    "area",
    "accountType",
    "id"
  ],
  computed: {
    userInfo(){
      return {
        area: this.area,
        accountType: this.accountType,
        id: this.id
      }
    },
    rqOptions(){
      return {
        account_type: parseInt(this.accountType),
        area: parseInt(this.area),
        id: "" + this.id,
        from_src: "lol_helper"
      }
    }
  }
}