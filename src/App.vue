<template>
  <div class="max-w-2xl p-4 lg:p-0 mx-auto mt-12">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Abfuhrtermine Basel</h1>
      <a href="https://www.github.com/MaxGfeller/trashcal-basel" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-900 hover:text-gray-700 transition-colors duration-150 fill-current" viewBox="0 0 512 512"><title>MaxGfeller/trashcal-basel</title><path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z"/></svg>
      </a>
    </div>
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
            v-for="(year, index) in years"
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
              name="year-option"
              :value="year"
              class="sr-only"
              :aria-labelledby="`year-option-${index}-label`"
            >
            <p :id="`year-option-${index}-label`">
              {{ year }}
            </p>
          </label>

          <!-- <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 opacity-25 cursor-not-allowed">
            <input type="radio" name="year-option" value="2022" disabled class="sr-only" aria-labelledby="year-option-5-label">
            <p id="year-option-5-label">
              2022
            </p>
          </label> -->
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
              name="zone-option"
              :value="zone"
              class="sr-only"
              :aria-labelledby="`zone-option-${index}-label`"
            >
            <p :id="`zone-option-${index}-label`">
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
            <label :for="`type-${type}`" class="font-medium text-gray-700 select-none">{{ type }}</label>
          </div>
          <div class="ml-3 flex items-center h-5">
            <input :id="`type-${type}`" v-model="types[type]" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
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
        aria-labelledby="alarms-label"
      >
        <span
          aria-hidden="true"
          class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          :class="{
            'translate-x-5': useAlarms
          }"
        ></span>
      </button>
      <span class="ml-3" id="alarms-label">
        <span class="text-sm font-medium text-gray-900">Erinnerung </span>
        <span class="text-sm text-gray-500">(Am Abend zuvor)</span>
      </span>
    </div>


    <button @click="exportEvents()" type="button" class="mt-8 inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <svg class="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      Zu Kalender hinzufügen
    </button>

    <div class="mt-20 mb-4 flex justify-center space-x-4">
      <span class="text-sm text-gray-600">Made with ❤️ by <a class="font-semibold" href="https://www.maxgfeller.com" target="_blank">Max Gfeller</a></span>
      <span class="text-sm text-gray-300">|</span>
      <span class="text-sm text-gray-600">Data provided by <a class="font-semibold" href="https://data.bs.ch/explore/dataset/100096" target="_blank">Open Data BS</a></span>
    </div>
  </div>
</template>

<script setup>
import useData from './composables/useData'
import useURL from './composables/useURL'
import useCal from './composables/useCal'

const { zones, selectedZone, years, selectedYear, useAlarms, types } = useData()
const { buildURL } = useURL()
const { downloadEvents } = useCal()

const exportEvents = async () => {
  const filteredTypes = Object.keys(types.value).filter(type => types.value[type])

  const allRecords = await Promise.all(filteredTypes.map(async (type) => {
    const url = buildURL({
      zone: selectedZone.value,
      date: selectedYear.value,
      type
    })
    const result = await fetch(url)
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
