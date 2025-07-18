<template>
  <q-page class="page-container">
    <div class="content-container">
      <div class="image-wrapper">
        <img :src="pageImageUrl" alt="Story Page" class="image-fit" />
      </div>

      <div class="button-row">
        <q-btn round icon="arrow_back" @click="goToPrevious" :disable="pageNumber.value <= 1" />
        <q-btn round icon="arrow_forward" @click="goToNext" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const storyId = ref(route.params.storyId)
const pageNumber = ref(parseInt(route.params.pageNumber))

const pageImageUrl = computed(
  () =>
    `https://mfmiqenyivuigbzhcfow.supabase.co/storage/v1/object/public/story-assets/${storyId.value}/Luna-page${pageNumber.value}.png`,
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
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.image-wrapper {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: calc(100vh - 100px); /* leave space for buttons and header */
  overflow: hidden;
}

.image-fit {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.button-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 8px;
}
</style>
