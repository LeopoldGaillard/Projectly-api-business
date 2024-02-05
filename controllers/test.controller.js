/**
 * HTTP request: test for public content
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
const accessPublic = (req, res) => {
    res.status(200).send("Public content.");
}

/**
 * HTTP request: test for authenticated content
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
const accessAuthenticated = (req, res) => {
    res.status(200).send("Authenticated content.");
}

/**
 * HTTP request: test for personnal content
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
const accessMyContent = (req, res) => {
    res.status(200).send("Personnal content.");
}

/**
 * HTTP request: test for admin content
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
const accessAdmin = (req, res) => {
    res.status(200).send("Admin content.");
}

module.exports = {
    accessPublic,
    accessAuthenticated,
    accessMyContent,
    accessAdmin
};