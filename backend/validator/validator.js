const { validationResult, ValidationChain, body } = require('express-validator')

const validate = validations => {
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
  
      const errors = validationResult(req).formatWith(errorFormatter);
      if (errors.isEmpty()) {
        return next();
      }
      
      res.status(400).json({ errors: {form : errors.array() }});
    };
  };


  /**
   *  Funcion para formaterar el validationResult de defecto
   * @param {*} msg mensaje del error
   * @returns 
   */
  const errorFormatter = ({msg}) => {
    return {message : msg}
  }

  module.exports = {validate}