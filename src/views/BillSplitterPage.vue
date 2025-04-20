<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import type { FloorInfo, FloorSplit } from "../types"; // Import shared types

// Import child components
import BillSplitterForm from "../components/bill-splitter/BillSplitterForm.vue";
import BillSplitterIllustration from "../components/bill-splitter/BillSplitterIllustration.vue";
import BillSplitterResults from "../components/bill-splitter/BillSplitterResults.vue";

// Ref for accessing the illustration component's exposed container
const illustrationComponentRef = ref<InstanceType<
  typeof BillSplitterIllustration
> | null>(null);

// --- State remains in the parent component ---
const numberOfFloors = ref<number | null>(3);
const floorDetails = ref<FloorInfo[]>([]);
const totalBill = ref<number | null>(null);
const billImages = ref<File[]>([]);
const billImagePreviews = ref<string[]>([]);

// --- Watcher remains in parent ---
watch(
  numberOfFloors,
  (newVal) => {
    const count = newVal ?? 0;
    const currentLength = floorDetails.value.length;
    if (count >= 0) {
      // Ensure count is non-negative
      if (count > currentLength) {
        for (let i = currentLength; i < count; i++) {
          floorDetails.value.push({ heads: null });
        }
      } else if (count < currentLength) {
        floorDetails.value.splice(count);
      }
    }
  },
  { immediate: true }
);

// --- Computed properties remain in parent ---
const totalHeads = computed<number>(() => {
  // Ensure all floors have head counts before calculating
  if (
    floorDetails.value.length !== (numberOfFloors.value ?? 0) ||
    floorDetails.value.some((f) => f.heads === null)
  ) {
    return 0; // Or handle as appropriate, maybe return NaN or specific indicator
  }
  return floorDetails.value.reduce((sum, floor) => sum + (floor.heads ?? 0), 0);
});

const billPerHead = computed<number>(() => {
  const tb = totalBill.value ?? 0;
  const th = totalHeads.value;
  if (th === 0 || tb === 0) {
    return 0;
  }
  return tb / th;
});

const floorSplits = computed<FloorSplit[]>(() => {
  // Ensure calculation runs only when data is ready
  if (
    floorDetails.value.length !== (numberOfFloors.value ?? 0) ||
    totalHeads.value === 0
  ) {
    return [];
  }
  const bph = billPerHead.value;
  return floorDetails.value.map((floor, index) => ({
    floor: index + 1,
    heads: floor.heads ?? 0,
    share: (floor.heads ?? 0) * bph,
  }));
});

