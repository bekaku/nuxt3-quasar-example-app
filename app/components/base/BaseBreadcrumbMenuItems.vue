<script setup lang="ts">
import type { Breadcrumb } from '~/types/common';

const { lines = 1, items } = defineProps<{
  items: Breadcrumb[];
  lines?: number;
}>();
const appStore = useAppStore();
const { isDark } = useTheme();
const { t } = useLang();
const { getCurrentPath } = useBase();
const canShow = (item: Breadcrumb) => {
  if (item.permissions == undefined) {
    return true;
  }
  return appStore.isHavePermission(item.permissions);
};
const getItems = computed<Breadcrumb[]>(() => {
  return items.filter(t => canShow(t) === true);
})
</script>

<template>
  <template v-for="(item, index) in getItems" :key="`menu-${index}-${item.to}`">
    <q-item :to="item.to" active-class="q-item-no-link-highlighting"
      :class="item.to == getCurrentPath(false) ? 'text-primary' : isDark ? 'text-white' : 'text-black'">
      <q-item-section side>
        <q-icon :class="item.to == getCurrentPath(false) ? 'text-primary' : isDark ? 'text-white' : 'text-black'"
          :name="item.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label :lines="lines">{{ item.translateLabel ? t(item.label) : item.label }}</q-item-label>
      </q-item-section>
      <slot name="side" v-bind="{ item }" />
    </q-item>
  </template>
</template>

<style scoped lang="scss"></style>
