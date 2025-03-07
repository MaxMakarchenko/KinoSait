import path from 'path';
import { fileURLToPath } from 'url';

// Получаем текущий файл
const __filename = fileURLToPath(import.meta.url);
// Получаем директорию
const __dirname = path.dirname(__filename);

// Выводим имя базовой директории
console.log(path.basename(__dirname));
console.log(path.dirname(__dirname));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

console.log(path.join(__dirname, 'src','main.jsx'));