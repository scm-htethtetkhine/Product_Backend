const checkApiKey = (req, res, next) => {
    const apiKey = req.headers["otmm-api-key"]
    const validKey = "KoaderMaster";

    if ( apiKey && apiKey === validKey ) {
        next();
    } else {
        res.status(401).json({ message: "Invalid API Key" })
    }
};

module.exports = checkApiKey;