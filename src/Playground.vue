<script setup lang="ts">
import { ref, computed, watchEffect, PropType } from 'vue';
import { Repl, ReplStore, StoreOptions, ReplProps } from 'vue-repl-compatible';
import Codemirror from 'vue-repl-compatible/codemirror-editor';
import 'vue-repl-compatible/style.css';
import PlaygroundHeader from './PlaygroundHeader.vue';
const props = defineProps({
  code: {
    type: String,
    default: 'eNp9kU1PAyEQhv8K4bKa1G5Mbw1toqYHPahR0xOXZjvdUlkgfKybEP67A1tXD6acYN5nZt5hIr0zZt4HoEvKXGOF8cSBD2bNleiMtp5EYuEwIz1YJ7QiiRys7kiFORVXXDVaOU8615JVBq+qbQCyHeHqmitWj2WxID48dEbuPOSXZ3vR44XgYcfbdYylTEokxnO3lFiNypkRygRP+ptO70GuOEWa07qorB5rsXrqQGfUO3R3EO385LTCCWNGOW10Z4QE+2I89nCcLklRsraTUn89lZi3AWY/8eYIzec/8ZMbcozTVwsObA+cTprf2Rb8KG/en2HA+yTiEEEifUF8A6dlyB5H7D6oPdr+wxW3j2VPQrUfbjN4UPnjJqOZTIXnFFf2cGH0X7uL+aLkcZVo+gaKZ7V4'
  },
  storeOptions: {
    type: Object as PropType<StoreOptions>,
    default: () => ({})
  },
  replOptions: {
    type: Object as PropType<ReplProps>,
    default: () => ({})
  },
  vueVersion: {
    type: String,
    default: '2.7.16'
  }
});

const query = new URLSearchParams(location.search)

const store = new ReplStore({
  // initialize repl with previously serialized state
  serializedState: props.code || location.hash.slice(1),

  // starts on the output pane (mobile only) if the URL has a showOutput query
  showOutput: query.has('showOutput'),
  // starts on a different tab on the output pane if the URL has a outputMode query
  // and default to the "preview" tab
  outputMode: query.get('outputMode') || 'preview',
  defaultVueVersion: props.vueVersion,
  ...props.storeOptions
})

// persist state to URL hash
watchEffect(() => history.replaceState({}, '', store.serialize()))


</script>

<template>
  <div class="playground">
    <PlaygroundHeader
      :dev="false"
      :ssr="false"
      :store="store"
      :vueVersion="props.vueVersion"
    />
    <Repl
      :store="store"
      :editor="Codemirror"
      :showCompileOutput="false"
      :clearConsole="false"
      v-bind="replOptions"
    />
  </div>
</template>

<style scoped>
.playground {
  height: 500px;
  padding: 8px 0 24px;
  margin-top: 8px;
  border: 1px solid rgba(28, 31, 35, 0.08);
}
</style>

