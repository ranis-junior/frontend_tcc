<script setup>

import {ref, watch} from "vue";

const props = defineProps({
  data: {
    required: true,
    type: Array
  },
  loading: Boolean
})

let voltageData = []
let currentData = []

let series = [
  {
    name: 'Tensão',
    data: voltageData
  },
  {
    name: 'Corrente',
    data: currentData
  }
]
watch(() => props.data, (newState, _) => {
  if ((voltageData !== null && voltageData.length > 0)) {
    if (voltageData.length > 800) {
      voltageData = voltageData.slice(200, voltageData.length)
      currentData = currentData.slice(200, currentData.length)

      chartRef.value.updateSeries([
        {
          name: 'Tensão',
          data: voltageData,
        },
        {
          name: 'Corrente',
          data: currentData
        }
      ], false, true)
    }
    let lastData = voltageData[0];

    let newVoltageData = newState.filter(e => e.date > lastData.x).map(e => ({x: e.date, y: e.voltage}))
    for (let data of newVoltageData) {
      voltageData.unshift(data)
    }

    let newCurrentData = newState.filter(e => e.date > lastData.x).map(e => ({x: e.date, y: e.current}))
    for (let data of newCurrentData) {
      currentData.unshift(data)
    }


    chartRef.value.updateSeries([
      {
        name: 'Tensão',
        data: voltageData
      },
      {
        name: 'Corrente',
        data: currentData
      }
    ])

  } else {
    voltageData = newState.map(e => ({x: e.date, y: e.voltage}))
    currentData = newState.map(e => ({x: e.date, y: e.current}))

    series = [
      {
        name: 'Tensão',
        data: voltageData.slice()
      },
      {
        name: 'Corrente',
        data: currentData.slice()
      }
    ]
  }
})

const chartRef = ref(null)

let chartOptions = {
  chart: {
    id: 'realtime',
    height: 350,
    dropShadow: {
      enabled: true,
      color: '#952222',
      top: 18,
      left: 7,
      blur: 6,
      opacity: 0.2
    },
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  colors: ['#ea2525', '#e4d020'],
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Tensão X Corrente',
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#1c1717', 'transparent'],
      opacity: 0.5
    },
  },
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
    },
    position: 'bottom',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    tooltip: {
      enabled: false,
    },
    range: 5 * 60 * 1000,
  },
  yaxis: {
    title: {
      text: 'Valor Medido'
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      formatter: function (val) {
        return val === undefined ? 0 : val.toFixed(2) + 'V';
      }
    },
    min: 0,
    max: 15
  },
  legend: {
    showForSingleSeries: true,
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5
  },
}


// function resetData() {
//   // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
//   data = data.slice(data.length - 10, data.length);
// }

</script>

<template>
  <apexchart
      v-if="!loading"
      ref="chartRef"
      height="350"
      type="line"
      :options="chartOptions"
      :series="series"
  ></apexchart>
</template>

<style scoped>

</style>