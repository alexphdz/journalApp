<template>
    <div class="entrylist">
        <div class="px-2 pt-2">
            <input 
                type="text"
                class="form-control"
                placeholder="Buscar entrada"
            />
        </div>
        <div class="entrylist-scrollarea">
            <h2 v-for="item in 100" :key="item">
                <Entry/>
            </h2>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
    Entry: defineAsyncComponent(() => import("./Entry"))
}
}
</script>

<style lang="scss" scoped>
.entrylist {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}
.entrylist-scrollarea {
    height: calc(100vh - 120px);
    overflow: scroll;
}
</style>