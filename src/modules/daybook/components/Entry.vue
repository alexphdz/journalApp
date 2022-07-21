<template>
    <div class="entry mb-3 pointer p-2" @click="$router.push({ name:'entry', params: { id: 10 } })">
        <div class="entry-title">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fs-5 fw-light">2021, jueves</span>
        </div>
        <div class="entry-description">
            Aliqua ipsum laborum quis ut Lorem dolor esse eu. Irure deserunt pariatur culpa aliquip esse nulla dolor amet magna occaecat ea. Proident cillum velit laborum dolore in eu culpa reprehenderit. Nostrud minim Lorem nostrud officia ipsum mollit commodo voluptate cillum occaecat deserunt esse. Ullamco consequat voluptate minim consequat id occaecat. Incididunt id eiusmod do laborum voluptate ipsum non pariatur.
        </div>
    </div>
</template>

<style lang="scss" scoped>
.entry {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
    }

    .entry-description {
        font-size: 13px;
        text-align: justify;
    }
}
</style>