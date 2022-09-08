<template>
<div class="save-list">
  <ul>
    <li
      v-for="d in $store.state.saveList"
      :key="d.id"
    >{{ d.song }}</li>
  </ul>
</div>
</template>
