var simplesmtp = require("simplesmtp");
var fs = require("fs");
var SpamFilter = require("./spam-filter")

process.on('uncaughtException', function(err) {
  console.log(new Date())
  console.log('Caught exception: ' + err);
});

function getUuid() {
    return new Date().getTime().toString() + Math.random().toString();
}

var MAILDIR = "/home/augustl/srv/mail/augustl";
var SPAMDIR = MAILDIR + "/.Spam"

var opts = {
    SMTPBanner: "August's SMTP server"
};

var server = simplesmtp.createSimpleServer(opts, function (req) {
    var messageId = getUuid();
    var tempPath = MAILDIR + "/tmp/" + messageId;
    var tempWriteStream = fs.createWriteStream(tempPath);

    var spamFilter = new SpamFilter(function (isSpam, confidence, probability, rawHeader) {
        // TODO: set rawHeader in the mail somehow
        if (isSpam && confidence >= 0.5) {
            fs.rename(tempPath, SPAMDIR + "/new/" + messageId);
        } else {
            fs.rename(tempPath, MAILDIR + "/new/" + messageId);
        }
    });

    req.pipe(tempWriteStream);
    req.pipe(spamFilter.writeStream);

    tempWriteStream.on("finish", function () {
        req.accept(messageId);
    });
})
server.listen(2525);
