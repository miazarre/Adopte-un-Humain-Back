const validation = {
    /**
     * Méthode pour vérifier un objet suivant un schéma JOI
     * @param {*} schema 
     * @param {string} prop - propriété de la requête à tester (req["body"] ou req["query"])
     * @returns 
     */
    check(schema,prop){
        return (req, _, next)=>{
            const {error} = schema.validate(req[prop]); // si j'ai une erreur, le validate retourne un objet au format {error:... , value:...}
        
            if(!error){
                // si tout va bien
                next();
            }
            else{
                // je gère l'erreur
                next(error);
                throw new Error("Schéma non validé !!!");
            }
        };
    }
};

export default validation;