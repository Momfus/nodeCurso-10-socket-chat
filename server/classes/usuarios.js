class Usuarios  {


    constructor() {

        this.personas = []; // Arreglo de personas que serían las "conectadas" al chat

    }

    agregarPersona(id, nombre) {

        let persona = {
            id,
            nombre
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

    }

    borrarPersona( id ) {


        let personaBorrada = this.getPersona(id); // Para luego manejar su referencia en algun mensaje

        this.personas.filter( per => {

            return per.id != id;

        }); // Solo quedan en el arreglo los que no tengan el id enviado

        return personaBorrada; // Supone que siempre habrá una persona válida, y no un undefined (ahi habria que manejar el error)

    }



}


module.exports = {

    Usuarios

};