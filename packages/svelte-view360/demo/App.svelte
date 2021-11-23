<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Rerender from "./pano/Rerender.svelte";
  import Video from "./pano/Video.svelte";
  import Spin from "./spin/Spin.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav class="is-size-4">
    <div>
      <span>PanoViewer:</span>
      <Link to="rerender">Rerender</Link>
      <Link to="video">Video</Link>
    </div>
    <div>
      <span>SpinViewer:</span>
      <Link to="spin">Spin</Link>
    </div>
  </nav>
  <div>
    <Route path="rerender" component={Rerender} />
    <Route path="video" component={Video} />
    <Route path="spin" component={Spin} />
    <Route path="/"></Route>
  </div>
</Router>
