<template>
  <Navbar/>
  <div class="d-flex">
    <div class="col-4">
      <Entrylist/>
    </div>
    <div class="col">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
      Navbar: defineAsyncComponent(() => import("../components/NavBar")),
      Entrylist: defineAsyncComponent(() => import("../components/EntryList"))
    }
}
</script>