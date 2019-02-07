

// const axios = require('axios');
// const cheerio = require('cheerio');

// const url = 'http://www.nytimes.com/section/business'

// axios.get(url)
// .then(response => {
//     console.log(reponse.data);
// })
// .catch(error => {
//     console.log(error)
// })

// let getData = html => {
//     data =[];
//     const $ = cheerio.load(html);
//     $('div.css-1cp3ece').each((i, element) => {
//         data.push({
//             title: $(element).find("h2.css-1dq8tca").text(),
//             link: "https;//www.nytimes.com/section/business" + $(element).find('a').attr('href')
//         })
//     })
// }

// getData(respons.data)




const bubblesdata = {
    tasks: {
        'task-1': {id: 'task-1', content:"How Google Protected...", link:"https://www.nytimes.com/2018/10/25/technology/google-sexual-harassment-andy-rubin.html"},
        'task-2': {id: 'task-2', content:"Just Who Has Seen ‘Roma’?", link:"https://www.nytimes.com/2019/02/06/business/media/roma-netflix-viewers.html"},
        'task-3': {id: 'task-3', content:"The New York Times Co...", link:"https://www.nytimes.com/2019/02/06/business/media/new-york-times-earnings-digital-subscriptions.html"},
        'task-4': {id: 'task-4', content:"E.U. Blocks Siemens-Alstom...", link:"https://www.nytimes.com/2019/02/06/business/eu-siemens-alstom-train.html"},
        'task-5': {id: 'task-5', content:"Video Game Stocks...", link:"https://www.nytimes.com/2019/02/06/business/dealbook/electronic-arts-take-two-fortnite-earnings.html"},
        'task-6': {id: 'task-6', content:"With Savings to Burn", link:"https://www.nytimes.com/2019/02/06/business/russia-economy.html"},
        'task-7': {id: 'task-7', content:"‘If Bobbie Talks, ", link:"https://www.nytimes.com/2018/11/28/business/les-moonves-bobbie-phillips-marv-dauer-cbs-severance.html"},
        'task-8': {id: 'task-8', content:"Delay, Deny and Deflect", link:"https://www.nytimes.com/2018/11/14/technology/facebook-data-russia-election-racism.html"},
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'HOT NEWS',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
        },

        'column-2': {
            id: 'column-2',
            title: 'Read Later',
            taskIds: ['task-6', 'task-7', 'task-8'],
        },
    },

    //added, because we just added more columns.

    columnOrder: ['column-1', 'column-2'],
};

export default bubblesdata
