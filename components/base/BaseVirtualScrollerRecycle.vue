<script setup lang="ts" generic="T">
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { ref, useTemplateRef } from 'vue';
const {
    minItemSize = 35,
    itemSize = 35,
    emitUpdate = true,
    scrollAreaHeight = '100%',
    items,
    buffer = 800,
    poolSize = 2000,
    pageMode = false,
    keyField = 'id',
    pageModeFullPage = true,
    isInfiniteDisabled = false,
    infinitePosition = 'bottom'
} = defineProps<{
    minItemSize?: number;
    itemSize?: number;
    buffer?: number;
    poolSize?: number;
    emitUpdate?: boolean;
    pageMode?: boolean;
    pageModeFullPage?: boolean;
    scrollAreaHeight?: string;
    minHeight?: string;
    keyField?: string;
    isInfiniteDisabled?: boolean;
    infinitePosition?: 'bottom' | 'top';
    items: T[]
}>();


const appRecycleScrollerRef = useTemplateRef<any>('appRecycleScrollerRef');
// const emit = defineEmits<{
//   onUpdate: [val: VirtualScrollerUpdate];
// }>();

const emit = defineEmits(['on-update', 'scroll-start', 'scroll-end', 'on-infinite', 'on-refresh']);
const onScrollToItem = (index: number | undefined) => {
    if (index == undefined) {
        return;
    }
    console.log('onScrollToItem', index);
    if (appRecycleScrollerRef.value) {
        appRecycleScrollerRef.value.scrollToItem(index);
    }
};
const onUpdate = (viewStartIndex: number, viewEndIndex: number, visibleStartIndex: number, visibleEndIndex: number) => {
    // console.log(`${viewStartIndex}-[${visibleStartIndex}-${visibleEndIndex}]-${viewEndIndex}`);
    // if (visibleEndIndex == viewEndIndex) {
    //   console.log('isBottom');
    // } else if (viewStartIndex == 0 && visibleStartIndex == 0) {
    //   console.log('isTop');
    // } else {
    //   console.log('scrolling');
    // }
    emit('on-update', {
        viewStartIndex, viewEndIndex, visibleStartIndex, visibleEndIndex
    });
};
const onScrollStart = () => {
    emit('scroll-start')
};
const onScrollEnd = () => {
    emit('scroll-end')
};
const onResize = () => {
};
defineExpose({
    onScrollToItem
});
</script>

<template>
    <RecycleScroller v-bind="$attrs" ref="appRecycleScrollerRef" class='scroller' :key-field="keyField" :items='items'
        :min-item-size='minItemSize' :emit-update="emitUpdate" :page-mode="pageMode" :buffer="buffer" @resize="onResize"
        @update="onUpdate">
        <template #before>
            <slot name="slotBefore"></slot>
        </template>
        <template v-slot='{ item, index }'> 
           <slot v-bind="{ item, index }"></slot> 
        </template>

        <template #after>
            <slot name="slotAfter"></slot>
        </template>
    </RecycleScroller>

</template>

<style scoped lang="scss">
.scroller {
    height: v-bind(scrollAreaHeight);
    //height: 100%;
    overflow-y: auto;
}
</style>
