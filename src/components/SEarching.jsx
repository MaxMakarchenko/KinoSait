export const SearchFilm = async (id) => {
    const apiKey = '5a5b7997'
    try{
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
        }

        return response.json()
    }


    catch (err) {
        throw new Error,
        console.log('Ошибка запроса ',  err)
    }
}

