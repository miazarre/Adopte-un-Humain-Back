const validation = {
    /**
     * Méthode pour vérifier un objet suivant un schéma JOI
     * @param {*} schema 
     * @param {string} prop - propriété de la requête à tester (req["body"] ou req["query"])
     * @returns 
     */
    check(schema,prop){
        return (req, res, next)=>{
            // console.log("erreur joi : ", schema.validate(req[prop]));
            const {error} = schema.validate(req[prop]); // si j'ai une erreur, le validate retourne un objet au format {error:... , value:...}
            // console.log("erreur joi : ", error);
        
            if(!error){
                // si tout va bien
                next();
            }
            else{
                // je gère l'erreur
                res.status(400).send({ message: error.details[0].message });
                next(error);
                throw new Error("Schéma non validé !");                
            }
        };
    }
};

export default validation;