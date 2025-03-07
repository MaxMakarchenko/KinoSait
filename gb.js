import { MongoClient } from 'mongodb';
async function main() {
    const uri = 'mongodb://localhost:27017'; // Замените на ваш URI MongoDB
    const client = new MongoClient(uri);

    try {
        // Подключаемся к клиенту
        await client.connect();

        // Создаем базу данных
        const database = client.db('NEW_DATABASE_NAME');
        // Создаем коллекцию
        const collection = database.collection('NEW_COLLECTION_NAME');

        console.log('База данных и коллекция созданы!');
    } catch (err) {
        console.error('Ошибка при подключении к MongoDB:', err);
    } finally {
        // Закрываем соединение
        await client.close();
    }
}

main().catch(console.error);
