import { errorLog } from "./logger.js";


const errorService = {

    manage(err, req, res, next) {
        errorLog.error({
          url: req.url,
          method: req.method,
          message: `${err}`
        });
    }
}


export default errorService;