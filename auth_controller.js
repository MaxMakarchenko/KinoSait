import User from './user.js'
import Role from './role.js'
class authController {
    async registration(req, res) { // Исправлено на "registration"
        try {
           const{username, password} = req.body
           const candidate = await User.findOne({username})
           if(candidate){
            return res.status(400).json({ message: 'Такой пользователь уже существует' });

           }
           const user = new User({username, })
            res.send('User registered'); // Пример ответа
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при регистрации' });
        }
    }

    async login(req, res) {
        try {
            // Логика входа
            res.send('User logged in'); // Пример ответа
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при входе' });
        }
    }

    async getUsers(req, res) {
        try {
            
            res.json("server working");
        } catch (e) {
            res.status(500).json({ message: 'Ошибка при получении пользователей' });
        }
    }
}

// Создаем экземпляр класса
const controller = new authController();

// Экспортируем экземпляр
export default controller;
