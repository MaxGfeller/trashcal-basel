import { ref } from 'vue'

export default function () {
  const zones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const selectedZone = ref('A')

  const years = ['2024', '2025']
  const selectedYear = ref('2025')

  const useAlarms = ref(true)

  const types = ref({
    'Kehrichtabfuhr': true,
    'Papierabfuhr': true,
    'Grobsperrgut': false,
    'Grünabfuhr': false,
    'Häckseldienst': false,
    'Metallabfuhr': false,
    'Unbrennbares': false
  })

  return {
    zones,
    selectedZone,
    years,
    selectedYear,
    useAlarms,
    types
  }
}