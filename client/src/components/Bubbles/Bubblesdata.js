const bubblesdata = {
    tasks: {
        'task-1': {id: 'task-1', content:"take out the garbagae"},
        'task-2': {id: 'task-2', content:"watch my fav show"},
        'task-3': {id: 'task-3', content:"I want to play"},
        'task-4': {id: 'task-4', content:"Don't want to do this anymore"},
        'task-5': {id: 'task-5', content:"This is going to be great"},
        'task-6': {id: 'task-6', content:"Yay! for this"},
        'task-7': {id: 'task-7', content:"Can't wait to be done"}
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'LINK 1',
            taskIds: ['task-1', 'task-2', 'task-3'],
        },

        'column-2': {
            id: 'column-2',
            title: 'LINK 2',
            taskIds: ['task-4'],
        },

        'column-3': {
            id: 'column-3',
            title: 'LINK 3',
            taskIds: ['task-5', 'task-6'],
        },

        'column-4': {
            id: 'column-4',
            title: 'LINK 4',
            taskIds: ['task-7'],
        },

    },

    //added, because we just added more columns.

    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default bubblesdata