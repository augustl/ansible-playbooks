var spawn = require('child_process').spawn;

function concBuff(bufs) {
    return Buffer.concat(bufs).toString("utf8");
}

function concStream(stream) {
    var result = [];
    stream.on("data", function (data) {
        result.push(data);
    });
    return result;
}

function SpamFilter(cb) {
    var dspam = spawn("dspam", ["--mode=teft", "--user=augustl", "--classify"]);

    var stdOut = concStream(dspam.stdout);
    var stdErr = concStream(dspam.stderr);

    dspam.on("close", function (code) {
        if (code === 0) {
            var rawResult = concBuff(stdOut);
            console.log(rawResult);
            var result = rawResult.slice(16).split("; ").reduce(function (res, entry) {
                var pieces = entry.split("=");
                res[pieces[0]] = pieces[1];
                return res;
            }, {});

            cb(
                result["result"] === '"Spam"',
                parseFloat(result.confidence, 10),
                parseFloat(result.probability, 10),
                rawResult);
        } else {
            console.log("Unknown error occurred, code " + code);
            console.log(concBuf(stdErr));
        }
    });

    this.writeStream = dspam.stdin;
    this.readStream = dspam.stdout;
};
module.exports = SpamFilter;
