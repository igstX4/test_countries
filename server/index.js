import express from 'express';
import countriesRouter from './routes/Countries.route.js';
import cors from 'cors'


const router = express()

router.use(express.json())
router.use(cors())

router.listen(4000, () => {
    console.log('Server OK')
})

router.use('/countries', countriesRouter)