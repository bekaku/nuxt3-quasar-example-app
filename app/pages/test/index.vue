<script setup lang="ts">
const { t, locale, onSetLocale } = useLang();
const test = ref();
useSeoMeta({
    title: 'Test Page'
})

</script>
<template>
    <q-page padding>
        <q-card bordered flat />
    </q-page>
</template>