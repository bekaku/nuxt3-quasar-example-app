<script setup lang="ts">

import { FORMAT_DATE14 } from '~/utils/dateUtil';
import { ref } from 'vue';
useHead({
    title: 'Date time Picker'
})
const { getCurrentDateByFormat } = useDateFns();
const d = ref(getCurrentDateByFormat(FORMAT_DATE14));
const pickTime = ref<string>('');
const onUpdate = (v: string) => {
    console.log('onUpdate', v)
}
const onUpdateTime = (v: string) => {
    console.log('onUpdateTime', v)
}
</script>
<template>
    <BasePage>
        <BaseCard>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Date time picker </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        <BaseDatePicker v-model="d" label="Select Date" required @on-update="onUpdate" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <BaseTimePicker v-model="pickTime" label="Select Date" required @on-update="onUpdateTime" />
                    </div>

                </div>

            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>