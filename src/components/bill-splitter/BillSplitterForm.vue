<script setup lang="ts">
import { computed } from "vue";
import type { FloorInfo } from "../../types"; // Corrected path again

// Props for two-way binding (using modelValue convention)
const totalBill = defineModel<number | null>("totalBill");
const numberOfFloors = defineModel<number | null>("numberOfFloors");
const floorDetails = defineModel<FloorInfo[]>("floorDetails", {
  required: true,
});

interface Props {
  billImagePreviews: string[];
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "image-upload", event: Event): void;
  (e: "generate-pdf"): void;
}>();

const totalHeads = computed<number>(() => {
  // Basic calculation needed for disabling button, more complex logic stays in parent
  return floorDetails.value.reduce((sum, floor) => sum + (floor.heads ?? 0), 0);
});

function handleFloorHeadInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const heads = target.value === "" ? null : parseInt(target.value, 10);
  // Ensure floorDetails array exists and has the target index
  if (floorDetails.value && floorDetails.value[index]) {
    floorDetails.value[index].heads = isNaN(heads as number) ? null : heads;
  }
}

function submitForm() {
  emit("generate-pdf");
}
</script>

<template>
  <div class="border-r border-gray-200 pr-8">
    <h2 class="text-xl font-semibold text-gray-700 mb-4">Input Details</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="totalBill" class="block text-sm font-medium text-gray-700"
          >Total Bill Amount (Rs)</label
        >
        <input
          type="number"
          id="totalBill"
          v-model.number="totalBill"
          min="0"
          step="0.01"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., 899.00"
        />
      </div>

      <div>
        <label
          for="numberOfFloors"
          class="block text-sm font-medium text-gray-700"
          >Number of Floors</label
        >
        <input
          type="number"
          id="numberOfFloors"
          v-model.number="numberOfFloors"
          min="1"
          max="10"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div
        v-if="
          numberOfFloors &&
          numberOfFloors > 0 &&
          floorDetails.length === numberOfFloors
        "
        class="space-y-3"
      >
        <h3 class="text-md font-medium text-gray-700 pt-2">
          Residents per Floor:
        </h3>
        <div
          v-for="(floor, index) in floorDetails"
          :key="index"
          class="flex items-center space-x-3"
        >
          <label
            :for="`floor-${index}`"
            class="w-16 text-sm font-medium text-gray-600"
          >
            Floor {{ index + 1 }}:
          </label>
          <input
            type="number"
            :id="`floor-${index}`"
            :value="floor.heads"
            @input="handleFloorHeadInput(index, $event)"
            min="0"
            required
            class="block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Heads"
          />
        </div>
      </div>
      <div
        v-else-if="numberOfFloors && numberOfFloors > 0"
        class="text-sm text-gray-500 italic"
      >
        Adjusting floor inputs...
      </div>

      <div>
        <label for="billImage" class="block text-sm font-medium text-gray-700"
          >Upload Bill Images (Optional)</label
        >
        <input
          type="file"
          id="billImage"
          @change="emit('image-upload', $event)"
          accept="image/png, image/jpeg, image/gif"
          multiple
          class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <!-- Display multiple previews -->
        <div
          v-if="props.billImagePreviews.length > 0"
          class="mt-2 flex flex-wrap gap-2"
        >
          <img
            v-for="(preview, index) in props.billImagePreviews"
            :key="index"
            :src="preview"
            alt="Bill Preview"
            class="max-h-24 rounded border border-gray-300"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        :disabled="
          totalBill === null ||
          totalHeads === 0 ||
          floorDetails.some((f) => f.heads === null)
        "
      >
        Calculate & Generate PDF
      </button>
    </form>
  </div>
</template>
