export function getImage(event) {
    if (!event) return
    let themeKey = event?.theme.toLowerCase()

    if (themeKey === "communityservice") {
        themeKey = "service"
    } else if (themeKey === "thoughtfullearning") {
        themeKey = "learning"
    }

    let imagePath = `https://static.campuslabsengage.com/discovery/images/events/${themeKey}.jpg`

    if (event.imagePath) {
        imagePath = `https://se-images.campuslabs.com/clink/images/${event.imagePath}?preset=med-w`
    }

    return imagePath
}