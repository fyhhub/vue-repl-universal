<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

const expanded = ref(false);
const versions = ref();

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  pkg: String,
  label: String,
  modelValue: String
});
const version = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

async function toggle() {
  expanded.value = !expanded.value;
  if (!versions.value) {
    versions.value = await fetchVersions();
  }
}

async function fetchVersions() {
  const res = await fetch(
    `https://data.jsdelivr.com/v1/package/npm/${props.pkg}`
  );
  const { versions } = await res.json();

  if (props.pkg === 'vue') {
    // if the latest version is a pre-release, list all current pre-releases
    // otherwise filter out pre-releases
    const filteredVersions = versions.filter(
      v => (v.startsWith('2.7') || v.startsWith('3.3')) && !v.includes('-')
    );
    return filteredVersions;
  } else if (props.pkg === 'typescript') {
    return versions.filter(v => !v.includes('dev') && !v.includes('insiders'));
  }
  return versions;
}

function setVersion(v) {
  version.value = v;
  expanded.value = false;
}

onMounted(() => {
  window.addEventListener('click', () => {
    expanded.value = false;
  });
  window.addEventListener('blur', () => {
    if (document.activeElement?.tagName === 'IFRAME') {
      expanded.value = false;
    }
  });
});
</script>

<template>
  <div class="version" @click.stop>
    <span class="active-version" @click="toggle">
      {{ label }}
      <span class="number">{{ version }}</span>
    </span>

    <ul class="versions" :class="{ expanded }">
      <li v-if="!versions"><a>loading versions...</a></li>
      <li v-for="version of versions">
        <a @click="setVersion(version)">v{{ version }}</a>
      </li>
      <div @click="expanded = false">
        <slot />
      </div>
    </ul>
  </div>
</template>

<style scoped>
.version {
  margin-right: 12px;
  position: relative;
}

.active-version {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  place-items: center;
}

.active-version .number {
  color: var(--green);
  margin-left: 4px;
}

.active-version::after {
  content: '';
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #aaa;
  margin-left: 8px;
}
</style>
