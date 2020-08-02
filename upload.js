const { exec } = require("child_process");
const querystring = require('querystring');
const https = require("https");
require('dotenv').config();

var awsbucket = process.env.AWSBUCKETNAME
var awsaccesskeyid = process.env.AWSACCESSKEYID
var awssecretaccesskey = process.env.AWSSECRETACCESSKEY
var upload = 'sudo docker exec otnode node scripts/backup-upload-aws.js --config=/ot-node/.origintrail_noderc --configDir=/ot-node/data --backupDirectory=/ot-node/backup --AWSAccessKeyId='+awsaccesskeyid +' --AWSSecretAccessKey='+awssecretaccesskey+' --AWSBucketName=' + awsbucket

function PushNotification(PushTitle, PushText)
    {
             var apiKey = process.env.APIKEY
             var postdata = querystring.stringify({
                     'ApiKey': apiKey,
                     'PushTitle': PushTitle,
                     'PushText': PushText,
                     });
                     var options = {
                     hostname: 'www.notifymydevice.com',
                     port: 443,
                     path: '/push?',
                     method: 'POST',
                     headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',
                     'Content-Length': postdata.length
                     }
             };

     callback = function (response) {
             var str = '';
                     //another chunk of data has been recieved, so append it to `str`
                             response.on('data', function (chunk) {
                             str += chunk;
                             });
                             //the whole response has been recieved, so we just print it out here
                             response.on('end', function () {
                             console.log('Response: ' + str);
                             });
                     }
             var req = https.request(options, callback);
             req.write(postdata);
             req.end();
             req.on('error', function (e) {
             Log(e);
     });
    }

    exec(upload, (error, upload, stderr) => {
        if (error){
            PushNotification(process.env.NODENAME + " failed to trigger backup script.",error);
        }else{
            PushNotification(process.env.NODENAME + " backup script triggered.",'If your .env configuration was correct, you can check AWS S3 to find your backup.');
        }
    });
