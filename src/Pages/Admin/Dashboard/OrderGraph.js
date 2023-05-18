import React from 'react'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

function OrderGraph({ placed, shipped, delivered, title }) {

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Placed',
        data: [placed],
        backgroundColor: '#EBD060',
        borderColor: 'black',
        borderWidth: 1
      },
      {
        label: 'Shipped',
        data: [shipped],
        backgroundColor: '#5ADB96',
        borderColor: 'black',
        borderWidth: 1
      },
      {
        label: 'Delivered',
        data: [delivered],
        backgroundColor: '#F55E47',
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

export default OrderGraph