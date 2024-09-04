<template>
  <div class="w-screen min-h-screen bg-blue-300 font-sans">
    <h1 class="text-3xl text-center font-bold">Ma petite liste de tâches</h1>

    <main class="p-4 flex flex-col gap-4">
      <ImportJson />
      <ToDoForm />
      <TasksList />
    </main>
  </div>
</template>
