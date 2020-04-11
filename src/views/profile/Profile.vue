<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="scroll-content">
      <login></login>
      <money></money>
      <div class="line"></div>
      <profile-list></profile-list>
    </scroll>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"

import Login from "./childComps/Login"
import Money from "./childComps/Money"
import ProfileList from "./childComps/ProfileList"

export default {
    name: "Profile",
    components: {
      NavBar,
      Scroll,
      Login,
      Money,
      ProfileList
    }
}
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}

.nav-bar {
  font-weight: 600;
  color: white;
  background-color: var(--color-tint);
}

.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}

.scroll-content {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
  overflow: hidden;
}
</style>