// --- Event Handlers remain in parent ---
function handleImageUpload(event: Event): void {
  const target = event.target as HTMLInputElement;
  billImages.value = [];
  billImagePreviews.value = [];

  if (target.files && target.files.length > 0) {
    const files = Array.from(target.files);
    billImages.value = files;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          billImagePreviews.value.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

async function generatePDF(): Promise<void> {
  if (
    totalBill.value === null ||
    totalHeads.value === 0 ||
    floorDetails.value.some((f) => f.heads === null)
  ) {
    alert("Please fill in the total bill and head counts for all floors.");
    return;
  }

  // Access the illustration container via the child component's ref
  const illustrationContainerElement =
    illustrationComponentRef.value?.illustrationContainer;
  if (!illustrationContainerElement) {
    alert("Could not find illustration element to capture.");
    // Optionally continue without illustration or return
    // return;
  }

  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;
  const lineHeight = 7;
  const margin = 15;
  const availableWidth = pageWidth - margin * 2;

  // Add Title and Basic Info
  doc.setFontSize(18);
  doc.text("Residence Bill Split Report", margin, yPos);
  yPos += lineHeight * 2;
  doc.setFontSize(12);
  doc.text(`Total Bill Amount: Rs ${totalBill.value.toFixed(2)}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Total Residents: ${totalHeads.value}`, margin, yPos);
  yPos += lineHeight;
  doc.text(
    `Bill Per Resident: Rs ${billPerHead.value.toFixed(2)}`,
    margin,
    yPos
  );
  yPos += lineHeight * 2;

  // Add Floor-wise Split
  doc.setFontSize(14);
  doc.text("Floor-wise Split:", margin, yPos);
  yPos += lineHeight * 1.5;
  doc.setFontSize(10);
  floorSplits.value.forEach((split) => {
    if (yPos > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
    }
    doc.text(
      `Floor ${split.floor}: ${
        split.heads
      } residents -> Share: Rs ${split.share.toFixed(2)}`,
      margin,
      yPos
    );
    yPos += lineHeight;
  });

  // Add Illustration (if element was found)
  if (illustrationContainerElement) {
    try {
      const canvas = await html2canvas(illustrationContainerElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      let imgWidth = canvas.width / 10;
      let imgHeight = canvas.height / 10;
      const aspectRatio = imgWidth / imgHeight;
      if (imgWidth > availableWidth) {
        imgWidth = availableWidth;
        imgHeight = imgWidth / aspectRatio;
      }

      if (yPos + imgHeight > pageHeight - margin - lineHeight * 3) {
        doc.addPage();
        yPos = margin;
      }
      yPos += lineHeight * 2;
      doc.setFontSize(14);
      doc.text("Building Illustration:", margin, yPos);
      yPos += lineHeight * 1.5;
      doc.addImage(imgData, "PNG", margin, yPos, imgWidth, imgHeight);
      yPos += imgHeight + lineHeight;
    } catch (error) {
      console.error("Error capturing illustration:", error);
      if (yPos > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
      }
      doc.text("(Error rendering illustration)", margin, yPos);
      yPos += lineHeight;
    }
  }

  // Add Uploaded Bill Images
  if (billImagePreviews.value.length > 0) {
    if (yPos > pageHeight - margin - lineHeight * 3) {
      doc.addPage();
      yPos = margin;
    }
    yPos += lineHeight * 2;
    doc.setFontSize(14);
    doc.text("Attached Bill Images:", margin, yPos);
    yPos += lineHeight * 1.5;
    for (let i = 0; i < billImagePreviews.value.length; i++) {
      const preview = billImagePreviews.value[i];
      try {
        const img = new Image();
        img.src = preview;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        let imgWidth = img.width;
        let imgHeight = img.height;
        const aspectRatio = imgWidth / imgHeight;
        if (imgWidth > availableWidth) {
          imgWidth = availableWidth;
          imgHeight = imgWidth / aspectRatio;
        }
        if (yPos + imgHeight > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
          doc.setFontSize(10);
          doc.text(`Attached Bill Image (${i + 1} continued):`, margin, yPos);
          yPos += lineHeight;
        } else if (i > 0) {
          yPos += lineHeight;
        }
        doc.addImage(preview, "JPEG", margin, yPos, imgWidth, imgHeight);
        yPos += imgHeight + lineHeight;
      } catch (error) {
        console.error(`Error adding image ${i + 1} to PDF:`, error);
        if (yPos > pageHeight - margin) {
          doc.addPage();
          yPos = margin;
        }
        doc.text(`(Error loading bill image ${i + 1})`, margin, yPos);
        yPos += lineHeight;
      }
    }
  }

  doc.save("bill_split_report.pdf");
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-blue-50 p-4 sm:p-6 md:p-8 flex flex-col items-center"
  >
    <div class="w-full max-w-5xl bg-white shadow-xl rounded-lg p-6 md:p-8">
      <router-link
        to="/"
        class="text-blue-600 hover:text-blue-800 hover:underline mb-6 inline-block font-semibold"
      >
        &larr; Back to Home
      </router-link>
      <h1
        class="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 md:mb-10"
      >
        Residence Bill Splitter
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        <!-- Use BillSplitterForm Component -->
        <BillSplitterForm
          v-model:totalBill="totalBill"
          v-model:numberOfFloors="numberOfFloors"
          v-model:floorDetails="floorDetails"
          :billImagePreviews="billImagePreviews"
          @image-upload="handleImageUpload"
          @generate-pdf="generatePDF"
        />

        <!-- Right Side: Illustration and Results Components -->
        <div class="space-y-6 md:space-y-8">
          <!-- Use BillSplitterIllustration Component -->
          <BillSplitterIllustration
            ref="illustrationComponentRef"
            :numberOfFloors="numberOfFloors"
            :floorDetails="floorDetails"
            :floorSplits="floorSplits"
          />

          <!-- Use BillSplitterResults Component -->
          <BillSplitterResults
            :totalBill="totalBill"
            :totalHeads="totalHeads"
            :billPerHead="billPerHead"
            :floorSplits="floorSplits"
          />
        </div>
      </div>
    </div>
  </div>
</template>
