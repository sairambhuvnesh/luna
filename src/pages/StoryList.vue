<template>
  <q-page padding>
    <q-card class="q-ma-md" flat bordered>
      <q-img
        src="https://mfmiqenyivuigbzhcfow.supabase.co/storage/v1/object/public/story-assets/luna-lion/cover.png"
        ratio="16/9"
      />
      <q-card-section>
        <div class="text-h5">Luna the Little Lion</div>
        <div class="text-subtitle2">An adventure through the jungle!</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Read" color="primary" @click="goToStory" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goToStory() {
  router.push('/story/luna-lion/page/1')
}
</script>
