<script setup lang="ts" generic="T">
import { biCheck, biX } from '@quasar/extras/bootstrap-icons';

withDefaults(
    defineProps<{
        label?: string;
        trueLabel?: string;
        falseLabel?: string;
        color?: string;
        size?: string;
        useLabelTitle?: boolean;
        showTitle?: boolean;
        disable?: boolean;
        editMode?: boolean
        inline?: boolean
        fetchImage?: boolean;
        leftLabel?: boolean;
        showLabel?: boolean;
        keepColor?: boolean;
    }>(),
    {
        color: 'primary',
        size: 'md',
        useLabelTitle: true,
        showTitle: false,
        inline: true,
        editMode: true,
        fetchImage: false,
        leftLabel: false,
        showLabel: true,
        keepColor: false,
    }
);
const { t } = useLang();
// defineEmits(['update:modelValue']);
const modelValue = defineModel<boolean | T[]>();
</script>
<template>
    <div v-if="!label && showTitle" class="text-muted">
        {{ label }}
    </div>
    <q-toggle v-bind="$attrs" v-model="modelValue" :checked-icon="biCheck" :disable="!editMode || disable"
        :color="color" :size="size" :keep-color="keepColor" :label="!showLabel ? '' :
            useLabelTitle ? (label ? label : t('base.enable')) : modelValue
                ? trueLabel
                    ? trueLabel
                    : t('base.enable')
                : falseLabel
                    ? falseLabel
                    : t('base.disable')
            " :unchecked-icon="biX">
        <slot />
    </q-toggle>
</template>