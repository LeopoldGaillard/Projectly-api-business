accessPublic = (req, res) => {
    res.status(200).send("Public content.")
}

accessAuthenticated = (req, res) => {
    res.status(200).send("Authenticated content.")
}

module.exports = {
    accessPublic,
    accessAuthenticated
}