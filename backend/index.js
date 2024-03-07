const { default: axios } = require("axios");

axios({
    method : "get",
    baseURL : "https://getinvolved.uh.edu/api/discovery/event/search",
    params : {
        "themes[0]" : "Social"
    }
}).then(result => {
    console.log(result.data.value)
})