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
    <router-view></router-view>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.header * {
  margin-right: 0.75rem;
}
</style>
