<script setup>
defineProps({
    name: {
    type: String,
    required: true
    },
    title: {
    type: String,
    required: true
    }
})
</script>

<template>
<li class = "navbar__item" ><a :href="name">{{title}}</a></li>
</template>

<style scoped>

.navbar__item {
    margin: 0;
    padding: 0;
}
.navbar__item a {
    text-decoration: none;
    font-size: 2rem;
    word-break: keep-all;
    cursor: pointer;
    color: var(--light);
}

.navbar__item a:hover {
    color: var(--dark);
}

@media (min-width: 768px) {
    .navbar__item a {
    font-size: 1.2rem;
    }
    .navbar__item a {
    color: var(--dark);
    }
    .navbar__item a:hover {
    color: var(--red-purple);
    }
}
</style>