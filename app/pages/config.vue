<script setup lang="ts">
useHead({
    title:'Configuration'
})
//https://nuxt.com/docs/api/nuxt-config#alias
const config = useRuntimeConfig()
console.log('Runtime config:', config.public)
if (import.meta.server) {
    console.log('API secret:', config.apiSecret)
}
</script>
<template>
    <QuasarPage>
        public config {{ $config.public }}

        <p>
            <NuxtLink to="/">Back</NuxtLink>
        </p>
    </QuasarPage>


</template>