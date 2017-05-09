B.Braun OnlineSuite Mobile Push Technology Evaluation
=====================================================

To start either of the services, navigate to the 
corresponding folder and use the command

```
npm install
node index.js
``` 

Install the .apk file from the app folder on the mobile
device, click settings, insert the IP-Adress of the server
machine (needs to be in same network) or the fcm address.
Choose a test protocol and hit start


To send a test message after some while, go into the 
corresponding folder and use the command

```
node cli.js
```

For either technology, the client app should receive the
message "I AM GROOT".


To execute the debug listeners (which only display 
the debug messages from the cli's) for each technology, use

```
node listener.js
```