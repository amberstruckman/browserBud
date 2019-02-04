const bubblesdata = {
    tasks: {
        'task-1': {id: 'task-1', content:"take out the garbagae"},
        'task-2': {id: 'task-2', content:"watch my fav show"},
        'task-3': {id: 'task-3', content:"I want to play"},
        'task-4': {id: 'task-4', content:"Don't want to do this anymore"}
    },

    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Do this today',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
    },

    columnOrder: ['column-1'],
};

export default bubblesdata