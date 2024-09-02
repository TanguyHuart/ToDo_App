<script setup lang="ts">
import tasksList from "@/assets/data/data.json";
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 p-4">
    <TaskCard
      v-for="(task, index) of tasksList"
      :key="index"
      :task="task"
      :index="index"
    />
  </div>
</template>
