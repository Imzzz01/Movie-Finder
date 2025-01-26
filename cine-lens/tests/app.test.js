//app test.js
const $ = require('jquery');

// mocking localStorage
beforeEach(() => {
    global.localStorage = {

    
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
     
};


    $.ajax = jest.fn();

});


test('dark mode toggle works', () => {
    localStorage.setItem('dark-mode', 'enabled');

require('../javascript/script.js');

expect($('body').hasClass('dark-mode')).toBe(true);
expect($('#dark-mode-toggle').text()).toBe('Light Mode');
});

test('toggleFavorite adds/removes favorites correctly', () => {
    const imdbID = 'tt1234567';
    const title = 'Movie Title';

localStorage.setItem('favorites', JSON.stringify([]));

require('../javascript/script.js') 
toggleFavorite(imdbID, title);

let favorites = JSON.parse(localStorage.getItem('favorites'));
expect(favorites.length).toBe(1);
expect(favorites[0].imdbID).toBe(imdbID);

toggleFavorite(imdbID, title);

favorites = JSON.parse(localStorage.getItem('favorites'));
expect(favorites.length).toBe(0);
});

test('searchMovie makes API request', () => {
    const query ='Harry Potter';

    $.ajax.mockImplementationOnce((options) =>{
        options.success({Response: 'True', Search: []});

    });

require('../javascript/script.js');
$('#movie-search').val(query);
$('#search-btn').click();

expect($.ajax).toHaveBeenCalledWith(expect.objectContaining({
    url: 'https://www.omdbapi.com/',
    data: expect.objectContaining({s: query, apikey: '2fee485b'})
}));
});