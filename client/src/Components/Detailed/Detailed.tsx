import axios from 'axios'
import s from './Detailed.module.scss'
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Scatter } from 'react-chartjs-2';


import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);
interface BorderI {
    officialName: string,
    countryCode: string
}
interface FlagI {
    name: string,
    flag: string
}
interface PopulationCountsI {
    year: number,
    value: number
}
interface DataI {
    borders: {
        borders: BorderI[],
        officialName: string
    },
    countryPopulation: PopulationCountsI[],
    flag: FlagI
}
// const options = {
//     scales: {
//       x: {
//         type: 'linear',
//         position: 'bottom',
//       },
//     },
//   };
export const Detailed = () => {
    const [data, setData] = useState<DataI | null>(null)

    const { code } = useParams()
    const navigate = useNavigate()
    console.log(code)
    console.log(data)

    const data2 = {
        datasets: [
          {
            label: 'Population',
            data: data?.countryPopulation?.map((item) => {
                return {
                    x: item.value, y: item.year
                }
            }),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      };
    useEffect(() => {
        const getOne = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/countries/${code}`)
                setData(data)
            } catch (err) {
                console.log(err)
            }
        }
        getOne()
    }, [code])
    return (
        <>
            {data ? <div className={s.detailed}>
                <div className={s.topDiv}>
                    <h1>{data.borders.officialName}</h1>
                    <img src={data?.flag?.flag ? data.flag.flag : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_zVthTnf6pja1haHYVbGE6yrEJSnG1KIgQ&s'} alt={data?.flag?.name} />
                </div>
                <div className={s.borders}>
                    <h2>Borders</h2>
                    <ul>
                        {data.borders.borders?.map((item) => <li onClick={() => navigate(`/detailed/${item.countryCode}`)}>{item.officialName}</li>)}
                    </ul>
                </div>
                <Scatter data={data2} />;
            </div> : <h3 style={{textAlign: 'center'}}>Loading...</h3>}
        </>
    )
}