<script setup lang="ts">
useHead({
    title: 'Togle'
})
const toggle = ref<boolean>(false);
</script>
<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Toggle </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        <QuasarToggle v-model="toggle" label="Toggle" :use-checkbox="true" color="primary"
                            :use-label-title="false" size="md" true-label="True label" false-label="False label" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <QuasarToggle v-model="toggle" label="Toggle" :use-checkbox="false" color="negative"
                            size="md" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <QuasarToggle v-model="toggle" label="Toggle" :use-checkbox="toggle" color="negative"
                            size="md" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<style lang="scss" scoped>
</style>