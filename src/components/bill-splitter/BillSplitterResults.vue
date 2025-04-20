<script setup lang="ts">
import type { FloorSplit } from "../../types";
import { computed } from "vue";

interface Props {
  totalBill: number | null;
  totalHeads: number;
  billPerHead: number;
  floorSplits: FloorSplit[];
}

const props = defineProps<Props>();

const showResults = computed(() => {
  return (
    props.totalBill !== null &&
    props.totalBill > 0 &&
    props.totalHeads > 0 &&
    props.floorSplits.length > 0
  );
});
</script>

<template>
  <div>
    <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-4">Summary</h2>
    <div
      v-if="showResults"
      class="space-y-2.5 text-sm sm:text-base text-gray-800 bg-amber-100 border border-amber-200 p-4 sm:p-5 rounded-lg shadow-sm"
    >
      <p>
        <strong class="font-semibold text-gray-900">Total Bill:</strong> Rs
        {{ props.totalBill?.toFixed(2) ?? "0.00" }}
      </p>
      <p>
        <strong class="font-semibold text-gray-900">Total Residents:</strong>
        {{ props.totalHeads }}
      </p>
      <p>
        <strong class="font-semibold text-gray-900">Bill per Resident:</strong>
        Rs {{ props.billPerHead.toFixed(2) }}
      </p>
      <h3 class="text-base sm:text-lg font-semibold pt-2 text-gray-900">
        Floor Shares:
      </h3>
      <ul class="space-y-1">
        <li
          v-for="split in props.floorSplits"
          :key="split.floor"
          class="flex justify-between items-center"
        >
          <span
            >Floor {{ split.floor }}
            <span class="text-gray-600"
              >({{ split.heads }} residents):</span
            ></span
          >
          <strong class="font-semibold text-blue-700"
            >Rs {{ split.share.toFixed(2) }}/-</strong
          >
        </li>
      </ul>
    </div>
    <div
      v-else
      class="text-gray-500 italic text-center bg-gray-100 p-4 rounded-lg"
    >
      Please complete the form to see the split summary.
    </div>
  </div>
</template>
