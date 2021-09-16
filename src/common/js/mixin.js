export const searchMixin = {
    data() {
        return {
          value: '',
          query: '',
          searchHistory: [],
          hotKey: [],
          pageBack: 1,
        };
    }, 
    computed: {

    },
    methods: {
        onSearch(val) {
          console.log(val);
          this.query = val.trim()
          this.searchHistory.unshift(this.query)
          console.log(this.searchHistory);
        },
        // search(val) {
        //   this.query = val.trim()
        //   // console.log(this.query);
        //   console.log(this.query);
        //   // 发请求
        // },
      
    },
}