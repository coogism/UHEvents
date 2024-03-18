const { default: axios } = require("axios");

axios({
    method : "get",
    baseURL : "https://getinvolved.uh.edu/api/discovery/event/search",
    params : {
        "themes[0]" : "Social"
    }
}).then(event_results => {
    const eventData = event_results.data

    const eventName = eventData.name
    const orgName = eventData.organizationName
    const description = eventData.description

    const startTime = eventData.startsOn // in iso time
    const endTime = eventData.endsOn // in iso time

    const eventTheme = eventData.theme
})



// event_results.foreach(event => {
//     // console.log()
// })