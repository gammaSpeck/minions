<script setup lang="ts">
import { ref } from "vue";
import type { FloorInfo, FloorSplit } from "../../types";

interface Props {
  numberOfFloors: number | null;
  floorDetails: FloorInfo[];
  floorSplits: FloorSplit[];
}

const props = defineProps<Props>();

// Ref for the container to be captured by html2canvas
const illustrationContainer = ref<HTMLElement | null>(null);

// Expose the ref for the parent component
defineExpose({
  illustrationContainer,
});
</script>

<template>
  <div>
    <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-5">
      Illustration
    </h2>

    <div
      ref="illustrationContainer"
      class="bg-sky-100 border border-sky-200 p-4 rounded-lg mb-6 min-h-[250px] sm:min-h-[300px] flex flex-col justify-end items-center space-y-1 relative overflow-hidden"
    >
      <!-- Background Elements (Optional) -->
      <div
        class="absolute top-2 right-2 w-10 h-10 bg-yellow-300 rounded-full opacity-50"
      ></div>
      <!-- Sun -->
      <div
        class="absolute top-5 left-5 w-6 h-4 bg-white rounded opacity-70"
      ></div>
      <!-- Cloud -->
      <div
        class="absolute top-8 left-12 w-8 h-5 bg-white rounded-full opacity-60"
      ></div>
      <!-- Cloud -->

      <!-- Building Structure -->
      <div class="w-full h-4 bg-green-500 rounded-b-md order-last z-[1]"></div>
      <!-- Ground -->
      <div
        v-if="!props.numberOfFloors || props.numberOfFloors < 1"
        class="text-gray-500 text-center p-4 absolute inset-0 flex items-center justify-center"
      >
        Set number of floors
      </div>
      <!-- Floors -->
      <div
        v-for="n in props.numberOfFloors ?? 0"
        :key="n"
        class="w-4/5 h-14 sm:h-16 bg-amber-300 border-2 border-amber-500 rounded-t-md flex items-center justify-center text-sm font-semibold text-amber-800 relative mb-1 z-[1]"
        :style="{ order: (props.numberOfFloors ?? 0) - n }"
      >
        Floor {{ n }}
        <!-- Details Tooltip - Adjusted for Responsiveness -->
        <span
          v-if="props.floorSplits[n - 1]"
          class="absolute top-1/2 transform -translate-y-1/2 right-[-10px] sm:right-[-15px] translate-x-full bg-white px-2.5 py-1.5 rounded-md shadow-lg text-xs w-max border border-gray-200 sm:opacity-100 transition-opacity duration-200"
        >
          <span class="font-bold">{{
            props.floorDetails[n - 1]?.heads ?? "?"
          }}</span>
          heads <br />
          Rs
          <span class="font-bold">{{
            props.floorSplits[n - 1].share.toFixed(2)
          }}</span>
        </span>
      </div>
      <div class="w-full h-3 bg-gray-700 rounded-t-lg order-first z-[1]"></div>
      <!-- Roof base -->
    </div>
  </div>
</template>

<style scoped>
/* Add hover effect for tooltip if desired */
/* .relative:hover span {
  opacity: 1;
} */
</style>
