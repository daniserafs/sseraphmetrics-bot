require('dotenv').config()
const TwitterLite = require('twitter-lite')


const app = new TwitterLite({
    version: "2",
    extension: false,
    bearer_token: process.env.BEARER_TOKEN,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_SECRET,
    consumer_key: process.env.CONS_KEY,
    consumer_secret: process.env.CONS_SECRET
})

let params = {
    max_results: 10,
    'tweet.fields': 'public_metrics',
    'expansions': 'author_id',
    'user.fields' : 'id,username',
    query: '"cc: @sseraphini" -is:reply -is:retweet' // will get tweets that arent replys or retweets from danielaserafim
}


async function main() {
 const {meta, data, includes }  = await app.get('tweets/search/recent', params) 
 
 const metricValues = data.map(function(data){
     return data.public_metrics
 })
 const totalAmount = metricValues.map(function(metricValue){
     return  metricValue.retweet_count + metricValue.reply_count + metricValue.like_count + metricValue.quote_count
 })
 const maxResult = Math.max(...totalAmount)
 const index = totalAmount.indexOf(maxResult)
 const mostInteractedTweet = data[index]

 // TODO: post the top3 most interacted tweet
 // const { data } = await user.post('statuses/update', {status: status})

console.log(mostInteractedTweet) 
}


main().catch(error => {
    console.log(error)
})

