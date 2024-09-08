import {Router} from 'express'
import * as countryService from '../services/Countries.service.js'



const countriesRouter = Router()


// coursesRouter.get('', CourseController.getAllCourses)
countriesRouter.get('', countryService.getAllCountries)
countriesRouter.get('/:code', countryService.getOneCountry)



export default countriesRouter