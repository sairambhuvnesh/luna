<template>
  <q-page class="page-container">
    <div
      class="image-wrapper"
      v-touch-swipe.mouse="onSwipe"
    >
      <img :src="pageImageUrl" alt="Story Page" class="image-fit" />
    </div>

    <q-footer class="footer-overlay">
      <div class="row justify-between items-center q-pa-sm" style="max-width: 400px; margin: 0 auto;">
        <q-btn round flat icon="arrow_back" @click="goToPrevious" :disable="pageNumber.value <= 1" />
        <q-btn round flat icon="arrow_forward" @click="goToNext" />
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const route = useRoute()
const router = useRouter()

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
  router.push(`/story/${storyId.value}/page/${pageNumber.value + 1}`)
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
  background-color: #fef6e4; /* Friendly warm background */
  position: relative;
}

.image-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-fit {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.footer-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
