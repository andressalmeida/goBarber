import Appointment from "../models/Appointment"
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository';


interface Request {
    provider: string;
    date: Date,
}

class CreateAppointmentService {
    public async execute({date , provider}: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date);

        const findAppointmentSameDate = await appointmentsRepository.findByDate(appointmentDate);
    
        if(findAppointmentSameDate) {
            throw Error('Appointment already booked')
        };
        
       
        const appointment = appointmentsRepository.create({
            provider, 
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;