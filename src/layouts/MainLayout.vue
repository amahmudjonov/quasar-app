<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="indigo" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <span style="display: flex; align-items: center">
            <img
              :src="img"
              alt="Quasar icon"
              style="height: 30px; margin-right: 7px"
            />
            Quasar App
          </span>
        </q-toolbar-title>
        <div class="q-mr-lg">
          <q-select
            bg-color="blue-8 text-white"
            standout="blue-8 text-white"
            dense
            color="text-white"
            :dark="true"
            v-model="lang"
            :option-label="(item) => $t(`${item.lang}`)"
            :options="[
              {
                locale: 'uz-UZ',
                lang: 'uzbekish',
              },
              {
                locale: 'ru-RU',
                lang: 'russian',
              },
              {
                locale: 'en-US',
                lang: 'english',
              },
            ]"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :breakpoint="500"
      bordered
      content-class="bg-white"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>
          <q-item
            v-for="(item, index) in essentialLinks"
            :key="index"
            clickable
            v-ripple
            :active="item.active"
            @click="navbarToggleActive(item)"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section> {{ $t(item.title) }} </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import items from "./components/index";

const linksData = items;

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      img: require("../../public/icons/favicon-128x128.png"),
      leftDrawerOpen: false,
      essentialLinks: linksData,
      drawer: false,
      miniState: true,
      dark: true,
      lang: {
        locale: "ru-RU",
        lang: this.$t("russian"),
      },
    };
  },
  watch: {
    $route(val) {
      if (this.$route.path !== "/") {
        this.essentialLinks.forEach((el) => {
          el.active = false
          if (el.route === this.$route.path.split("/")[1]) {
            el.active = true;
          }
        });
      } else {
        this.$router.replace("dashboard");
      }
    },
    lang(val) {
      this.$i18n.locale = val.locale;
      localStorage.setItem(
        "locale",
        JSON.stringify({
          locale: val.locale,
          lang: val.lang,
        })
      );
    },
  },
  beforeCreate() {
    const locale = JSON.parse(localStorage.getItem("locale"));
    if (locale && locale.lang && locale.locale) {
      this.$i18n.locale = locale.locale;
      this.lang = locale;
    } else {
      this.$i18n.locale = "ru-RU";
      localStorage.setItem(
        "locale",
        JSON.stringify({
          locale: "ru-RU",
          lang: "russian",
        })
      );
    }
  },
  mounted() {
    if (this.$route.path !== "/") {
      this.essentialLinks.forEach((el) => {
        el.active = false
        if (el.route === this.$route.path.split("/")[1]) {
          el.active = true;
        }
      });
    } else {
      this.$router.replace("dashboard");
    }
  },
  methods: {
    changeLayoutColor() {
      this.dark = false;
    },
    navbarToggleActive(item) {
      this.$router.push(item.route);
      this.essentialLinks.forEach((el) => (el.active = false));
      item.active = true;
    },
  },
};
</script>
