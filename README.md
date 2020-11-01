# OTUpload
This will help you set up a cronjob that will trigger a script that triggers an aws-upload back up of your OriginTrail node. You will receive a Push notification whenever the trigger script completes or fails. If the upload trigger does fail, the notification will include log statements to identify the issue. THIS WILL NOT ALERT YOU IF THE BACKUP PROCESS FAILED, ONLY IF IT FAILED TO TRIGGER.
<br><br>
Follow the isntructions provided by the team here: https://knowledge-base.origintrail.io/en/articles/4255355-how-to-setup-auto-backup-script-which-uploads-data-to-amazon-s3-instance . For step 2/3 in the instructions, use this script instead of creating a new bash script.
<br><br>
Install the 'Notify My Device' app from the app store and install it onto your mobile device.
<br><br>
Navigate to https://www.notifymydevice.com/ and create an account. Go to 'My applications' and create an application. Copy the API key and save it for later.

------------------------------------------------------------------------------------------------------------------------------------------------------------------

On your node:<br>
Install npm, nodejs
<ul>
<li>sudo apt install npm</li>
<li>sudo apt install nodejs</li>
</ul>

Edit your environment variables inside of your directory and add your API key and change your node name.
<ol>
<li>Sudo nano .env</li>
<li>Edit the variables below</li>
</ol>

APIKEY=*Push notifcation api here*<br>
NODENAME=*node name here*<br>
AWSACCESSKEYID=*aws access key id here*<br>
AWSSECRETACCESSKEY=*aws secret access key here*<br>
AWSBUCKETNAME=*aws bucket name here*<br>

Add a Cron job to the bottom of your crontab to trigger the script. Test running the command before adding it to your crontab.
<ol>
<li>Sudo nano /etc/crontab</li>
<li>Edit and Paste the command below to the end of your crontab. The setting below will trigger the upload once a day at 8pm est.</li>
</ol>

0 0 * * 0 root cd ~/path/to/my/script/ && node upload.js
