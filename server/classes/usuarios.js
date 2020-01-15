class Usuarios  {


    constructor() {

        this.personas = []; // Arreglo de personas que serían las "conectadas" al chat

    }

    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push( persona );

        return this.personas;

    }

    getPersona( id ) {

        let persona = this.personas.filter(  per => {

            return per.id === id; 

        })[0]; // Retorna un arreglo de elementos que cumplen ese id y se obtiene la primera posición (que igual sería único pero es para tener el elemento en si y no un arreglo)

        return persona; // En caso de no encotrarlo será undefined o null

    }

    getPersonas() {

        return this.personas;

    }

    getPersonasPorSala( sala ) {

        // Obtener las personas de una sala en específico
        let personasEnSala = this.personas.filter( persona => {

            return persona.sala === sala // Se agregan si son de la misma sala

        });

        return personasEnSala;

    }

    borrarPersona( id ) {


        let personaBorrada = this.getPersona(id); // Para luego manejar su referencia en algun mensaje

        this.borrarItemDesdeArr( this.personas, personaBorrada );
        /*
        // Nota: normalmente uno lo haria así, pero al recargar la página no alcanza a llamarse y realizarse el filter (en casos reales tendriamso un login lo que haria que tarde en mandarse la señal y funcionar correctamente)
        //por esta razón usamos el método mas "a mano" de arriba

        this.personas.filter( per => {

            return per.id != id;

        }); // Solo quedan en el arreglo los que no tengan el id enviado
        */

        return personaBorrada; // Supone que siempre habrá una persona válida, y no un undefined (ahi habria que manejar el error)

    }

    borrarItemDesdeArr ( arreglo, item ) {
        var i = arreglo.indexOf( item );
     
        if ( i !== -1 ) {
            arreglo.splice( i, 1 );
        }
    }

}




module.exports = {

    Usuarios

};