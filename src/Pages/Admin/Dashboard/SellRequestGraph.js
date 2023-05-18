import React from 'react'
import { Chart as chartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
chartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

function SellRequestGraph({ pending, accepted, rejected, shipped, received, title }) {

    const data = {
        labels: [''],
        datasets: [
            {
                label: 'Pending',
                data: [pending],
                backgroundColor: '#EBD060',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Accepted',
                data: [accepted],
                backgroundColor: '#5ADB96',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Rejected',
                data: [rejected],
                backgroundColor: '#F55E47',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Shipped',
                data: [shipped],
                backgroundColor: 'yellow',
                borderColor: 'black',
                borderWidth: 1
            },
            {
                label: 'Received',
                data: [received],
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    }

    const options = {

    }
    return (
        <div>
            <h5>{title}</h5>

            <div>
                <Bar

                    data={data}
                    options={options}
                ></Bar>
            </div>
        </div>
    )
}


export default SellRequestGraph