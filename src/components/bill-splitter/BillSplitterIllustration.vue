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
    <h2 class="text-xl font-semibold text-gray-700 mb-4">
      Split Results & Illustration
    </h2>

    <!-- Building Illustration - Add ref -->
    <div
      ref="illustrationContainer"
      class="bg-blue-100 p-4 rounded-lg mb-6 min-h-[200px] flex flex-col justify-end items-center space-y-1"
    >
      <!-- Reversed flex order for illustration -->
      <div class="w-full h-4 bg-green-500 rounded-b-lg order-last"></div>
      <!-- Ground -->
      <div
        v-if="!props.numberOfFloors || props.numberOfFloors < 1"
        class="text-gray-500 text-center p-4"
      >
        Set number of floors
      </div>
      <!-- Loop for floors -->
      <div
        v-for="n in props.numberOfFloors ?? 0"
        :key="n"
        class="w-4/5 h-12 bg-yellow-300 border-2 border-yellow-500 rounded-t flex items-center justify-center text-sm font-medium text-yellow-800 relative mb-1"
        :style="{ order: (props.numberOfFloors ?? 0) - n }"
      >
        Floor {{ n }}
        <!-- Details Tooltip -->
        <span
          v-if="props.floorSplits[n - 1]"
          class="absolute -right-24 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 rounded shadow text-xs w-max"
        >
          {{ props.floorDetails[n - 1]?.heads ?? "?" }} heads <br />
          Rs {{ props.floorSplits[n - 1].share.toFixed(2) }}
        </span>
      </div>
      <div class="w-full h-2 bg-gray-600 rounded-t-lg order-first"></div>
      <!-- Roof base -->
    </div>
  </div>
</template>
