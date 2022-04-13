import {Router} from 'express';
import {v4 as uuid} from 'uuid';
import { startOfHour, parseISO} from 'date-fns'

const appointmentsRouter = Router()

const appointments = [];

appointmentsRouter.post('/', (req, res) => {
    const {provider, date} = req.body;

    const parsedDate = startOfHour(parseISO(date))
    
    const appointment = {
        id: uuid(),
        provider,
        date: parsedDate
    }; 

    appointments.push(appointment)

    return res.json(appointment)
});

export default appointmentsRouter;