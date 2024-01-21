<script setup>
import NavItem from './NavItem.vue';
import { useNavItemsStore } from '../stores/navItems.js';
const store = useNavItemsStore;
</script>

<template>
    <nav class = "navbar navbar--style" aria-label="primary">
        <div class = "navbar__element">
          <div class = "navbar__element navbar__element--burger"><i class="fa fa-bars"></i></div>
        <ul id = "menu" class = "navbar__list navbar__list--style">
          <NavItem
            v-for="(item) in store.getMenu()"
            :key="item.id"
            :name="item.name"
            :title="item.title"
          />
        </ul>
        </div>
      </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  margin: 0;
  padding: 0;
  z-index: 1000;
  max-height: fit-content;
  width: 10%; 
}

@media (min-width: 768px) {
  .navbar {
    flex-wrap: unset;
    width:100%;
    display: flex;
  }
}

@media (min-width: 992px) {
  .navbar {
    width: 80%;
  }
}

@media (min-width: 1200px) {
  .navbar {
    width: 60%;
  }
}

.navbar--style {
  background-color: transparent;
}

.navbar__list {
  list-style: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 3%;
  display: none;
  width: 100%;
  margin: 0;
  line-height: 3rem;
}
.navbar__list--style {
  background-color: var(--mid-blue);
}

@media (min-width: 768px) {
  .navbar__list {
    padding: 0;
    flex-direction: row;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .navbar__list--style {
    background-color: transparent;
  }
}

.navbar__element {
  margin: 0 1%;
  padding: 0;
  font-size: 3.5rem;
  cursor: pointer;
  line-height: 3.5rem;
}

@media (min-width: 768px) {
  .navbar__element {
    width: 100%;
    position: sticky;
  }
}
.navbar__element--burger {
  color: var(--mid-blue);
  margin-right: 2%;
  font-size: 3rem;
}

@media (min-width: 768px) {
  .navbar__element--burger {
    display: none;
  }
}

.navbar__element:hover .navbar__list {
  display: flex;
}
</style>