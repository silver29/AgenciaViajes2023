import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    // Validar...
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        //console.log('El nombre está vacío');
        errores.push({ mensaje : 'El nombre está vacío'});
    }

    if(correo.trim() === ''){
        //console.log('El Correo está vacío');
        errores.push({ mensaje : 'El correo está vacío'});
    }

    if(mensaje.trim() === ''){
        //console.log('El Mensaje está vacío');
        errores.push({ mensaje : 'El mensaje está vacío'});
    }

    //console.log(req.body);
    console.log(errores);

    if(errores.length > 0) {

        // Consultar Testimoniales Existentes 
        const testimoniales = await Testimonial.findAll();

        //Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores, 
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenarlo en la base de datos 
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');

        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimonial
}