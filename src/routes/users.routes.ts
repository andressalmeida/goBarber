import {Router} from 'express';
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()


usersRouter.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body

        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name,
            email,
            password
        })

        delete user.password
        
        return res.json(user);

    } catch (err: any) {
        return res.status(404).json({ error: err.message });
    }
});

export default usersRouter;