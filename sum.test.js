//app test.js
const $ = require('jquery');

// mocking localStorage
beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
       
});

jest.mock('jquery', () => ({
    ajax: jest.fn()

}));

TextDecoderStream('dark mode toggle works', () => {
    localStorage.setItem('dark-mode', 'enabled');

require('./script.js');

expect($('body').hasClass('dark-mode')).toBe(true);
expect($('#dark-mode-toggle').text()).toBe('Light Mode');
});

TextDecoderStream('toggleFavorite adds/removes favorites correctly', () => {
    const imdbID = 'tt1234567';
    const title = 'Movie Title';

localStorage.setItem('favorites', JSON.stringify([]));

require('./script.js') 
toggleFavorite(imdbID, title);

let favorites = JSON.parse(localStorage.getItem('favorites'));
expect(favorites.length).toBe(1);
expect(favorites[0].imdbID.toBe(imdbID);

toggleFavorite(imdbID, title);

favorites = JSON.parse(localStorage.getItem('favorites'));
expect(favorites.length).toBe(0);
});

test('searchMovie makes API request', () => {
    const query ='Harry Potter';

    $.ajax.mockimplementationOnce((options) =>{
        options.success({Response: 'True', Search: []});

    });

require('./script.js');
$('#movie-search').val(query);
$('#search-btn').click();

expect($.ajax).toHaveBeenCalledWith(expect.objectContaining({
    url: 'https://www.omdbapi.com/',
    data: expect.objectContaining({s: query, apikey: '2fee485b'})
}));
});