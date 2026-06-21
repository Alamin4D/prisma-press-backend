import app from "./app";
const port = process.env.PORT || 3000

const main = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main();