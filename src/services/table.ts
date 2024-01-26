export const columns = [
    { data: null, defaultContent: '<input type="checkbox"/>' },
    { data: 'id', title: 'ID' },
    { data: 'title', title: 'Title' },
    { data: 'price', title: 'Price' },
    { data: 'description', title: 'Description' },
    { data: 'category', title: 'Category' },
    { data: 'rating.rate', title: 'Rating' },
    { data: 'rating.count', title: 'Count' },
    { data: null, render: () => `<button class="btn btn-outline-primary">Info</button>` },
]
