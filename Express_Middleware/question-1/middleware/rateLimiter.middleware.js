const requestCounts = {};

const rateLimiter = (req, res, next) => {
    const userIp = req.ip;
    const currentTime = Date.now();

    if (!requestCounts[userIp]) {
        requestCounts[userIp] = { count: 1, startTime: currentTime };
        return next();
    }

    const { count, startTime } = requestCounts[userIp];

    if (currentTime - startTime < 60000) {
        if (count >= 15) {
            return res.status(429).json({ error: "Too many requests, please try again later" });
        }
        requestCounts[userIp].count++;
    } else {
        requestCounts[userIp] = { count: 1, startTime: currentTime };
    }
    next();
};

module.exports = rateLimiter;