<script setup>
import {onMounted, ref} from "vue";
import {loadMeasurementsByDate} from "@/services/index.js";
import MeasurementGraph from "@/components/MeasurementGraph.vue";

let data = ref([])
let startDate = ref(new Date())
let endDate = ref(new Date())

onMounted(async () => {
      startDate.value.setMinutes(startDate.value.getMinutes() - 5);
      data.value = await loadMeasurementsByDate('12345', startDate.value, endDate.value)

      window.setInterval(async () => {
        startDate.value = new Date(endDate.value.getTime())
        endDate.value.setSeconds(endDate.value.getSeconds() + 5)
        data.value = await loadMeasurementsByDate('12345', startDate.value, endDate.value)
      }, 1000)

      // every 60 seconds, we reset the data to prevent memory leaks
      // window.setInterval(function () {
      //   resetData()
      //
      //   chartRef.value.updateSeries([{
      //     data
      //   }], false, true)
      // }, 60000)
    }
)

</script>

<template>
  <main>

    <MeasurementGraph :data="data" :loading="false" :current-data="[]"/>
  </main>
</template>
