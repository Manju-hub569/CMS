const Authenticate = async (req, res, next) => {
    try {
        const tokens = req.cookies.name;
        req.tokens = tokens;
        next();
    }catch(e) {
        res.status(401).send('unotherised');
    }
}

module.exports = Authenticate;