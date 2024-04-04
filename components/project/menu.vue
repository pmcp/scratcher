<template>
  <div class="menu menu__container mx-1 bg-black ">
    <slot class="position absolute" name="label"/>
    <slot name="content"/>
  </div>
</template>
<style>
.menu {
  color: var(--color3);
  padding: 2em;
  margin: 0 6px;
  background-color: var(--color7);
}
</style>