import * as fs from 'node:fs/promises';
import { open } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущий файл
const __filename = fileURLToPath(import.meta.url);
// Получаем директорию
const __dirname = path.dirname(__filename);

// try {
//     await fs.mkdir(path.join(__dirname, 'users'));
//     console.log("Папка была создана");
// } catch (err) {
//     console.error('Ошибка при создании папки:', err.message);
// }


// try {
//     await fs.writeFile(path.join(__dirname, 'users', 'films.txt'), 'рnmmmр');
//     console.log('Файл изменен');
// } catch (err) {
//     console.error('Ошибка при записи файла:', err);
// }

async function ApdateFile() {
    const FsWrite = path.join(__dirname, 'users', 'films.txt')
    const NewContent = "fffffffff"

    try {
        // Читаем текущее содержимое файла
        const currentContent = await fs.readFile(FsWrite, 'utf8');

        // Сравниваем текущее содержимое с новым
        if (currentContent !== NewContent) {
            // Если содержимое изменилось, записываем новое содержимое
            await fs.writeFile(FsWrite, NewContent);
            console.log('Файл изменен');
        } else {
            console.log('Содержимое файла не изменилось');
        }
    } catch (err) {
        // Если файл не существует, создаем его и записываем новое содержимое
        if (err.code === 'ENOENT') {
            await fs.writeFile(FsWrite, NewContent);
            console.log('Файл создан и содержимое записано');
        } else {
            console.error('Ошибка при работе с файлом:', err);
        }
    }
}
ApdateFile();