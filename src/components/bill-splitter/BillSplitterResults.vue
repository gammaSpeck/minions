<script setup lang="ts">
import type { FloorSplit } from "../../types";

interface Props {
  totalBill: number | null;
  totalHeads: number;
  billPerHead: number;
  floorSplits: FloorSplit[];
}

const props = defineProps<Props>();
</script>

<template>
  <div
    v-if="props.totalBill !== null && props.totalHeads > 0"
    class="space-y-2 text-gray-700 bg-gray-100 p-4 rounded"
  >
    <p><strong>Total Bill:</strong> Rs {{ props.totalBill.toFixed(2) }}</p>
    <p><strong>Total Residents:</strong> {{ props.totalHeads }}</p>
    <p>
      <strong>Bill per Resident:</strong> Rs {{ props.billPerHead.toFixed(2) }}
    </p>
    <h3 class="text-md font-semibold pt-2">Floor Shares:</h3>
    <ul>
      <li v-for="split in props.floorSplits" :key="split.floor">
        Floor {{ split.floor }} ({{ split.heads }} residents):
        <strong>Rs {{ split.share.toFixed(2) }}/-</strong>
      </li>
    </ul>
  </div>
  <div v-else class="text-gray-500 italic">
    Fill the form to see the results.
  </div>
</template>
