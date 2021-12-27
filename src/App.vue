<template>
  <div class="max-w-2xl p-4 lg:p-0 mx-auto mt-12">
    <h1 class="text-2xl">Abfuhrtermine Basel</h1>
    <div class="mt-8">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-900">Jahr</h2>
      </div>

      <fieldset class="mt-2">
        <legend class="sr-only">
          Wähle ein Jahr
        </legend>
        <div class="grid grid-cols-4 gap-3 sm:grid-cols-8">
          <label
            v-for="year in years"
            :key="year"
            class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none"
            :class="{
              'bg-white border-gray-200 text-gray-900 hover:bg-gray-50': year !== selectedYear,
              'bg-indigo-600 border-transparent text-white hover:bg-indigo-700': year === selectedYear,
            }"
          >
            <input
              type="radio"
              v-model="selectedYear"
              name="memory-option"
              :value="year"
              class="sr-only"
              aria-labelledby="memory-option-0-label"
            >
            <p id="memory-option-0-label">
              {{ year }}
            </p>
          </label>

          <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 opacity-25 cursor-not-allowed">
            <input type="radio" name="memory-option" value="128 GB" disabled class="sr-only" aria-labelledby="memory-option-5-label">
            <p id="memory-option-5-label">
              2022
            </p>
          </label>
        </div>
      </fieldset>
    </div>
    <div class="mt-8">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-900">Zone</h2>
        <a class="text-sm text-indigo-600" href="https://map.geo.bs.ch/?lang=de&baselayer_ref=Grundkarte%20farbig&map_x=2611169.25&map_y=1267226.5&map_zoom=5&tree_group_layers_Abfuhrzonen_Basel=AF_AbfuhrzoneGemeindeBasel&tree_groups=Abfuhrzonen_Basel" target="_blank">Zonenplan</a>
      </div>

      <fieldset class="mt-2">
        <legend class="sr-only">
          Wähle eine Zone
        </legend>
        <div class="grid grid-cols-4 gap-3 sm:grid-cols-8">
          <label
            v-for="(zone, index) in zones"
            :key="zone"
            class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none"
            :class="{
              'bg-white border-gray-200 text-gray-900 hover:bg-gray-50': zone !== selectedZone,
              'bg-indigo-600 border-transparent text-white hover:bg-indigo-700': zone === selectedZone,
            }"
          >
            <input
              type="radio"
              v-model="selectedZone"
              name="memory-option"
              :value="zone"
              class="sr-only"
              :aria-labelledby="`memory-option-${index}-label`"
            >
            <p :id="`memory-option-${index}-label`">
              {{ zone }}
            </p>
          </label>
        </div>
      </fieldset>
    </div>

    <fieldset class="mt-8">
      <legend class="text-sm font-medium text-gray-900">Art</legend>
      <div class="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
        <div
          v-for="type in Object.keys(types)"
          :key="type"
          class="relative flex items-start py-4"
        >
          <div class="min-w-0 flex-1 text-sm">
            <label :for="`art-${type}`" class="font-medium text-gray-700 select-none">{{ type }}</label>
          </div>
          <div class="ml-3 flex items-center h-5">
            <input :id="`art-${type}`" v-model="types[type]" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
          </div>
        </div>
      </div>
    </fieldset>

    <div class="mt-8 flex items-center">
      <button
        @click="useAlarms = !useAlarms"
        type="button"
        class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :class="{
          'bg-indigo-600': useAlarms,
          'bg-gray-200': !useAlarms,
        }"
        role="switch"
        :aria-checked="useAlarms"
        aria-labelledby="annual-billing-label"
      >
        <span
          aria-hidden="true"
          class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          :class="{
            'translate-x-5': useAlarms
          }"
        ></span>
      </button>
      <span class="ml-3" id="annual-billing-label">
        <span class="text-sm font-medium text-gray-900">Erinnerung </span>
        <span class="text-sm text-gray-500">(Am Abend zuvor)</span>
      </span>
    </div>


    <button @click="exportEvents()" type="button" class="mt-8 inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <svg class="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      Zu Kalender hinzufügen
    </button>

    <div class="mt-20 mb-4 flex justify-center">
      <span class="text-sm text-gray-600">Made with ❤️ by <a class="font-semibold" href="https://www.maxgfeller.com" target="_blank">Max Gfeller</a></span>
    </div>
  </div>
</template>

<script setup>
import useData from './composables/useData'
import useCal from './composables/useCal'

const { zones, selectedZone, years, selectedYear, useAlarms, types } = useData()
const { downloadEvents } = useCal()

const exportEvents = async () => {
  const filteredTypes = Object.keys(types.value).filter(type => types.value[type])

  const allRecords = await Promise.all(filteredTypes.map(async (type) => {
    const result = await fetch(`https://data.bs.ch/api/records/1.0/search/?dataset=100096&sort=termin&facet=termin&refine.zone=${selectedZone.value}&refine.termin=${selectedYear.value}&refine.art=${encodeURIComponent(type)}&rows=500`)
    const data = await result.json()
    return data.records
  }))

  downloadEvents(allRecords.flat().map((record) => ({
    start: [...record.fields.termin.split('-').map(number => parseInt(number)), 6, 0],
    duration: { minutes: 10 },
    title: record.fields.art,
    alarms: useAlarms.value ? [{
      action: 'audio',
      description: 'Abfall rausstellen',
      trigger: { hours: 12, before: true },
      attachType:'VALUE=URI',
      attach: 'Glass'
    }] : []
  })))
}
</script>
