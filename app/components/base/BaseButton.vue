  <script setup lang="ts">
import type { AppColor } from '~/types/common';

  const {
    outline = false,
    noCaps = true,
    unelevated = true,
    glossy = false,
    flat = false,
    stack = false,
    round = false,
    push = false,
    rounded = false,
    loading = false,
    disable = false,
    dense = false,
  } = defineProps<{
    align?: 'left' | 'right' | 'center' | 'around' | 'between' | 'evenly';
    color?: AppColor;
    count?: number;
    disable?: boolean;
    flat?: boolean;
    glossy?: boolean;
    icon?: string;
    iconRight?: string;
    label?: string;
    loading?: boolean;
    noCaps?: boolean;
    outline?: boolean;
    outlineColor?: AppColor;
    push?: boolean;
    round?: boolean;
    rounded?: boolean;
    size?: string;
    square?: boolean;
    stack?: boolean;
    textColor?: AppColor;
    to?: string;
    unelevated?: boolean;
    dense?: boolean;
  }>();
  const { isDark } = useTheme();
</script>
  <template>
    <q-btn v-bind="$attrs" :outline :label="!outline ? label : undefined" :color="outlineColor || color"
      :text-color="textColor" 
      :no-caps="noCaps" 
      :unelevated 
      :glossy 
      :flat 
      :icon="!outline ? icon : undefined" 
      :icon-right="!outline ? iconRight : undefined" :stack :round
      :square :push :rounded :align :size :loading :to :disable :dense
      :class="{ 'defult-outline': label && !outlineColor && outline }"
      >
      <!-- 'default-button': !outline && !unelevated && !flat && !glossy && !stack && !push -->
      <template v-if="outline">
        <div class="" :class="`text-${textColor ? textColor: color ?color: !isDark ? 'black' :'white'}`">
          <q-icon v-if="icon" :name="icon" class="q-mr-sm"/>{{ label }} <q-icon v-if="iconRight" :name="iconRight" class="q-ml-sm"/>
        </div>
      </template>
      <slot />
    </q-btn>
  </template>
<style scoped lang="scss">
.defult-outline {
  color: var(--app-main-border-color) !important;
}
.default-button {
    box-shadow:0 0 #0000, 0 0 #0000,  0 1px 1px 0 rgb(0 0 0 / .05) !important;
    // border-radius: 1rem;
}
</style>