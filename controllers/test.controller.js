accessPublic = (req, res) => {
    res.status(200).send("Public content.")
}

accessAuthenticated = (req, res) => {
    res.status(200).send("Authenticated content.")
}

accessMyContent = (req, res) => {
    res.status(200).send("Personnal content.")
}

accessAdmin = (req, res) => {
    res.status(200).send("Admin content.")
}

module.exports = {
    accessPublic,
    accessAuthenticated,
    accessMyContent,
    accessAdmin
}