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

// Check if form is valid for button disabling
const isFormValid = computed(() => {
  // Assign to local constants after checking for undefined
  const currentTotalBill = totalBill.value;
  const currentNumberOfFloors = numberOfFloors.value;
  const currentFloorDetails = floorDetails.value;

  // Check if models are defined *and* floorDetails is an array
  if (
    currentTotalBill === undefined ||
    currentNumberOfFloors === undefined ||
    currentFloorDetails === undefined ||
    !Array.isArray(currentFloorDetails)
  ) {
    return false;
  }

  // Now use the local constants for checks
  return (
    currentTotalBill !== null &&
    currentTotalBill > 0 &&
    currentNumberOfFloors !== null &&
    currentNumberOfFloors > 0 &&
    currentFloorDetails.length === currentNumberOfFloors &&
    !currentFloorDetails.some((f) => f.heads === null || f.heads < 0) &&
    currentFloorDetails.reduce((sum, floor) => sum + (floor.heads ?? 0), 0) > 0
  );
});

function handleFloorHeadInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  let heads: number | null = parseInt(target.value, 10);
  // Allow empty input (treated as null), otherwise validate non-negative integer
  if (target.value === "") {
    heads = null;
  } else if (isNaN(heads) || heads < 0) {
    // Revert to previous value or set to 0 if invalid input (optional, depends on desired UX)
    // For now, let's just prevent negative numbers implicitly via min="0"
    // and handle null check in isFormValid
    heads = floorDetails.value[index]?.heads; // Keep current if invalid for simplicity
    target.value = heads?.toString() ?? ""; // Reset input visually if needed
  }

  if (floorDetails.value && floorDetails.value[index]) {
    floorDetails.value[index].heads = heads;
  }
}

function submitForm() {
  if (isFormValid.value) {
    emit("generate-pdf");
  }
}
</script>

<template>
  <div class="md:border-r md:border-gray-200 md:pr-8 lg:pr-10">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-700 mb-5">
      Input Details
    </h2>
    <form @submit.prevent="submitForm" class="space-y-5">
      <div>
        <label
          for="totalBill"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Total Bill Amount (Rs)</label
        >
        <input
          type="number"
          id="totalBill"
          v-model.number="totalBill"
          min="0.01"
          step="0.01"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150 ease-in-out"
          placeholder="e.g., 899.00"
        />
      </div>

      <div>
        <label
          for="numberOfFloors"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Number of Floors</label
        >
        <input
          type="number"
          id="numberOfFloors"
          v-model.number="numberOfFloors"
          min="1"
          max="10"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150 ease-in-out"
        />
      </div>

      <!-- Residents Per Floor Section -->
      <div
        v-if="
          numberOfFloors &&
          numberOfFloors > 0 &&
          floorDetails.length === numberOfFloors
        "
        class="space-y-3 pt-2"
      >
        <h3 class="text-md font-semibold text-gray-700">
          Residents per Floor:
        </h3>
        <div
          v-for="(floor, index) in floorDetails"
          :key="index"
          class="flex items-center space-x-2 sm:space-x-3"
        >
          <label
            :for="`floor-${index}`"
            class="w-16 text-sm font-medium text-gray-600 shrink-0"
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
            class="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Heads"
          />
        </div>
      </div>
      <div
        v-else-if="numberOfFloors && numberOfFloors > 0"
        class="text-sm text-gray-500 italic pt-2"
      >
        Loading floor inputs...
      </div>

      <!-- Image Upload Section -->
      <div>
        <label
          for="billImage"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Upload Bill Images (Optional)</label
        >
        <input
          type="file"
          id="billImage"
          @change="emit('image-upload', $event)"
          accept="image/png, image/jpeg, image/gif"
          multiple
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150 ease-in-out cursor-pointer"
        />
        <div
          v-if="props.billImagePreviews.length > 0"
          class="mt-3 flex flex-wrap gap-3"
        >
          <img
            v-for="(preview, index) in props.billImagePreviews"
            :key="index"
            :src="preview"
            alt="Bill Preview"
            class="h-20 sm:h-24 w-auto rounded border border-gray-300 object-contain shadow-sm"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        :disabled="!isFormValid"
      >
        Calculate & Generate PDF
      </button>
    </form>
  </div>
</template>
