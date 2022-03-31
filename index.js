const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');
const config = require('./config.json');
const fs = require('fs');
const batchFolder = './batches-parth/';
var center = require('center-align');
const appid = {
    "753": "Steam",
    "730": "CS:GO",
    "440": "TF2",
    "252490": "Rust"
}

var numberOfTradesSent = 0;
var bal = []
async function sendTrades() {
    const numberOfBatches = fs.readdirSync(batchFolder).length;
    console.log(`Number of Batches: ${numberOfBatches}.`);
    for (var i = 1; i <= numberOfBatches; i++) {
        console.log(`Boosting Hours of batch : ${i}`);
        var currentBatch = require(`${batchFolder}batch` + i.toString() + '.json').accounts;
        currentBatch.forEach(async(currAcc) => {
            var client = new SteamUser();
          

            const logInOptions = {
                "accountName": currAcc.username,
                "password": currAcc.password,
                "twoFactorCode": SteamTotp.generateAuthCode(currAcc.shared_secret)
            };

            client.logOn(logInOptions);

            client.on('loggedOn', () => {
                console.log("\x1b[92m", '[STEAM] Logged IN: ' + currAcc.username, "\x1b[0m");
                client.setPersona(1);
                client.gamesPlayed(730,440);
            });

        
/*
            client.on("wallet", (hasWallet, currency, balance) => {
                console.log("\x1b[32m", "[", currAcc.username, "]", " wallet Balance: ₹ ", balance);
                bal.push(JSON.stringify({
                    'acc': currAcc.username,
                    'bal': balance
                }))
            });*/
            ;
        })
        
    }
    //console.log(bal);
   
    /*
    fs.writeFile(

        './my.json',
    
        JSON.stringify(bal),
    
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );*/
    
}




sendTrades();

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
