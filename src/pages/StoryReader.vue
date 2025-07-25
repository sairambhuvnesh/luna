<template>
  <q-page class="page-container">
    <transition name="slide" mode="out-in">
      <div
        class="image-wrapper"
        v-touch-swipe.mouse="onSwipe"
        @dblclick="goToNext"
        :key="pageNumber"
      >
        <img :src="pageImageUrl" alt="Story Page" class="image-fit" />
      </div>
    </transition>

    <q-footer class="footer-bar q-pa-sm">
      <div
        class="row justify-center items-center q-gutter-md"
        style="max-width: 400px; margin: 0 auto; width: 100%;"
      >
        <q-btn
          round
          flat
          color="red"
          icon="first_page"
          @click="goToStart"
          :disable="pageNumber.value === 1"
          size="lg"
          aria-label="Start Over"
        />
        <q-btn
          round
          flat
          color="red"
          icon="arrow_back"
          @click="goToPrevious"
          :disable="pageNumber.value <= 1"
          size="lg"
          aria-label="Previous Page"
        />
        <q-btn
          round
          flat
          color="red"
          icon="arrow_forward"
          @click="goToNext"
          size="lg"
          aria-label="Next Page"
        />
        <q-btn
          round
          flat
          color="red"
          icon="last_page"
          @click="goToLast"
          :disable="pageNumber.value === totalPages"
          size="lg"
          aria-label="Last Page"
        />
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()
const router = useRouter()
const totalPages = 15
const storyId = ref(route.params.storyId || 'luna-lion')
const pageNumber = ref(parseInt(route.params.pageNumber || 1))

const pageImageUrl = computed(() =>
  new URL(`../assets/stories/${storyId.value}/Luna-page${pageNumber.value}.png`, import.meta.url).href
)

onBeforeRouteUpdate((to) => {
  storyId.value = to.params.storyId
  pageNumber.value = parseInt(to.params.pageNumber)
})

function goToNext() {
  if (pageNumber.value < totalPages) {
    router.push(`/story/${storyId.value}/page/${pageNumber.value + 1}`)
  }
}

function goToStart() {
  router.push(`/story/${storyId.value}/page/1`)
}

function goToLast() {
  router.push(`/story/${storyId.value}/page/${totalPages}`)
}

function goToPrevious() {
  if (pageNumber.value > 1) {
    router.push(`/story/${storyId.value}/page/${pageNumber.value - 1}`)
  }
}

function onSwipe({ direction }) {
  if (direction === 'left') {
    goToNext()
  } else if (direction === 'right') {
    goToPrevious()
  }
}

function handleKey(event) {
  if (event.key === 'Enter' || event.key === 'ArrowRight') {
    goToNext()
  } else if (event.key === 'ArrowLeft') {
    goToPrevious()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.page-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #fef6e4;
  position: relative;
}

.image-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #fef6e4, #fcd5ce);
}

.image-fit {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: all 0.2s ease-in-out;
}

.footer-bar {
  background: linear-gradient(to bottom, #fef6e4, #fcd5ce);
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

/* Transition styles */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease-out; /* faster and snappy */
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
