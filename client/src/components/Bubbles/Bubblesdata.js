const bubblesdata = {
    tasks: {
        'task-1': {id: 'task-1', content:"Web tools", link:"google"},
        'task-2': {id: 'task-2', content:"Wikipedia", link:"www.wikipedia.com"},
        'task-3': {id: 'task-3', content:"Yahoo", link:"www.yahoo.com"},
        'task-4': {id: 'task-4', content:"Facebook", link:"www.facebook.com"},
        'task-5': {id: 'task-5', content:"LinkedIn", link:"www.linkedin.com"},
        'task-6': {id: 'task-6', content:"Instagram", link:"www.instagram.com"},
        'task-7': {id: 'task-7', content:"The New York Times", link:"www.newyorktimes.com"},
        'task-8': {id: 'task-8', content:"CNN", link:"www.cnn.com"},
        'task-9': {id: 'task-9', content:"Seattle Times", link:"www.seattletimes.com"},
        'task-10': {id: 'task-10', content:"Politico", link:"www.google.com"},
        'task-11': {id: 'task-11', content:"Internet Movie Database", link:"www.google.com"},
        'task-12': {id: 'task-12', content:"All Music Guide", link:"www.google.com"},
        'task-13': {id: 'task-13', content:"Airbnb", link:"www.google.com"}
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Links',
            taskIds: ['task-1', 'task-2', 'task-3'],
        },

        'column-2': {
            id: 'column-2',
            title: 'Social Media',
            taskIds: ['task-4', 'task-5', 'task-6'],
        },

        'column-3': {
            id: 'column-3',
            title: 'News Sources',
            taskIds: ['task-7', 'task-8', 'task-9', 'task-10'],
        },

        'column-4': {
            id: 'column-4',
            title: 'Fun Stuff',
            taskIds: ['task-11', 'task-12', 'task-13'],
        },

    },

    //added, because we just added more columns.

    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default bubblesdata