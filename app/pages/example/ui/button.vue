<script setup lang="ts">
import {
    biAirplane,
    biChatLeft,
    biGear,
    biLightbulb,
    biNewspaper,
    biPerson,
    biPhone,
    biQuestionCircle,
    biRadar,
    biShop
} from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
const progress = ref(false);
useHead({
    title: 'Button'
})
</script>
<template>
    <QuasarPage>
        <QuasarCard>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Button </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>

                <base-ripple-item style="width: 150px;padding: 10px;">
                    This is Ripple Item
                </base-ripple-item>

                <div class="q-pa-md q-gutter-sm">
                    <QuasarButton label="Standard" />
                    <QuasarButton label="Elevated" :unelevated="false" />
                    <QuasarButton color="white" text-color="black" label="Standard color" />
                    <QuasarButton color="deep-purple" label="Standard" />
                    <QuasarButton label="Primary" color="primary" />
                    <QuasarButton label="Unelevated" color="primary" />
                    <QuasarButton label="Outline" outline />
                    <QuasarButton label="Outline icon" outline :icon="biChatLeft" :icon-right="biRadar"/>
                    <QuasarButton label="Outline color" outline outline-color="teal" />
                    <QuasarButton color="secondary" label="Secondary" />
                    <QuasarButton color="amber" glossy label="Amber" />
                    <QuasarButton color="brown-5" label="Brown 5" />
                    <QuasarButton color="black" label="Black" />
                    <QuasarButton label="Flat" flat color="primary" />
                    <QuasarButton label="Icon Left" color="negative" :icon="biGear" />
                    <QuasarButton label="Icon Right" color="warning" :icon-right="biNewspaper" />
                    <QuasarButton label="Icon Both" :unelevated="false" :icon="biPerson" :icon-right="biQuestionCircle" />
                    <QuasarButton :icon="biPhone" label="Stacked" stack color="purple" />

                    <QuasarButton round color="primary" :icon="biShop" />
                    <QuasarButton push color="primary" label="Push Btn" />
                    <QuasarButton color="amber" square label="Square" />
                    <QuasarButton flat rounded color="primary" label="Flat Rounded" />
                    <QuasarButton rounded color="teal" label="Rounded" />
                    <QuasarButton round>
                        <q-avatar size="42px">
                            <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                        </q-avatar>
                    </QuasarButton>
                    <QuasarButton no-caps :unelevated="false">
                        Multiline<br>Button
                    </QuasarButton>
                    <QuasarButton style="width: 200px" :unelevated="false">
                        <div class="ellipsis">
                            This is some very long text that is expected to be truncated
                        </div>
                    </QuasarButton>


                    <QuasarButton align="left" class="btn-fixed-width" color="primary" label="Align to left" />
                    <QuasarButton align="right" class="btn-fixed-width" color="secondary" label="Align to right" />
                    <QuasarButton align="between" class="btn-fixed-width" color="accent" label="Align between"
                        :icon="biAirplane" />
                    <QuasarButton align="around" class="btn-fixed-width" color="brown-5" label="Align around"
                        :icon="biLightbulb" />

                    <QuasarButton label="Size xs" size="xs" :unelevated="false" />
                    <QuasarButton label="Size sm" size="sm" :unelevated="false" />
                    <QuasarButton label="Size md" size="md" :unelevated="false" />
                    <QuasarButton label="Size lg" size="lg" :unelevated="false" />
                    <QuasarButton label="Size xl" size="xl" :unelevated="false"/>
                    <QuasarButton label="Size PX" size="50px" :unelevated="false"/>
                    <QuasarButton label="Click for Loading" :loading="progress" :unelevated="false" @click="progress = true" />
                    <QuasarButton label="Stop loading" color="negative" @click="progress = false" />
                </div>
            </q-card-section>
        </QuasarCard>
    </QuasarPage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>