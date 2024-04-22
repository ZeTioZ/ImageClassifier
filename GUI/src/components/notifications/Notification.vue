<script setup>
import XMark from '@/components/icons/XMark.vue';

const getColor = (type) => {
  if (type) {
    let c;
    switch (type) {
      case "info":  
        c = "ls-bleu-fonce";
        break;

      case "success":
        c = "ls-vert-base";
        break;

      case "error":
        c = "ls-rouge";
        break;

      default:
        throw new Error("Property 'type' must be either 'info' or 'danger'.");
        break;
    }
    return c;
  }
}
</script>

<template>
  <notifications position="bottom right" width="400" :duration="5000">
    <template #body="props">
      <div class="flex items-center p-4 m-2 rounded-md bg-gray-100 border-2" :class="`border-${getColor(props.item.type)}`" @click="props.close">
        <div class="ms-3">
          <h1 class="font-medium">{{ props.item.title }}</h1>
          <p class="text-sm">{{ props.item.text }}</p>
        </div>

        <button type="button" class="ms-auto -mx-1.5 -my-1.5 rounded-full p-1.5 inline-flex items-center justify-center h-8 w-8" :class="`text-${getColor(props.item.type)}`">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </template>
  </notifications>
</template>

