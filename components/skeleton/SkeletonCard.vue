<template>
    <div class="row" :class="rowCss" v-if="!vertical">
      <div v-for="i in no" :key="i" :class="col">
        <q-card :flat="flat">
          <q-skeleton :height />
          <q-item v-if="textNumber>0">
            <q-item-section>
              <q-item-label v-for="tIndex in textNumber" :key="tIndex">
                <q-skeleton type="text" animation="fade" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
    <template v-else>
      <div class="row" :class="rowCss" v-for="i in no" :key="i">
        <div :class="col">
          <q-card :flat="flat">
            <q-skeleton :height />
            <q-item v-if="textNumber>0">
              <q-item-section>
                <q-item-label v-for="tIndex in textNumber" :key="tIndex">
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
    </template>
  </template>
  <script setup lang="ts">

  const { vertical=false, flat=false, height='100px', no=1, textNumber=0, col='col-12 col-md-12 q-pa-xs' } = defineProps<{
    vertical?: boolean
    flat?: boolean
    height?: string
    no?: number
    textNumber?: number
    col?: string
    rowCss?: string
}>();
  </script>
  