<script setup lang="ts">
import { ref, computed } from 'vue';
import VersionSelect from './VersionSelect.vue';

const props = defineProps(['store', 'dev', 'ssr', 'vueVersion']);
const emit = defineEmits(['toggle-theme', 'toggle-ssr', 'toggle-dev']);

const { store } = props;

const currentCommit = props.vueVersion || '3.3.6';
const vueVersion = ref(`@${currentCommit}`);

async function setVueVersion(v) {
  vueVersion.value = `loading...`;
  await store.setVueVersion(v);
  vueVersion.value = `v${v}`;
}

function resetVueVersion() {
  store.resetVueVersion();
  vueVersion.value = `@${currentCommit}`;
}
</script>

<template>
  <div class="playground-header">
    <nav>
      <div class="links">
        <VersionSelect
          :model-value="vueVersion"
          @update:model-value="setVueVersion"
          pkg="vue"
          label="Vue Version"
        >
          <li>
            <a @click="resetVueVersion">This Commit ({{ currentCommit }})</a>
          </li>
          <li>
            <a
              href="https://app.netlify.com/sites/vue-sfc-playground/deploys"
              target="_blank"
              >Commits History</a
            >
          </li>
        </VersionSelect>
      </div>
    </nav>
  </div>
</template>

<style lang="less">
.playground-header {
  nav {
    --bg: #fff;
    --bg-light: #fff;
    --border: #ddd;
    --btn: #666;
    --highlight: #333;
    --green: #3ca877;
    --purple: #904cbc;
    --btn-bg: #eee;
    border-bottom: 1px solid rgba(28, 31, 35, 0.08);

    color: var(--base);
    box-sizing: border-box;
    padding: 0 1em;
    padding-bottom: 8px;
    background-color: var(--bg);
    position: relative;
    z-index: 999;
    display: flex;
    justify-content: space-between;
  }

  .dark nav {
    --base: #ddd;
    --bg: #1a1a1a;
    --bg-light: #242424;
    --border: #383838;
    --highlight: #fff;
    --btn-bg: #333;

    box-shadow: none;
  }

  h1 {
    font-weight: 500;
    display: inline-flex;
    place-items: center;
  }

  h1 img {
    height: 24px;
    margin-right: 10px;
  }

  @media (max-width: 560px) {
    h1 span {
      font-size: 0.9em;
    }
  }

  @media (max-width: 520px) {
    h1 span {
      display: none;
    }
  }

  .links {
    display: flex;
  }

  .toggle-dev span,
  .toggle-ssr span {
    font-size: 12px;
    border-radius: 4px;
    padding: 4px 6px;
  }

  .toggle-dev span {
    background: var(--purple);
    color: #fff;
  }

  .toggle-dev.dev span {
    background: var(--green);
  }

  .toggle-ssr span {
    background-color: var(--btn-bg);
  }

  .toggle-ssr.enabled span {
    color: #fff;
    background-color: var(--green);
  }

  .toggle-dark svg {
    width: 18px;
    height: 18px;
  }

  .toggle-dark .dark,
  .dark .toggle-dark .light {
    display: none;
  }

  .dark .toggle-dark .dark {
    display: inline-block;
  }

  .links button,
  .links .github {
    padding: 1px 6px;
    color: var(--btn);
  }

  .links button:hover,
  .links .github:hover {
    color: var(--highlight);
  }

  .version:hover .active-version::after {
    border-top-color: var(--btn);
  }

  .dark .version:hover .active-version::after {
    border-top-color: var(--highlight);
  }

  .versions {
    display: none;
    position: absolute;
    left: 0;
    top: 40px;
    background-color: var(--bg-light);
    border: 1px solid var(--border);
    border-radius: 4px;
    list-style-type: none;
    padding: 8px;
    margin: 0;
    width: 200px;
    max-height: calc(300px);
    overflow: scroll;
  }

  .versions a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
    cursor: pointer;
    color: var(--base);
  }

  .versions a:hover {
    color: var(--green);
  }

  .versions.expanded {
    display: block;
  }

  .links > * {
    display: flex;
    align-items: center;
  }

  .links > * + * {
    margin-left: 4px;
  }
}
</style>
