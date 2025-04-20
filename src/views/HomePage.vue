<script setup lang="ts">
// No specific script needed for the static Home page
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-amber-50 to-blue-50 text-gray-800"
  >
    <!-- Header -->
    <nav class="bg-white shadow-md p-4 sticky top-0 z-10">
      <div class="container mx-auto flex justify-between items-center">
        <span class="text-3xl font-extrabold text-blue-600 tracking-tight"
          >Minions</span
        >
        <!-- Navigation links can go here later -->
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="flex-grow container mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <!-- Text Content -->
        <div class="text-center md:text-left order-2 md:order-1">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4"
          >
            Simplify Your Household Tasks!
          </h1>
          <p
            class="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0"
          >
            Welcome to Minions, your friendly toolbox for making everyday chores
            easier. Calculate bill splits, manage tasks, and more with a smile!
          </p>
          <router-link
            to="/tools/bill-splitter"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Explore Tools
          </router-link>
        </div>
        <!-- Image -->
        <div class="order-1 md:order-2 flex justify-center px-4">
          <img
            src="../assets/Minions.jpeg"
            alt="Minions Illustration"
            class="rounded-lg shadow-xl w-full max-w-md lg:max-w-lg h-auto object-cover"
          />
        </div>
      </div>
    </main>

    <!-- Features/Tools Section -->
    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-10 md:mb-12">
          Available Tools
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center"
        >
          <!-- Bill Splitter Card -->
          <div
            class="w-full max-w-sm bg-amber-50 rounded-lg shadow-md p-6 h-full flex flex-col items-center text-center border border-amber-200 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div class="text-5xl mb-4">🏠</div>
            <!-- Emoji Icon -->
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Residence Bill Splitter
            </h3>
            <p class="text-gray-700 mb-4 flex-grow">
              Easily divide shared residence bills based on the number of
              occupants per floor.
            </p>
            <router-link
              to="/tools/bill-splitter"
              class="mt-auto text-blue-600 hover:text-blue-800 font-semibold"
            >
              Use Tool &rarr;
            </router-link>
          </div>

          <!-- Placeholder for future tools -->
          <div
            class="w-full max-w-sm bg-gray-100 rounded-lg p-6 h-full flex flex-col items-center text-center border border-dashed border-gray-300"
          >
            <div class="text-5xl text-gray-400 mb-4">+</div>
            <h3 class="text-xl font-semibold text-gray-500 mb-2">
              More Tools Coming Soon
            </h3>
            <p class="text-gray-600 flex-grow">
              We're building more helpful minions!
            </p>
          </div>

          <!-- Placeholder 2 (Optional) -->
          <div
            class="w-full max-w-sm hidden lg:flex bg-gray-100 rounded-lg p-6 h-full flex-col items-center text-center border border-dashed border-gray-300"
          >
            <div class="text-5xl text-gray-400 mb-4">?</div>
            <h3 class="text-xl font-semibold text-gray-500 mb-2">
              Have an Idea?
            </h3>
            <p class="text-gray-600 flex-grow">
              Let us know what tools you'd find useful!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-gray-300 py-6 mt-auto">
      <div class="container mx-auto px-6 text-center">
        <p>&copy; {{ new Date().getFullYear() }} Minions. Built with Fun!</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Add minor scoped styles if needed, e.g., specific gradient tweaks */
</style>
