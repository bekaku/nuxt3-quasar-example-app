<script setup lang="ts">
import { biCheck2 } from '@quasar/extras/bootstrap-icons';
const { closeOnClick = false, anchor = 'bottom left', self = 'top start', width='175px' } = defineProps<{
    closeOnClick?: boolean
    anchor?: any
    self?: any
    width?: string
}>();
const { onSetTheme, availableThemes, currentTheme } = useTheme();
const { screen } = useQuasar();
const { t } = useLang();
</script>
<template>
    <q-menu :anchor="anchor" :self="self" v-bind="$attrs">
        <q-list :style="{minWidth: width}">
            <q-item clickable v-for="theme in availableThemes" :key="theme.key" @click="onSetTheme(theme.key)" :v-close-popup="closeOnClick">
                <q-item-section avatar>
                    <q-icon :name="theme.icon" />
                </q-item-section>
                <q-item-section>{{ t(theme.text) }}</q-item-section>
                <q-item-section v-if="theme.key == currentTheme" side>
                    <q-icon :name="biCheck2" />
                </q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</template>