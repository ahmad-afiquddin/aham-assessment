<script setup lang="ts">
import ApexCharts from "vue3-apexcharts";

interface Props {
  dates: string[];
  values: number[];
  dataTitle: string;
  title: string;
}

const props = defineProps<Props>();

const series = [
  {
    name: props.dataTitle,
    data: props.values,
  },
];
const chartOptions = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: props.title,
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: props.dates,
  },
};
</script>

<template>
  <ClientOnly>
    <ApexCharts
      class="chart"
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </ClientOnly>
</template>

<style lang="scss">
.chart {
  font-family: var(--text-secondary) !important;
  .apexcharts-canvas {
    * {
      font-family: var(--text-secondary) !important;
    }
  }
}
</style>
