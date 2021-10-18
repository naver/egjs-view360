<template>
  <div>
    <header>
      <div class="header">
        <span>PanoViewer:</span>
        <router-link to="/rerender">Rerender</router-link>
        <router-link to="/video">Video</router-link>
      </div>
      <div>
        <span>SpinViewer:</span>
        <router-link to="/spin">Spin</router-link>
      </div>
    </header>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
.header * {
  margin-right: 0.75rem;
}
</style>
