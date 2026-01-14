const express = require('express');
const os = require('os');
const dns = require('dns');
const getFileContent = require('./read'); 

const app = express();
const PORT = 3000;


app.get('/test', (req, res) => {
    res.send("Test route is working!");
});


app.get('/readfile', (req, res) => {
    const content = getFileContent();
    res.send(content);
});


app.get('/systemdetails', (req, res) => {
    const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2) + " GB";

    res.json({
        platform: os.platform(),
        totalMemory: bytesToGB(os.totalmem()),
        freeMemory: bytesToGB(os.freemem()),
        cpuModel: os.cpus()[0].model,
        cpuCores: os.cpus().length
    });
});


app.get('/getip', (req, res) => {
    const hostname = 'masaischool.com';
    
    dns.lookup(hostname, { all: true }, (err, addresses) => {
        if (err) {
            return res.status(500).json({ error: "Failed to resolve hostname" });
        }
        res.json({
            hostname: hostname,
            addresses: addresses 
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});