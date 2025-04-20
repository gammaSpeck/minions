<script setup lang="ts">
// No specific script needed for the static Home page
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800"
  >
    <!-- Header/Navbar Placeholder -->
    <nav class="bg-white shadow-sm p-4">
      <div class="container mx-auto flex justify-between items-center">
        <span class="text-2xl font-bold text-indigo-600">Minions</span>
        <!-- Add nav links here if needed later -->
      </div>
    </nav>

    <!-- Hero Section -->
    <main
      class="container mx-auto px-6 py-16 text-center flex flex-col md:flex-row items-center justify-center gap-8"
    >
      <!-- Text Content -->
      <div class="md:w-1/2 text-center md:text-left">
        <h1
          class="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4"
        >
          Simplify Your Household Tasks
        </h1>
        <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto md:mx-0">
          Welcome to Minions, your growing collection of handy tools designed to
          make everyday chores and calculations easier. Effortlessly manage
          bills, track expenses, and more.
        </p>
        <router-link
          to="/bill-splitter"
          class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
        >
          Explore Tools
        </router-link>
      </div>
      <!-- Image -->
      <div class="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src="../assets/Minions.jpeg"
          alt="Minions Illustration"
          class="rounded-lg shadow-xl max-w-sm md:max-w-md lg:max-w-lg object-contain"
        />
      </div>
    </main>

    <!-- Features/Tools Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
          Available Tools
        </h2>
        <div class="flex flex-wrap -mx-4 justify-center">
          <!-- Bill Splitter Card -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div
              class="bg-gray-50 rounded-lg shadow-md p-6 h-full flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <div class="text-4xl text-indigo-500 mb-4">🏠</div>
              <!-- Simple Icon -->
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                Residence Bill Splitter
              </h3>
              <p class="text-gray-600 mb-4 flex-grow">
                Easily divide shared residence bills (like water or electricity)
                based on the number of occupants per floor.
              </p>
              <router-link
                to="/bill-splitter"
                class="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Use Tool &rarr;
              </router-link>
            </div>
          </div>

          <!-- Placeholder for future tools -->
          <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div
              class="bg-gray-100 rounded-lg p-6 h-full flex flex-col items-center text-center border border-dashed border-gray-300"
            >
              <div class="text-4xl text-gray-400 mb-4">+</div>
              <h3 class="text-xl font-semibold text-gray-500 mb-2">
                More Tools Coming Soon
              </h3>
              <p class="text-gray-500 flex-grow">
                We're always working on adding new helpful minions to your
                collection!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Placeholder -->
    <footer
      class="bg-gray-800 text-gray-300 py-8 fixed bottom-0 left-0 right-0"
    >
      <div class="container mx-auto px-6 text-center">
        <p>
          &copy; {{ new Date().getFullYear() }} Minions. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped styles if needed, but Tailwind is preferred */
</style>
